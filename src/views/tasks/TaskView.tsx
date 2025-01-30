import Card from '@/components/ui/Card'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { fetchTaskVote, getTaskById, getTaskByLabel, getTaskOptionsImage } from '@/services/TaskApiService'
import { FormItem, Radio, Input, Button, Checkbox, Form } from '@/components/ui'
import { ToastContainer, toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form'
import parse from 'html-react-parser'
import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ITaskCreateResponse } from '@/@types/task'

const TaskView = () => {

    const [task, setTask] = useState<ITaskCreateResponse>()
    const params = useParams<{label: string}>();

    type FormSchema = {
        inputs: {
            [key: string]: string,
        },
        option: number,
    }

    const validationSchema: ZodType<FormSchema> = z.object({
        option: z.number({message: 'Выберите значение'}),
        inputs: z.record(z.string({message: 'Введите ответ'})),
    })

    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<FormSchema>({
        defaultValues: {
            inputs: {},
        },
        resolver: zodResolver(validationSchema),
    });

    useEffect(() => {
        const fetchData = async () => {
            if (params.label) {
                console.log(decodeURIComponent(params.label));
                try {
                    const task = await getTaskByLabel(decodeURIComponent(params.label));
                    console.log(task);

                    if (task.id) {
                        setTask(task); // Обновляем состояние задачи
                    }

                    // Обновляем состояние изображений (если нужно)
                    // setImages(images);
                } catch (e) {
                    console.error("Ошибка при получении данных:", e);
                }
            }
        };
        fetchData().catch(e => {
            console.error(e);
            toast.error('Ошибка получения задачи')
        }); // Вызываем асинхронную функцию
    }, [params.label]);

    const onSubmit = async (values: FormSchema) => {

       const selectedOption = task?.options.find(option => option.id === values.option)
        try {
           if (selectedOption) {
               await fetchTaskVote({
                   reason: selectedOption?.label,
                   optionId: selectedOption?.id,
                   inputs: values.inputs,
               }, task?.id.toString())
               reset({
                   inputs: {},
               })
               toast.success('Данные успешно отправлены');
           }
        } catch (error) {
           console.error(error)
            toast.error('Ошибка выполнения запроса');
        }
    }

    return (
        <>
            <h3 className="h3 mb-5">Задание</h3>
            {task && (
                <>
                    <div className="w-3/4">
                    <Card
                        header={{
                            content: task?.label,
                        }}
                    >
                        <div className="mt-2">{parse(task.description)}</div>
                    </Card>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Card className="mt-5" header={{
                            content: 'Опции'
                        }}>
                            <FormItem
                                asterisk
                                label="Выбирите вариант"
                                className="mb-0"
                                invalid={Boolean(errors.option)}
                                errorMessage={errors.option?.message}
                            >
                                <Controller
                                    name="option"
                                    control={control}
                                    render={({ field }) =>
                                        <Radio.Group vertical {...field}>
                                            {
                                                task?.options.map(el => {
                                                    return (
                                                        <Card key={el.id} header={{
                                                            content: el.label,
                                                        }}>
                                                            <p className="mb-4">
                                                                {el.description}
                                                            </p>
                                                            <Radio key={el.id} value={el.id}>
                                                                <img src={el.imageUrl} alt="" />
                                                            </Radio>
                                                        </Card>
                                                    )
                                                })
                                            }
                                        </Radio.Group>
                                    }
                                />
                            </FormItem>
                        </Card>
                        {task.inputs.length > 0 && (
                            <Card className="mt-5" header={{
                                content: 'Дополнительные вопросы'
                            }}>
                                {task.inputs.map((input) => {
                                    return (
                                        <FormItem
                                            label={input.label}
                                            invalid={Boolean(errors.inputs?.[input.id])}
                                            errorMessage={errors.inputs?.[input.id]?.message}
                                        >
                                            <Controller
                                                key={input.id}
                                                name={`inputs.${input.id.toString()}`}
                                                control={control}
                                                render={({ field }) =>
                                                {
                                                    return (
                                                            <Input
                                                                {...field}
                                                                type="text"
                                                                placeholder="Введите ваш ответ"
                                                            />
                                                )}}
                                             />
                                        </FormItem>
                                    )
                                })}
                            </Card>
                        )}
                        <Button className="mt-5" type="submit">
                            Отправить
                        </Button>
                    </Form>
                    </div>
                </>
            )}
            <ToastContainer />
        </>
    )
}

export default TaskView

