
import Card from '@/components/ui/Card'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchTaskStatistics } from '@/services/TaskApiService'
import { toast, ToastContainer } from 'react-toastify'
import { IResponseStatistic } from '@/@types/task'
import parse from 'html-react-parser'
import Accordion from '@/components/shared/Accordion/Accordion'
import { useSessionUser } from '@/store/authStore'

const TaskStatsView = () => {

    const [task, setTask] = useState<IResponseStatistic | null>(null);
    const params = useParams<{label: string}>();
    const user = useSessionUser((state) => state.user)

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

    useEffect(() => {
        if (user.userId && user.userId !== task?.userId) {
            window.location.href = '/create-task'
        }
    }, [task, user.userId])

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
                        <div className="flex w-full">
                            <Card className="mt-5 w-full" header={
                                {
                                    content: 'Статистика опций'
                                }
                            }>
                                <div className="flex gap-5 w-full flex-wrap">
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
                                                    className="task-vote-img max-w-full"
                                                    src={option.imageUrl}
                                                    alt=""
                                                />
                                                <p className="mt-2">
                                                    Количество голосов:{' '}
                                                    {option.votesCount}
                                                </p>
                                                {option?.reasons.length > 0 && (
                                                    <>
                                                        <h5>Причины выбора опции: </h5>
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
                        { !!task?.inputsStatistics?.length &&  (
                            <Card className="mt-5" header={{
                                content: 'Вопросы и ответы'
                            }}>
                                {
                                    task?.inputsStatistics.map((input, index) => {
                                        return (
                                            <div key={index} className="mb-5">
                                               <Accordion data={[{title: input.inputLabel, content: input.answers}]} />
                                            </div>
                                        )
                                    })
                                }

                            </Card>
                        ) }
                    </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default TaskStatsView

