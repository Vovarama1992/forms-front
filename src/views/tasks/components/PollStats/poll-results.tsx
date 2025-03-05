import { PollStatus } from './poll-status'
import { ResultsGrid } from './results-grid'
import { FeedbackSection } from './feedback-section'
import {AIAnalysis} from "@/views/tasks/components/PollStats/ai-analysis";
import Card from "../../../../components/ui/Card";
import Accordion from "@/components/shared/Accordion/Accordion";
import {Button} from "react-scroll";
import {apiTaskCreate, fetchTestGenerateDpt, fetchTestGenerateGpt} from "@/services/TaskApiService";
import {useParams} from "react-router";

interface PollResultsProps {
    data: {
        id: string
        totalVotes:number
        AIReport:string
        expectedVotes:number
        currentVotes:number
        status: {
            complete: boolean
            totalResponses: number
            duration: string
        }
        options: Array<{
            id: string
            title: string
            votes: number
            reasons: string[]
        }>
    },
    task: object
}

export function PollResults({ data, task }: PollResultsProps) {
    console.log("data");
    console.log(data);
    const { label } = useParams<{ label: number }>(); // Указываем тип параметра
    // Вычисляем проценты и определяем победителя
    const optionsWithStats = data.options.map((option) => ({
        ...option,
        percentage: Math.round((option.votes / data.totalVotes) * 100),
    }))

    const winner = optionsWithStats.reduce((prev, current) =>
        current.percentage > prev.percentage ? current : prev,
    )

    const getReportAi = async () => {

        try {
            const result = await fetchTestGenerateGpt(label);
            return  false;

            if (!response.ok) {
                // Обработка ошибок, когда сервер вернул статус не 2xx
                const errorText = await response.text(); // Или response.json(), если ошибка в JSON
                throw new Error(`Failed to generate report: ${response.status} - ${errorText}`);
            }

            const reportData = await response.json(); //  Парсим JSON-ответ, если сервер возвращает JSON.
            //  Если сервер не возвращает JSON, а, например, просто текст, то:
            // const reportData = await response.text();

            return reportData; // Возвращаем полученные данные

        } catch (error) {
            // Обработка ошибок, связанных с самим запросом (сетевые проблемы, CORS, и т.д.)
            console.error("Error generating report:", error);
            throw error; //  Перебрасываем ошибку, чтобы ее можно было обработать выше.  Или возвращаем какое-то значение по умолчанию/ошибку.
        }
    };

    const isComplete = data.currentVotes == data.expectedVotes;

    return (
        <div className="space-y-8">

            <PollStatus
                totalResponses={data.status.totalResponses}
                duration={data.status.duration}
                isComplete={isComplete}
            />

            <ResultsGrid
                options={optionsWithStats.map((option) => ({
                    ...option,
                    isWinner: option.id === winner.id,
                }))}
            />

            <FeedbackSection
                options={optionsWithStats.map((option) => ({
                    ...option,
                    isWinner: option.id === winner.id,
                }))}
            />

            {/*ответы на вопр*/}

            {!!task?.inputsStatistics?.length && (
                <Card
                    className="mt-5"
                    header={{
                        content: 'Вопросы и ответы',
                    }}
                >
                    {task?.inputsStatistics.map((input, index) => {
                        return (
                            <div key={index} className="mb-5">
                                <Accordion
                                    data={[
                                        {
                                            title: input.inputLabel,
                                            content: input.answers,
                                        },
                                    ]}
                                />
                            </div>
                        )
                    })}
                </Card>
            )}

            <AIAnalysis
                AIReport={data.AIReport}
            />

            <button
                className="bg-amber-300 hover:bg-amber-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => getReportAi()}
                type="button"
            >
                Получить отчет АИ
            </button>

        </div>
    )
}
