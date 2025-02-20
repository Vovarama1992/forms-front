import { Card } from '@/components/ui/card'
import { Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ResultsGridProps {
    options: Array<{
        id: string
        title: string
        votes: number
        percentage: number
        isWinner: boolean
    }>
}

export function ResultsGrid({ options }: ResultsGridProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {options.map((option) => (
                <Card
                    key={option.id}
                    className={cn(
                        'relative overflow-hidden transition-shadow hover:shadow-md',
                        option.isWinner && 'border-2 border-emerald-500',
                    )}
                >
                    {option.isWinner && (
                        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white">
                            <Trophy className="h-3 w-3" />
                            Победитель
                        </div>
                    )}
                    <div className="p-6">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold">
                                {option.title}
                            </h3>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                                    {option.id}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {option.votes}{' '}
                                    {option.votes === 1
                                        ? 'голос'
                                        : option.votes < 5
                                          ? 'голоса'
                                          : 'голосов'}
                                </span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                    className={cn(
                                        'h-full rounded-full transition-all',
                                        option.isWinner
                                            ? 'bg-emerald-500'
                                            : 'bg-blue-500',
                                    )}
                                    style={{ width: `${option.percentage}%` }}
                                />
                            </div>
                            <span className="absolute right-0 -top-6 text-2xl font-semibold">
                                {option.percentage}%
                            </span>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}
