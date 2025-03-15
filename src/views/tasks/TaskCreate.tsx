import { FormItem, Form } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/Card'
import { RichTextEditor } from '@/components/shared'
import FormQuestions from '@/views/tasks/components/FormQuestions/FormQuestions'
import FormInputs from '@/views/tasks/components/FormQuestions/FormInputs'
import RespondentSlider from '@/views/tasks/components/FormQuestions/RespondentSlider'
import { apiTaskCreate, apiTaskImageSave } from '@/services/TaskApiService'
import { FormSchema } from '@/views/tasks/types/types'
import { defaultValues, validationSchema } from '@/views/tasks/consts'
import { ToastContainer, toast } from 'react-toastify'
import { Radio } from '@/components/ui'
import { usePageMetadata } from '@/views/tasks/helpers'
import { useNavigate } from 'react-router-dom'
// import { RespondentCount } from '@/views/tasks/components/RespondentCount/respondent-count' // Импортируем компонент
import { useSessionUser } from '@/store/authStore' // Для получения баланса пользователя
import { useState } from 'react'

const TaskCreateView = () => {
    const navigate = useNavigate()
    const user = useSessionUser((state) => state.user) // Получаем данные пользователя
    const [expectedVotes, setExpectedVotes] = useState(20);
    usePageMetadata('Создать задание', '')

    const {
        control,
        handleSubmit,
        register,
        getValues,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = async (values: FormSchema) => {
        try {
            const result = await apiTaskCreate({
                description: values.description,
                label: values.label,
                options: [...values.customQuestions],
                inputs: [
                    ...values.inputs
                        .filter((el) => el.value)
                        .flatMap((obj) => Object.values(obj)),
                ],
                visible: values.visible,
                expectedVotes: expectedVotes, // Добавляем количество респондентов в запрос
            });

            const { id: taskId } = result;
            if (taskId) {
                result.options.forEach((option) => {
                    const { label } = option;
                    const existOption = values.customQuestions.find(
                        (el) => el.label === label,
                    );
                    if (existOption?.image) {
                        const formData = new FormData();
                        existOption?.image.forEach((imageInner) => {
                            formData.append('file', imageInner);
                        });
                        apiTaskImageSave(
                            formData,
                            taskId.toString(),
                            option.id.toString(),
                        ).catch((e) => {
                            // Обработка ошибок при сохранении изображений
                            if (e.response && e.response.data && e.response.data.message) {
                                toast.error(e.response.data.message);
                            } else {
                                toast.error("Произошла ошибка при загрузке изображения.");
                            }
                        });
                    }
                });
            }

            window.dataLayer.push({ event: 'create_task' });
            toast.success('Задание успешно создано');
            reset({ ...defaultValues });
            navigate('/tasks-view-list');
        } catch (e: any) { // Явно указываем тип `any`
            if (e.response && e.response.data && e.response.data.message) {
                toast.error(e.response.data.message);  // Показываем сообщение из ответа сервера
            } else {
                // Общая ошибка, если нет подробного сообщения
                toast.error('Произошла ошибка при создании задания');
            }
        }
    };

    return (
        <>
            <h1 className="mb-5 h3">Создать задание</h1>
            <Form layout="inline" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid-cols-1 gap-2 grid w-full md:w-3/4 bg-white rounded-md p-3">
                    <div>
                        <Card>
                            <h5 className="mb-4">Общая информация</h5>
                            <FormItem
                                layout="vertical"
                                label="Текст задания"
                                invalid={Boolean(errors.label)}
                                errorMessage={errors.label?.message}
                                className="mb-0"
                            >
                                <Controller
                                    name="label"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            autoComplete="off"
                                            placeholder="Укажите, какой товар на ваш взгляд более привлекательный"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                layout="vertical"
                                label="Описание задания"
                                className="mb-0 mt-5"
                            >
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <RichTextEditor
                                            content={field.value}
                                            invalid={Boolean(
                                                errors.description,
                                            )}
                                            onChange={({ html }) => {
                                                field.onChange(html)
                                            }}
                                        />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                asterisk
                                className="mb-0 mt-5"
                                layout="vertical"
                                label="Тип задания"
                                invalid={Boolean(errors.visible)}
                                errorMessage={errors.visible?.message}
                            >
                                <Controller
                                    name="visible"
                                    control={control}
                                    render={({ field }) => (
                                        <Radio.Group {...field}>
                                            <Radio value={'PUBLIC'}>
                                                Публичный
                                            </Radio>
                                            <Radio value={'PRIVATE'}>
                                                Приватный
                                            </Radio>
                                        </Radio.Group>
                                    )}
                                />
                            </FormItem>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <h5 className="mb-4">Опции</h5>
                            <FormQuestions
                                {...{
                                    errors,
                                    control,
                                    register,
                                    defaultValues,
                                    getValues,
                                    setValue,
                                }}
                            ></FormQuestions>
                        </Card>
                        <Card className="mb-4 mt-2">
                            <FormInputs
                                {...{
                                    errors,
                                    control,
                                    register,
                                    defaultValues,
                                    getValues,
                                    setValue,
                                }}
                            />
                        </Card>
                        <Card className="mb-4 mt-2">
                            <h5 className="mb-4">Количество респондентов</h5>
                            <RespondentSlider
                                value={expectedVotes}
                                onChange={setExpectedVotes}
                            />
                            <p className='text-center'>Выбранное количество: {expectedVotes}</p>
                        </Card>
                    </div>
                    {/* Добавляем компонент для выбора количества респондентов */}
                    {/* <Card>
                        <RespondentCount
                            userBalance={user.balance}
                            onSelect={(count) => setRespondentCount(count)}
                        />
                    </Card> */}
                    <div className="grid-cols">
                        <Button className="mt-2" type="submit" variant="solid">
                            Создать
                        </Button>
                    </div>
                </div>
            </Form>
            <ToastContainer />
        </>
    )
}

export default TaskCreateView
