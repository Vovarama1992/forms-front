import Card from '@/components/ui/Card'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { getTaskById, getTaskByLabel, getTaskOptionsImage } from '@/services/TaskApiService'
import { FormItem, Radio, Input, Button, Checkbox, Form } from '@/components/ui'
import { ToastContainer, toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form'
import parse from 'html-react-parser'
import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ITaskCreateResponse } from '@/@types/task'

const TaskView = () => {

    const [task, setTask] = useState<ITaskCreateResponse>()
    // const [images, setImages] = useState<Record<string, any>>(null)
    const paramas = useParams<{label: string}>();

    type FormSchema = {
        inputs: {
            [key: string]: string,
        }[],
        option: string,
    }

    const validationSchema: ZodType<FormSchema> = z.object({
        option: z.number({message: 'Выберите значение'}),
        inputs: z.array(z.object({
            key: z.string(),
        })),
    })

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<FormSchema>({
        defaultValues: {
            inputs: [],
        },
        resolver: zodResolver(validationSchema),
    });

    useEffect(() => {
        const fetchData = async () => {
            if (paramas.label) {
                console.log(decodeURIComponent(paramas.label));
                try {
                    const task = await getTaskByLabel(decodeURIComponent(paramas.label));
                    console.log(task);

                    if (task.id) {
                        setTask(task); // Обновляем состояние задачи
                    }

                    const taskImages = task.options.map(async (option) => {
                        const image = await getTaskOptionsImage(task.id.toString(), option.id.toString(), option.label);
                        console.log(image);
                    })

                    // Получаем изображения для задачи
                    console.log(taskImages);

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
    }, [paramas.taskId]);

    const onSubmit = (values: FormSchema) => {
        window.alert(JSON.stringify(values))
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
                                                        <Radio key={el.id} value={el.id}>{el.label}</Radio>
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
                                            key={input.id}
                                            className="mb-4"
                                            label={input.label}
                                        >
                                            <Input
                                                onChange={(event => {

                                                })}
                                                type="text"
                                                name="fieldA"
                                                placeholder="Введите ваш ответ"
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

