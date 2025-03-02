import { PollStatus } from './poll-status'
import { ResultsGrid } from './results-grid'
import { FeedbackSection } from './feedback-section'
import {AIAnalysis} from "@/views/tasks/components/PollStats/ai-analysis";

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
    }
}

export function PollResults({ data }: PollResultsProps) {

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

            <AIAnalysis
             AIReport={data.AIReport}
            />

            <FeedbackSection
                options={optionsWithStats.map((option) => ({
                    ...option,
                    isWinner: option.id === winner.id,
                }))}
            />
        </div>
    )
}
