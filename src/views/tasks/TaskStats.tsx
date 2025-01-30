
import Card from '@/components/ui/Card'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchTaskStatistics } from '@/services/TaskApiService'
import { toast, ToastContainer } from 'react-toastify'
import { IResponseStatistic } from '@/@types/task'
import parse from 'html-react-parser'

const TaskStatsView = () => {

    const [task, setTask] = useState<IResponseStatistic | null>(null);
    const params = useParams<{label: string}>();

    useEffect(() => {

        async function fetchTaskData() {
            if (params.label) {
                const taskStats = await fetchTaskStatistics(params.label);
                if (taskStats.taskDetails) {
                    setTask(taskStats);
                }
            } else {
                toast.error('Данные не получены');
            }
        }

        fetchTaskData().catch(e => {
            console.error(e);
            toast.error('Ошибка получения даннных')
        })

    }, [params.label]);


    return (
        <>
            <div>
                <h3>Статистика задания</h3>
                <div className="w-3/3">
                        <Card className="mt-5">
                            <h5>
                                {task?.taskDetails.label}
                            </h5>
                            {task?.taskDetails.description  &&
                                parse(task?.taskDetails?.description)
                            }
                            <p>Количество открытий: <b> { task?.taskDetails.openCount } </b> </p>
                        </Card>
                        <div className="flex">
                            <Card className="mt-5" header={
                                {
                                    content: 'Статистика опций'
                                }
                            }>
                                <div class="flex gap-5 flex-wrap">
                                    {task?.optionsStatistics.map((option, i) => {
                                        return (
                                            <Card
                                                key={i}
                                                className="w-[calc(50%-2rem)]"
                                                header={{
                                                    content: option.optionLabel,
                                                }}
                                            >
                                                <img
                                                    className="task-vote-img"
                                                    src={option.imageUrl}
                                                    alt=""
                                                />
                                                <p className="mt-2">
                                                    Количество голосов:{' '}
                                                    {option.votesCount}
                                                </p>
                                                {option?.reasons.length > 0 && (
                                                    <>
                                                        <h5>Причины: </h5>
                                                        <ul>
                                                            {option.reasons.map(
                                                                (
                                                                    reas,
                                                                    index,
                                                                ) => {
                                                                    return (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                reas
                                                                            }
                                                                        </li>
                                                                    )
                                                                },
                                                            )}
                                                        </ul>
                                                    </>
                                                )}
                                            </Card>
                                        )
                                    })}
                                </div>
                            </Card>
                        </div>
                    </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default TaskStatsView

