import { CheckCircle2, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface PollStatusProps {
    totalResponses: number
    duration: string
    isComplete?: boolean
}

export function PollStatus({
    totalResponses,
    duration,
    isComplete = false,
}: PollStatusProps) {
    return (
        <Card className="border-2 border-emerald-100 bg-emerald-50/50">
            <CardContent className="flex items-center gap-3 p-4">
                <div className="rounded-full bg-emerald-100 p-2">
                    {isComplete ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-700" />
                    ) : (
                        <Clock className="h-6 w-6 text-emerald-700" />
                    )}
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-emerald-700">
                        {isComplete ? 'Опрос завершен' : 'Опрос в процессе'}
                    </h2>
                    <p className="text-sm text-emerald-600">
                        {totalResponses}{' '}
                        {totalResponses === 1
                            ? 'человек ответил'
                            : totalResponses < 5
                              ? 'человека ответили'
                              : 'человек ответили'}{' '}
                        за {duration}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
