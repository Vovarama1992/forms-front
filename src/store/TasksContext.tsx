import { createContext, useContext, useState, ReactNode } from 'react'
import { ITaskTable } from '@/@types/task'

interface TaskContextType {
    tasks: ITaskTable[]
    setTasks: (tasks: ITaskTable[]) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<ITaskTable[]>([])

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider')
    }
    return context
}