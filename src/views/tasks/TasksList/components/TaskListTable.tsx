import { useEffect, useMemo, useState } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useNavigate } from 'react-router-dom'
import { TbChartHistogram, TbEye, TbLink, TbPencil, TbTrash } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { TableQueries } from '@/@types/common'
import { apiTaskFetch, apiTasksDelete } from '@/services/TaskApiService'
import { ITaskTable, ITaskTableSingle } from '@/@types/task'
import { toast, ToastContainer } from 'react-toastify'
import { Button } from '@/components/ui'
import { AxiosError } from 'axios'
import { usePageMetadata } from '@/views/tasks/helpers'

const ActionColumn = ({
    onEdit,
    onDelete,
    onView,
    onCopy,
    onStats,
}: {
    onEdit: () => void
    onDelete: () => void
    onView: () => void
    onCopy: () => void
    onStats: () => void
}) => {
    return (
        <div className="flex items-center justify-end gap-3">
            <Tooltip title="Редактировать">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>
            <Tooltip title="Удалить">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onDelete}
                >
                    <TbTrash />
                </div>
            </Tooltip>
            <Tooltip title="Просмотреть">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onView}
                >
                    <TbEye /> {/* Иконка глаза для просмотра */}
                </div>
            </Tooltip>
            <Tooltip title="Перейти к статистике">
                <div
                    className="text-xl cursor-pointer select-none font-semibold"
                    role="button"
                    onClick={onStats}
                >
                    <TbChartHistogram /> {/* Иконка для статистики */}
                </div>
            </Tooltip>
            <Tooltip title="Скопировать ссылку">
                <div
                    className="text-xl cursor-pointer select-none font-semibold"
                    role="button"
                    onClick={onCopy}
                >
                    <TbLink /> {/* Иконка для копирования ссылки */}
                </div>
            </Tooltip>
        </div>
    )
}

const TaskListTable = () => {

    usePageMetadata(
        'Список заданий',
        ''
    );

    const navigate = useNavigate()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [toDeleteId, setToDeleteId] = useState<number[] | null>(null)
    const [selectedTasks, setSelectedTasks] = useState<ITaskTableSingle[]>([]);

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleDelete = (task: ITaskTableSingle) => {
        setDeleteConfirmationOpen(true)
        setToDeleteId([task.id])
    }

    const handleView = (taskId: string | number) => {
         navigate(`/view-task/${taskId}`)
    }

    const handleEdit = (taskId: string | number) => {
        navigate(`/edit-task/${taskId}`)
    }

    const handleNavigateToStats = (taskId: string | number) => {
        navigate(`/view-task-statistics/${taskId}`)
    }

    const handleClipard = async (taskId: string | number, visible: 'PRIVATE' | 'PUBLIC') => {
        // Получаем текущий протокол и хост (например, "https://example.com")
        const { protocol, host } = window.location;
        // Создаем полный URL для редактирования задачи
        let fullUrl = `${protocol}//${host}/`;
        if (visible === 'PRIVATE') {
            fullUrl += `view-task/${taskId}`
        } else {
            fullUrl += `view-task-public/${taskId}`
        }
        await navigator.clipboard.writeText(fullUrl);

        toast.success("Ссылка скопирована")

    };

    const handleConfirmDelete = async () => {
        if (!toDeleteId) return false
        const newProductList = tasks.filter((task) => {
            return !toDeleteId.includes(task.id);
        })
        setSelectedTasks([])
        setTasks(newProductList);
        try {
            await apiTasksDelete(toDeleteId)
            toast.success('Задание успешно удалено')
        } catch (e) {
            const error = e as AxiosError<{ message: string }>;
            toast.error(error.message)
        }
        setDeleteConfirmationOpen(false)
        setToDeleteId(null)
    }

    const handleMassDelete = async () => {
        console.log(selectedTasks)
        setToDeleteId([...selectedTasks.map((elem) => elem.id)])
        setDeleteConfirmationOpen(true)
    }


    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [tasks, setTasks] = useState<ITaskTable[]>([]);

    useEffect(() => {

        async function getData() {
            try {
                const tasks = await apiTaskFetch();
                setTasks(tasks);
            } catch (e) {
                const error = e as AxiosError<{ message: string }>;
                toast.error(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        getData();
    }, [])

    const columns: ColumnDef<ITaskTable>[] = useMemo(
        () => [
            {
                header: 'Название',
                accessorKey: 'label',
                cell: (props) => {
                    const { label, id } = props.row.original
                        return (
                            <>
                                <div className="font-bold heading-text">
                                    Название: {label}
                                </div>
                                <div className="">ID: {id}</div>
                            </>
                        )
                },
            },
            {
                header: 'Тип',
                accessorKey: 'visible',
                cell: (props) => {
                    const { visible } = props.row.original
                    if (visible === 'PUBLIC') {
                        return (
                            <span className="font-bold heading-text">
                            Публичный
                        </span>
                        )
                    } else {
                        return (
                            <span className="font-bold heading-text">
                            Приватный
                        </span>
                        )
                    }
                },
            },
            {
                header: 'Голоса по опциям',
                accessorKey: 'options',
                cell: (props) => {
                    const { options } = props.row.original
                    const result = options.reduce((acc, curr, currentIndex) => {
                        const dash = currentIndex !== options.length - 1 ? '/' : '';
                        return acc  + curr._count + dash;
                    }, '')
                    return (
                        <div className="flex flex-col gap-1">
                            <span className="flex gap-1">
                                { result }
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Количество голосов',
                accessorKey: 'openCount',
                cell: (props) => {
                    const { options } = props.row.original
                    const result = options.reduce((acc, curr, currentIndex) => {
                        return acc  + curr._count;
                    }, 0)
                    return (
                        <span className="font-bold heading-text">
                            {result}
                        </span>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => handleEdit(props.row.original.id)}
                        onDelete={() => handleDelete(props.row.original)}
                        onView={() => handleView(props.row.original.id)}
                        onCopy={() => handleClipard(props.row.original.id, props.row.original.visible)}
                        onStats={() => handleNavigateToStats(props.row.original.id)}
                    />
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const handleSort = (sort: OnSortParam) => {
        const {order, key} = sort;
        if (order.toLocaleLowerCase() === 'asc' || order.toLocaleLowerCase() === 'desc') {

            const sortedTasks = [...tasks];

            sortedTasks.sort((a, b) => {
                const valueA = a[key];
                const valueB = b[key];

                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    return order.toLowerCase() === 'asc' ? valueA - valueB : valueB - valueA;
                }

                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return order.toLowerCase() === 'asc'
                        ? valueA.localeCompare(valueB)
                        : valueB.localeCompare(valueA);
                }
                return 0;
            });
            setTasks(sortedTasks)
        }
    }

    const handleRowSelect = (checked: boolean, row: ITaskTableSingle) => {
        const prevData = selectedTasks.concat()
        console.log(selectedTasks, 'prevValue');
        if (checked) {
            setSelectedTasks([...selectedTasks, ...[row]])
            return selectedTasks;
        } else {
            if (prevData.some((prevTask) => row.id === prevTask.id)) {
                  const selectedProducts = prevData.filter((prevTask) => prevTask.id !== row.id)
                  setSelectedTasks([...selectedProducts]);
            }
            setSelectedTasks([...prevData])
        }
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<ITaskTableSingle>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectedTasks(originalRows)
        } else {
            setSelectedTasks([])
        }
    }

    return (
        <>
            <DataTable
                compact
                overflow
                columns={columns}
                data={tasks}
                noData={tasks.length === 0}
                loading={isLoading}
                isPagination={false}
                className="task-custom-table"
/*                checkboxChecked={(row) =>
                    selectedProduct.some((selected) => selected.id === row.id)
                }*/
                onSort={handleSort}
                onCheckBoxChange={handleRowSelect}
                onIndeterminateCheckBoxChange={handleAllRowSelect}
            />
            { selectedTasks.length > 0 && (
                <div>
                    <Button variant="solid" className="bg-red-500 hover:bg-red-400" onClick={() => handleMassDelete()}>
                        Удалить выбранные задания
                    </Button>
                </div>
            ) }
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Удаление задания"
                confirmText={"Удалить"}
                cancelText={"Отменить"}
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    {' '}
                    Вы уверены, что хотите удалить это задание/задания? Это действие нельзя отменить.{' '}
                </p>
            </ConfirmDialog>
            <ToastContainer/>
        </>
    )
}

export default TaskListTable
