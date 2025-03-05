import { PollStatus } from './poll-status'
import { ResultsGrid } from './results-grid'
import { FeedbackSection } from './feedback-section'
import {AIAnalysis} from "@/views/tasks/components/PollStats/ai-analysis";
import Card from "../../../../components/ui/Card";
import Accordion from "@/components/shared/Accordion/Accordion";

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
    console.log(task);
    // Вычисляем проценты и определяем победителя
    const optionsWithStats = data.options.map((option) => ({
        ...option,
        percentage: Math.round((option.votes / data.totalVotes) * 100),
    }))

    const winner = optionsWithStats.reduce((prev, current) =>
        current.percentage > prev.percentage ? current : prev,
    )


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
        </div>
    )
}
