import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import TaskListActionTools from './components/TaskListActionTools'
import TaskListTableTools from './components/TaskListTableTools'
import TaskListTable from './components/TaskListTable'
import TaskListSelected from './components/TaskListSelected'

const TasksList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Products</h3>
                            <TaskListActionTools />
                        </div>
                        <TaskListTableTools />
                        <TaskListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <TaskListSelected />
        </>
    )
}

export default TasksList
