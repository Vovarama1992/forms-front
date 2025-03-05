import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import TaskListTable from './components/TaskListTable'
import TaskListSelected from './components/TaskListSelected'
import { usePageMetadata } from '@/views/tasks/helpers'
import DashboardPage from '@/views/dashboard/page'
import {TaskProvider} from "@/store/TasksContext"; // Импортируем DashboardPage

const TasksList = () => {
    usePageMetadata('Список заданий', '')

    return (
        <TaskProvider>
            <>
                <DashboardPage />
                <Container>
                    <AdaptiveCard>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                <h3>Список заданий</h3>
                            </div>
                            <TaskListTable />
                        </div>
                    </AdaptiveCard>
                </Container>
            </>
        </TaskProvider>
    )
}

export default TasksList
