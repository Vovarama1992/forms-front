import {Activity, FileText, Users} from 'lucide-react'
import {Card, CardContent} from '@/components/ui/Card'
import {useEffect, useState} from "react";
import {fetchTaskGlobalStatistics} from "@/services/TaskApiService";
import {toast} from "react-toastify";

export function StatsCards({ params }) {
    const [globalStats, setGlobalStats] = useState({
        totalCreatedTasks: 0,
        tasksNotReachedExpectedVotes: 0,
        totalCurrentVotes: 0,
    });

    // Получение общей статистики
    useEffect(() => {
        async function fetchGlobalStats() {
            try {
                const response = await fetchTaskGlobalStatistics();

                setGlobalStats(response);
            } catch (error) {
                console.error(error);
                toast.error('Ошибка получения общей статистики');
            }
        }
        fetchGlobalStats();
    }, []);

    const stats = [
        {
            title: 'Всего заданий',
            value: globalStats.totalCreatedTasks,
            description: 'За все время',
            icon: FileText,
            color: 'bg-blue-50',
            iconColor: 'text-blue-600',
        },
        {
            title: 'Активные задания',
            value: globalStats.tasksNotReachedExpectedVotes,
            description: 'В процессе',
            icon: Activity,
            color: 'bg-green-50',
            iconColor: 'text-green-600',
        },
        {
            title: 'Всего голосов',
            value: globalStats.totalCurrentVotes,
            description: 'По всем заданиям',
            icon: Users,
            color: 'bg-purple-50',
            iconColor: 'text-purple-600',
        },
    ];



    return (
        <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
                <Card key={stat.title} className={`${stat.color} border-none`}>
                    <CardContent className="flex items-center gap-4 p-6">
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="text-2xl font-bold">
                                    {stat.value}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {stat.description}
                                </p>
                            </div>
                        </div>
                        <div
                            className={`rounded-full bg-white p-2 ${stat.iconColor}`}
                        >
                            <stat.icon className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}