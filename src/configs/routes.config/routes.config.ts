import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const publicRoutesPages = [
    {
        key: 'viewTaskItem',
        path: '/view-task-public/:label',
        component: lazy(() => import('@/views/tasks/TaskView')),
        authority: [],
    }
]

export const protectedRoutes: Routes = [
    {
        key: 'createTaskItem',
        path: '/create-task',
        component: lazy(() => import('@/views/tasks/TaskCreate')),
        authority: [],
    },
    {
        key: 'viewTaskItem',
        path: '/view-task/:label',
        component: lazy(() => import('@/views/tasks/TaskView')),
        authority: [],
    },
    {
        key: 'viewTaskStats',
        path: '/view-task-statistics/:label',
        component: lazy(() => import('@/views/tasks/TaskStats')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'singleMenuItem',
        path: '/single-menu-view',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() => import('@/views/demo/GroupSingleMenuItemView')),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView1'),
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView2'),
        ),
        authority: [],
    },
    ...othersRoute,
]
