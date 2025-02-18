'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
    { name: 'Янв', total: 12 },
    { name: 'Фев', total: 15 },
    { name: 'Мар', total: 23 },
    { name: 'Апр', total: 18 },
    { name: 'Май', total: 25 },
    { name: 'Июн', total: 32 },
]

export function TasksOverview() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Статистика заданий</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
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
                                tickFormatter={(value) => `${value}`}
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
