import { FileText, Plus } from 'lucide-react'
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/Button'
import { StatsCards } from './stats-cards'
import { TasksOverview } from './tasks-overview'
import {RecentTasks} from './recent-tasks'

export default function DashboardPage() {
    return (
        <div className="flex-1 space-y-6 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Панель управления</h1>

                <div className="flex items-center gap-3">
                    <Button>
                        <Link to="/tasks" className="flex items-center">
                            <FileText className="h-4 w-4" />
                            <span className="ml-2">Все задания</span>
                        </Link>
                    </Button>
                    <Button>
                        <Link to="/create-task" className="flex items-center">  {/* Corrected to href */}
                            <Plus className="h-4 w-4" />
                            <span className="ml-2">Создать задание</span>
                        </Link>
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
