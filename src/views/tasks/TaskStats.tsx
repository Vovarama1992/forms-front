import Card from '@/components/ui/Card'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {fetchTaskStatistics, getTaskById} from '@/services/TaskApiService'
import { toast, ToastContainer } from 'react-toastify'
import { IResponseStatistic } from '@/@types/task'
import parse from 'html-react-parser'
import Accordion from '@/components/shared/Accordion/Accordion'
import { useSessionUser } from '@/store/authStore'
import { usePageMetadata } from '@/views/tasks/helpers'
import { PollResults } from '@/views/tasks/components/PollStats/poll-results'
import {toInteger} from "lodash"; // Импортируем PollResults

const TaskStatsView = () => {
    usePageMetadata('Статистика задания', '')

    const [task, setTask] = useState<IResponseStatistic | null>(null)
    const [taskAllDetails, setTaskAllDetails] = useState<IResponseStatistic | null>(null)
    const params = useParams<{ label: string }>()
    const user = useSessionUser((state) => state.user)

    useEffect(() => {
        async function fetchTaskData() {
            if (params.label) {
                const taskStats = await fetchTaskStatistics(params.label)
                if (taskStats.taskDetails) {
                    setTask(taskStats)
                }
            } else {
                toast.error('Данные не получены')
            }
        }

        fetchTaskData().catch((e) => {
            console.error(e)
            toast.error('Ошибка получения даннных')
        })
    }, [params.label])

    useEffect(() => {
        async function fetchTaskData() {
            if (params.label) {
                const taskStatsDetails = await getTaskById(toInteger(params.label))
                if (taskStatsDetails) {
                    setTaskAllDetails(taskStatsDetails)
                }
            } else {
                toast.error('Данные не получены')
            }
        }

        fetchTaskData().catch((e) => {
            console.error(e)
            toast.error('Ошибка получения даннных')
        })
    }, [params.label])

    useEffect(() => {
        if (user.userId && user.userId !== task?.userId) {
            window.location.href = '/create-task'
        }
    }, [task, user.userId])

    const mockPollData = {
        id: '123',
        status: {
            complete: true,
            totalResponses: 100,
            duration: '29 минут',
        },
        options: [
            {
                id: 'А',
                title: 'АктивДафф',
                votes: 19,
                reasons: [
                    'Прозрачность операции',
                    'Сообщение об одобрении очень радуют',
                    'Наименее отталкивающая',
                    'Понятно, о чем речь',
                    'Четко и понятно сказано',
                ],
            },
            {
                id: 'Б',
                title: 'ХастлДафф',
                votes: 23,
                reasons: [
                    'Смайлик мешочка с деньгами привлекает',
                    'Больше подходит и сразу видно будет видно в уведомлениях какая сумма мне одобрена',
                    'Стоит значок денег и уточнена сумма плюс есть слово выплата сразу все ясно',
                ],
            },
            {
                id: 'В',
                title: 'ДейлиДаффи',
                votes: 18,
                reasons: [
                    'Цепляет взгляд. Смайлик и сумма сразу дают понять о чем речь',
                    'Хорошо видно сумму',
                    'Понятный интерфейс',
                ],
            },
            {
                id: 'Г',
                title: 'ДжимИзи',
                votes: 25,
                reasons: [
                    'Привлекательный дизайн',
                    'Четкая информация',
                    'Хорошо структурировано',
                ],
            },
            {
                id: 'Д',
                title: 'ДжимДафф',
                votes: 15,
                reasons: [
                    'Простой и понятный интерфейс',
                    'Легко читается',
                    'Минималистичный дизайн',
                ],
            },
        ],
    }
    // Преобразуем данные для PollResults
    const pollData = task
        ? {
              id: task.taskDetails.label,
              totalVotes:task.totalVotes,
              AIReport: taskAllDetails?.AIReport ?? null,
              status: {
                  complete: true, // Предположим, что опрос завершен
                  totalResponses: task.optionsStatistics.reduce(
                      (sum, option) => sum + option.votesCount,
                      0,
                  ),
                  duration: '29 минут', // Примерное время, можно заменить на реальное
              },
              options: task.optionsStatistics.map((option) => ({
                  id: option.optionLabel,
                  title: option.optionLabel,
                  votes: option.votesCount,
                  reasons: option.reasons,
              })),
          }
        : null

    return (
        <>
            <div>
                <h3>Статистика задания</h3>
                <div className="w-3/3">
                    <div className="flex w-full"></div>
                    {!!task?.inputsStatistics?.length && (
                        <Card
                            className="mt-5"
                            header={{
                                content: 'Вопросы и ответы',
                            }}
                        >
                            {task?.inputsStatistics.map((input, index) => {
                                return (
                                    <div key={index} className="mb-5">
                                        <Accordion
                                            data={[
                                                {
                                                    title: input.inputLabel,
                                                    content: input.answers,
                                                },
                                            ]}
                                        />
                                    </div>
                                )
                            })}
                        </Card>
                    )}
                </div>
                {/* Отображаем PollResults, если данные есть */}
                {pollData && <PollResults data={pollData} />}
            </div>
            <ToastContainer />
        </>
    )
}

export default TaskStatsView
