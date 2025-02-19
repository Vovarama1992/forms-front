import { FileText, Plus } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { StatsCards } from './stats-cards'
import { TasksOverview } from './tasks-overview'
import { RecentTasks } from './recent-tasks'

export default function DashboardPage() {
    return (
        <div className="flex-1 space-y-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Панель управления</h1>
                <div className="flex items-center gap-3">
                    <Button>
                        {/* <Link href="/tasks"> */}
                        <FileText className="mr-2 h-4 w-4" />
                        Все задания
                        {/* </Link> */}
                    </Button>
                    <Button>
                        {/* <Link href="/tasks/new"> */}
                        <Plus className="mr-2 h-4 w-4" />
                        Создать задание
                        {/* </Link> */}
                    </Button>
                </div>
            </div>

            <StatsCards />

            <div className="grid gap-6 md:grid-cols-2">
                <TasksOverview />
                <RecentTasks />
            </div>
        </div>
    )
}
