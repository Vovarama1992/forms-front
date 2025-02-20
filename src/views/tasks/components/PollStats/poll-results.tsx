import { PollStatus } from './poll-status'
import { ResultsGrid } from './results-grid'
import { FeedbackSection } from './feedback-section'

interface PollResultsProps {
    data: {
        id: string
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
    const totalVotes = data.options.reduce(
        (sum, option) => sum + option.votes,
        0,
    )

    // Вычисляем проценты и определяем победителя
    const optionsWithStats = data.options.map((option) => ({
        ...option,
        percentage: Math.round((option.votes / totalVotes) * 100),
    }))

    const winner = optionsWithStats.reduce((prev, current) =>
        current.percentage > prev.percentage ? current : prev,
    )

    return (
        <div className="space-y-8">
            <PollStatus
                totalResponses={data.status.totalResponses}
                duration={data.status.duration}
                isComplete={data.status.complete}
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
        </div>
    )
}
