import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const recentTasks = [
    {
        id: '1',
        name: 'Дизайн логотипа',
        votes: 234,
        status: 'Активно',
        completion: 45,
    },
    {
        id: '2',
        name: 'Цветовая схема сайта',
        votes: 156,
        status: 'Активно',
        completion: 78,
    },
    {
        id: '3',
        name: 'Упаковка продукта',
        votes: 500,
        status: 'Завершено',
        completion: 100,
    },
    {
        id: '4',
        name: 'Маркетинговый баннер',
        votes: 89,
        status: 'Активно',
        completion: 24,
    },
]

export function RecentTasks() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Последние задания</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                {recentTasks.map((task) => (
                    <div key={task.id} className="flex items-center">
                        <div className="space-y-1 flex-1">
                            <p className="text-sm font-medium leading-none">
                                {task.name}
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-muted-foreground">
                                    {task.votes} голосов
                                </p>
                                <Badge
                                    variant={
                                        task.status === 'Завершено'
                                            ? 'secondary'
                                            : 'default'
                                    }
                                >
                                    {task.status}
                                </Badge>
                            </div>
                        </div>
                        <div className="ml-auto font-medium">
                            {task.completion}%
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
