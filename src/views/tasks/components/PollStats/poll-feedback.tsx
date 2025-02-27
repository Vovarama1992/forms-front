import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Separator } from '@/components/ui/Separator'

interface FeedbackItem {
    optionId: string
    optionLabel: string
    isWinner: boolean
    reasons: string[]
}

interface PollFeedbackProps {
    feedback: FeedbackItem[]
}

export function PollFeedback({ feedback }: PollFeedbackProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Feedback & Reasons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {feedback.map((item, index) => (
                    <div key={item.optionId}>
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">
                                {item.optionLabel}
                                {item.isWinner && (
                                    <span className="ml-2 text-sm font-medium text-emerald-500">
                                        Winner
                                    </span>
                                )}
                            </h3>
                            <span className="rounded-full bg-muted px-2 py-0.5 text-sm">
                                Option {item.optionId}
                            </span>
                        </div>
                        <div className="mt-4 space-y-3">
                            {item.reasons.map((reason, reasonIndex) => (
                                <p
                                    key={reasonIndex}
                                    className="text-sm leading-relaxed text-muted-foreground"
                                >
                                    {reason}
                                </p>
                            ))}
                        </div>
                        {index < feedback.length - 1 && (
                            <Separator className="my-6" />
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
