'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface PollOption {
    id: string
    label: string
    votes: number
    percentage: number
    isWinner?: boolean
}

interface PollResultsGridProps {
    options: PollOption[]
}

export function PollResultsGrid({ options }: PollResultsGridProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {options.map((option) => (
                <Card
                    key={option.id}
                    className={cn(
                        'relative overflow-hidden',
                        option.isWinner && 'border-2 border-emerald-500',
                    )}
                >
                    {option.isWinner && (
                        <div className="absolute right-2 top-2 rounded-md bg-emerald-500 px-2 py-1 text-xs font-medium text-white">
                            Winner
                        </div>
                    )}
                    <CardContent className="p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">
                                {option.label}
                            </h3>
                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="rounded-full bg-muted px-2 py-0.5">
                                    Option {option.id}
                                </span>
                                <span>{option.votes} votes</span>
                            </div>
                        </div>
                        <div className="relative pt-4">
                            <div className="h-2 w-full rounded-full bg-muted">
                                <div
                                    className={cn(
                                        'h-full rounded-full transition-all',
                                        option.isWinner
                                            ? 'bg-emerald-500'
                                            : 'bg-primary',
                                    )}
                                    style={{ width: `${option.percentage}%` }}
                                />
                            </div>
                            <span className="absolute right-0 top-0 text-sm font-medium">
                                {option.percentage}%
                            </span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
