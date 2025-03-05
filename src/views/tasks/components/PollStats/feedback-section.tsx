import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Separator } from '@/components/ui/separator'
import { Trophy } from 'lucide-react'

interface FeedbackSectionProps {
    options: Array<{
        id: string
        title: string
        votes: number
        reasons: string[]
        isWinner: boolean
    }>
}

export function FeedbackSection({ options }: FeedbackSectionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Отзывы и причины выбора</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {options.map((option, index) => (
                    <div key={option.id}>
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-20 items-center justify-center rounded-full bg-muted text-sm font-medium">
                                {option.id}
                            </div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold">
                                    {option.title}
                                </h3>
                                {option.isWinner && (
                                    <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                        <Trophy className="h-3 w-3" />
                                        Победитель
                                    </span>
                                )}
                                <span className="text-sm text-muted-foreground">
                                    ({option.votes}{' '}
                                    {option.votes === 1
                                        ? 'голос'
                                        : option.votes < 5
                                          ? 'голоса'
                                          : 'голосов'}
                                    )
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 space-y-3 pl-11">
                            {option.reasons.map((reason, reasonIndex) => (
                                <p
                                    key={reasonIndex}
                                    className="text-sm leading-relaxed text-muted-foreground"
                                >
                                    {reason}
                                </p>
                            ))}
                        </div>

                        {index < options.length - 1 && (
                            <Separator className="my-6" />
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
