import Card from '@/components/ui/Card';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import { fetchTaskStatistics, getTaskById } from '@/services/TaskApiService';
import { toast, ToastContainer } from 'react-toastify';
import { IResponseStatistic } from '@/@types/task';
import { useSessionUser } from '@/store/authStore';
import { usePageMetadata } from '@/views/tasks/helpers';
import { PollResults } from '@/views/tasks/components/PollStats/poll-results';
import { toInteger } from 'lodash';

const TaskStatsView = () => {
    usePageMetadata('Статистика задания', '');

    const [task, setTask] = useState<IResponseStatistic | null>(null);
    const [taskAllDetails, setTaskAllDetails] = useState<IResponseStatistic | null>(null);
    const params = useParams<{ label: string }>();
    const user = useSessionUser((state) => state.user);

    // Функция для обновления данных (оптимизирована с useCallback)
    const fetchTaskData = useCallback(async () => {
        if (!params.label) {
            toast.error('Данные не получены');
            return;
        }
        try {
            const [taskStats, taskStatsDetails] = await Promise.all([
                fetchTaskStatistics(params.label),
                getTaskById(toInteger(params.label))
            ]);

            if (taskStats.taskDetails) {
                setTask(taskStats);
            }
            if (taskStatsDetails) {
                setTaskAllDetails(taskStatsDetails);
            }
        } catch (e) {
            console.error(e);
            toast.error('Ошибка получения данных');
        }
    }, [params.label]);

    useEffect(() => {
        fetchTaskData();
    }, [fetchTaskData]);

    useEffect(() => {
        if (user.userId && user.userId !== task?.userId) {
            window.location.href = '/create-task';
        }
    }, [task, user.userId]);

    const createPollData = () => {
        if (task && taskAllDetails) {
            return {
                id: task.taskDetails.label,
                totalVotes: task.totalVotes,
                expectedVotes: taskAllDetails.expectedVotes ?? 0,
                currentVotes: taskAllDetails.currentVotes ?? 0,
                AIReport: taskAllDetails.AIreport ?? '',
                status: {
                    complete: true,
                    totalResponses: task.optionsStatistics?.reduce(
                        (sum, option) => sum + option.votesCount,
                        0
                    ) ?? 0,
                    duration: '29 минут',
                },
                options: task.optionsStatistics?.map((option) => ({
                    id: option.optionLabel,
                    title: option.optionLabel,
                    votes: option.votesCount,
                    reasons: option.reasons ?? [],
                })) ?? [],
            };
        }
        return null;
    };

    const pollData = createPollData();

    console.log('task:', task);
    console.log('taskAllDetails:', taskAllDetails);
    console.log('pollData:', pollData);

    if (!task) {
        return <div>Загрузка...</div>;
    }

    return (
        <>
            <div>
                <h3>Статистика задания</h3>
                <div className="w-3/3 mt-2">
                    <div className="flex w-full"></div>
                </div>
                {/* Передаем fetchTaskData как refreshData */}
                {pollData && <PollResults data={pollData} task={task} refreshData={fetchTaskData} />}
            </div>
            <ToastContainer />
        </>
    );
};

export default TaskStatsView;