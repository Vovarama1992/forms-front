import {useTasks} from "@/store/TasksContext";
import { useMemo } from 'react'
import {Card} from "@/components/ui";
import {CardContent, CardHeader, CardTitle} from "@/components/ui/Card";
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts";

const monthNames = [
    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
]

const getLastSixMonths = () => {
    const months = []
    const date = new Date()

    for (let i = 5; i >= 0; i--) {
            const tempDate = new Date(date.getFullYear(), date.getMonth() - i, 1)
        months.push({
            name: `${monthNames[tempDate.getMonth()]} ${tempDate.getFullYear()}`,
            month: tempDate.getMonth(),
            year: tempDate.getFullYear()
        })
    }

        return months
    }

export function TasksOverview() {
    const { tasks } = useTasks()

    const chartData = useMemo(() => {
        const lastSixMonths = getLastSixMonths()

        return lastSixMonths.map(({ name, month, year }) => {
            const totalVotes = tasks
                .filter(task => {
                    const taskDate = new Date(task.createdAt)
                    return (
                        taskDate.getMonth() === month &&
                        taskDate.getFullYear() === year
                    )
                })
                .reduce((sum, task) => sum + task.currentVotes, 0)

            return { name, total: totalVotes }
        })
    }, [tasks])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Статистика заданий</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => value}
                            />
                            <Bar
                                dataKey="total"
                                fill="currentColor"
                                radius={[4, 4, 0, 0]}
                                className="fill-primary"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}