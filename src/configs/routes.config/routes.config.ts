import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const publicRoutesPages = [
    {
        key: 'viewTaskItemPublic',
        path: '/view-task-public/:id',
        component: lazy(() => import('@/views/tasks/TaskView')),
        authority: [],
    },
]

export const protectedRoutes: Routes = [
    {
        key: 'createTaskItem',
        path: '/create-task',
        component: lazy(() => import('@/views/tasks/TaskCreate')),
        authority: [],
    },
    {
        key: 'settingsUserItem',
        path: '/user/settings',
        component: lazy(() => import('@/views/user/Settings/Settings')),
        authority: [],
    },
    {
        key: 'viewTaskItem',
        path: '/view-task/:id',
        component: lazy(() => import('@/views/tasks/TaskView')),
        authority: [],
    },
    {
        key: 'viewTaskItem',
        path: '/edit-task/:id',
        component: lazy(() => import('@/views/tasks/TaskEdit')),
        authority: [],
    },
    {
        key: 'ViewTasksList',
        path: '/view-task-list',
        component: lazy(() => import('@/views/tasks/TasksList/TasksList')),
        authority: [],
    },
    {
        key: 'viewTaskStats',
        path: '/view-task-statistics/:label',
        component: lazy(() => import('@/views/tasks/TaskStats')),
        authority: [],
    },
    {
        key: 'privacyPage',
        path: '/privacy',
        component: lazy(() => import('@/views/privacy/page')), // Укажите путь к компоненту
        authority: [], // Укажите необходимые права доступа, если требуется
    },
    ...othersRoute,
]
