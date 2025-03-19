import { PollStatus } from './poll-status';
import { ResultsGrid } from './results-grid';
import { FeedbackSection } from './feedback-section';
import { AIAnalysis } from '@/views/tasks/components/PollStats/ai-analysis';
import Card from '../../../../components/ui/Card';
import Accordion from '@/components/shared/Accordion/Accordion';
import { fetchTestGenerateGpt } from '@/services/TaskApiService';
import { useParams } from 'react-router';

interface PollResultsProps {
    data: {
        id: string;
        totalVotes: number;
        AIReport: {
            taskId: string;
            bestCreative: string;
            reasoning: string;
            suggestions: string[];
            creatives: {
                id: string;
                analysis: {
                    overall_score: number;
                    strengths: string[];
                    weaknesses: string[];
                    recommendations: string[];
                };
                visual_analysis: {
                    dominant_colors: string[];
                    contrast_ratio: number;
                    text_readability: string;
                    object_focus: string;
                    emotion_detected: string;
                };
                performance_prediction: {
                    engagement_score: number;
                    conversion_likelihood: number;
                    expected_CTR: string;
                };
            }[];
        } | null;
        expectedVotes: number;
        currentVotes: number;
        status: {
            complete: boolean;
            totalResponses: number;
            duration: string;
        };
        options: Array<{
            id: string;
            title: string;
            votes: number;
            reasons: string[];
        }>;
    };
    task: any;
    refreshData: () => void; // Функция обновления данных
}

export function PollResults({ data, task, refreshData }: PollResultsProps) {
    
    const { label } = useParams<{ label: number }>();

    // Вычисляем проценты и определяем победителя
    const optionsWithStats = data.options.map((option) => ({
        ...option,
        percentage: Math.round((option.votes / data.totalVotes) * 100),
    }));

    const winner = optionsWithStats.reduce((prev, current) =>
        current.percentage > prev.percentage ? current : prev
    );

    const getReportAi = async () => {
        try {
            await fetchTestGenerateGpt(label);
            refreshData(); // Обновляем данные после получения AI-отчета
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };

    const isComplete = data.currentVotes === data.expectedVotes;

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

            {!!task?.inputsStatistics?.length && (
                <Card className="mt-5" header={{ content: 'Вопросы и ответы' }}>
                    {task.inputsStatistics.map((input, index) => (
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
                    ))}
                </Card>
            )}

            <AIAnalysis AIReport={data.AIReport} />

            <button
                className="bg-amber-300 hover:bg-amber-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={getReportAi}
                type="button"
            >
                Получить отчет АИ
            </button>
        </div>
    );
}
