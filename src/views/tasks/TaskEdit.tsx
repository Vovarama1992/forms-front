import { FormItem, Form } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/Card'
import {
    apiAddSingleTaskInput, apiAddSingleTaskOption,
    apiDeleteSingleTaskInput,
    apiDeleteSingleTaskOption, apiTaskImageSave,
    apiUpdateTask,
    getTaskById
} from '@/services/TaskApiService'
import { FormSchema } from '@/views/tasks/types/types'
import { defaultValues, validationSchema } from '@/views/tasks/consts'
import { ToastContainer, toast } from 'react-toastify';
import { Radio, Upload } from '@/components/ui'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { ITaskCreateResponse, ITaskOptionResponse } from '@/@types/task'
import { urlToFile, usePageMetadata } from '@/views/tasks/helpers'
import { RichTextEditor } from '@/components/shared'
import { HiMinus } from 'react-icons/hi'

const TaskCreateView = () => {

    usePageMetadata(
        'Редактирование задание',
        'Страница редактирования задания'
    );

    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: defaultValues,
        resolver: zodResolver(validationSchema)
    })

    const [oldTask, setOldTask] = useState<ITaskCreateResponse>()
    const params = useParams<{ id: string }>()
    const navigate = useNavigate()

    // Подписка на изменения поля 'email'

    const setFormData = async (task) => {
        reset({
            description: task.description,
            label: task.label,
            customQuestions: task.options.map((option: ITaskOptionResponse) => {
                   return {
                        ...option,
                        optionId: option.id,
                    }
            }),
            inputs: task.inputs.map(el => {
                return {
                    value: el.label,
                    inputId: el.id,
                }
            }),
            visible: task.visible,
        })

        // setDescription(task.description?.replace(/<\/?[^>]+(>|$)/g, "") || "")


        task.options.forEach((option, index) => {
            if (option.imageUrl) {
                urlToFile(option.imageUrl).then(r => {
                    const options = getValues('customQuestions');
                    options[index].image = [r]
                    setValue('customQuestions', options);
                })
            }
        })
    }

    useEffect(() => {
        const taskId = params.id;

        if (!taskId) {
            navigate('/tasks-view-list');
        } else {
            try {
                const fetchTask = async () => {
                    const task = await getTaskById(+taskId);
                    if (task) {
                        setOldTask(task);
                        await setFormData(task);
                    }
                }
                fetchTask();
            } catch (e) {
                toast.error('There was an error while fetching tasks');
            }
        }
    }, [])

    const { fields, append, remove } = useFieldArray({
        name: 'inputs',
        control
    })

    const { fields: questionsFields, insert: questionInsert, append: questionAppend,remove: questionRemove } = useFieldArray({
        control,
        name: "customQuestions"
    });

    const onRemoveInput = async (id: number) => {
        try {
            if (oldTask?.id && id) {
                await apiDeleteSingleTaskInput(oldTask.id, id);
            }
            toast.success('Вопрос успешно удален')
        } catch (e) {
        }
    }

    const onQuestionRemove = async (id: number) => {
        try {
            if (oldTask?.id && id) {
                await apiDeleteSingleTaskOption(oldTask.id, id);
            }
            toast.success('Опция успешно удалена')
        } catch (e) {
        }
    }

    const onSubmit = async (values: FormSchema) => {

        try {

            const inputs = getValues('inputs');
            const options = getValues('customQuestions');

            if (oldTask?.id) {

                for (const input of inputs) {
                    console.log(input, 'input');
                    if (input.value && (input.inputId === undefined || input.inputId === null)) {
                        await apiAddSingleTaskInput(input.value, oldTask.id);
                    }
                }

                for (const option of options) {

                    if (option.optionId === undefined || option.optionId === null) {
                        const optionResult = await apiAddSingleTaskOption({
                            label: option.label,
                            description: option.description,
                        }, oldTask.id);

                        if (option?.image) {
                            const formData = new FormData()
                            option?.image.forEach(imageInner => {
                                formData.append('file', imageInner)
                            })
                            await apiTaskImageSave(formData, oldTask.id.toString(), optionResult.id.toString()).catch(e => {
                                toast.error(e.response.data.message);
                            });
                        }
                    }

                    // if (input.value) {
                    //     console.log(input.value, 'dasds')
                    //     await apiAddSingleTaskInput(input.value, oldTask?.id);
                    // }
                }
            }

            if (oldTask) {
                const updateTask = await apiUpdateTask({
                    description: values.description,
                    label: values.label,
                    visible: values.visible,
                }, oldTask.id);
            }
            toast.success('Задание успешно обновлено')
            // reset({ ...defaultValues })
        } catch (e) {
            console.log(e);
            toast.error("Произошла ошибка")
        }
    }

    const setDefaultOptions = () => {

    }

    return (
        <>
            {oldTask?.id && (
                <>
                <h1 className="mb-5 h3">Редактирование задание</h1>
                <Form layout="inline" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid-cols-1 gap-2 grid w-full md:w-3/4">
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
                                        render={({ field }) => {
                                            return (
                                                <>
                                                    <RichTextEditor
                                                        {...field}
                                                        content={field.value || ""} // Только данные из формы
                                                        onChange={({ html }) => {
                                                            field.onChange(html); // Обновляем только форму
                                                        }}
                                                    />
                                                </>
                                            )
                                        }}
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
                                        render={({ field }) =>
                                            <Radio.Group {...field}>
                                                <Radio value={'PUBLIC'}>Публичный</Radio>
                                                <Radio value={'PRIVATE'}>Приватный</Radio>
                                            </Radio.Group>
                                        }
                                    />
                                </FormItem>
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <h5 className="mb-4">Опции</h5>
                                <div className="mt-5">
                                    {questionsFields.map((item, index) => {
                                        return (
                                            <div key={item.id} className="mt-5 w-full flex flex-wrap mb-5">
                                                <div className="flex w-full flex-wrap">
                                                    <FormItem
                                                        className="w-full"
                                                        label="Название"
                                                        layout="vertical"
                                                        invalid={Boolean(errors.customQuestions?.[index]?.label)}
                                                        errorMessage={errors.customQuestions?.[index]?.label?.message}
                                                    >
                                                        <Controller
                                                            name={`customQuestions.${index}.label`}
                                                            control={control}
                                                            render={({ field }) =>
                                                                <Input
                                                                    readOnly={!!item.optionId}
                                                                    type="text"
                                                                    autoComplete="off"
                                                                    placeholder="Введите название"
                                                                    {...field}
                                                                />
                                                            }
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        className="w-full"
                                                        layout="vertical"
                                                        label="Описание"
                                                        invalid={Boolean(errors.customQuestions?.[index]?.description)}
                                                        errorMessage={errors.customQuestions?.[index]?.description?.message}
                                                    >
                                                        <Controller
                                                            name={`customQuestions.${index}.description`}
                                                            control={control}
                                                            render={({ field }) =>
                                                                <Input
                                                                    readOnly={!!item.optionId}
                                                                    type="text"
                                                                    autoComplete="off"
                                                                    placeholder="Введите описание"
                                                                    {...field}
                                                                />
                                                            }
                                                        />
                                                    </FormItem>
                                                </div>
                                                <div className="w-full">
                                                    <FormItem
                                                        asterisk
                                                        label="Изображение"
                                                        invalid={Boolean(
                                                            errors.customQuestions?.[index]?.image,
                                                        )}
                                                        errorMessage={
                                                            errors.customQuestions?.[index]?.image?.message
                                                        }
                                                    >
                                                        <Controller
                                                            name={`customQuestions.${index}.image`}
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Upload
                                                                    showList
                                                                    disabled={!!item.optionId}
                                                                    uploadLimit={1}
                                                                    fileList={field.value}
                                                                    onFileRemove={(files) => {
                                                                        field.onChange(files);
                                                                    }}
                                                                    onChange={(files) =>
                                                                        field.onChange(
                                                                            files,
                                                                        )
                                                                    }
                                                                >
                                                                    <Button onClick={(e) => e.preventDefault()}>
                                                                        {' '}
                                                                        Выбрать изображение{' '}
                                                                    </Button>
                                                                </Upload>
                                                            )}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        layout="vertical"
                                                        className="w-full"
                                                        label="Описание изображения"
                                                        invalid={Boolean(
                                                            errors.customQuestions?.[index]?.imageDescription,
                                                        )}
                                                        errorMessage={
                                                            errors.customQuestions?.[index]?.imageDescription?.message
                                                        }
                                                    >
                                                        <Controller
                                                            name={`customQuestions.${index}.imageDescription`}
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Input
                                                                    readOnly={!!item.optionId}
                                                                    type="text"
                                                                    autoComplete="off"
                                                                    placeholder="Введите описание"
                                                                    {...field}
                                                                />
                                                            )}
                                                        />
                                                    </FormItem>
                                                    <Button
                                                        className=""
                                                        type="button"
                                                        shape="circle"
                                                        size="sm"
                                                        icon={<HiMinus />}
                                                        onClick={() => {
                                                            questionRemove(index)
                                                            onQuestionRemove(item?.optionId)
                                                        }}
                                                    > Удалить </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            questionAppend({ label: "", description: "" });
                                        }}
                                    >
                                        Добавить опцию
                                    </Button>
                                </div>
                            </Card>
                            <Card className="mb-4 mt-2">
                                <div>
                                    <div className="mb-5">
                                        <h5 className="mb-2">Дополнительные вопросы</h5>
                                    </div>
                                    {fields.map((item, index) => (
                                        <div key={index}>
                                            <FormItem
                                                layout="vertical"
                                                label="Вопрос"
                                            >
                                                <Controller
                                                    name={`inputs.${index}.value`}
                                                    control={control}
                                                    render={({ field }) =>
                                                        <Input
                                                            readOnly={!!item.inputId}
                                                            type="text"
                                                            autoComplete="off"
                                                            {...field}
                                                        />
                                                    }
                                                />
                                            </FormItem>
                                            <Button
                                                type="button"
                                                shape="circle"
                                                size="sm"
                                                className="mb-5"
                                                icon={<HiMinus />}
                                                onClick={() => {
                                                    remove(index)
                                                    onRemoveInput(item.inputId)
                                                }}
                                            > Удалить </Button>
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            className="ltr:mr-2 rtl:ml-2"
                                            onClick={() => {
                                                append({
                                                    value: '',
                                                })
                                            }}
                                        >
                                            Добавить вопрос
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="grid-cols">
                            <Button className="mt-2" type="submit" variant="solid">
                                Сохранить
                            </Button>
                            {/*<Button className="mt-2 ml-5 bg-red-500 hover:bg-red-400" type="button" variant="solid"  onClick={() => setFormData({...oldTask})}>*/}
                            {/*    Отменить*/}
                            {/*</Button>*/}
                        </div>
                    </div>
                    </Form>
                <ToastContainer/>
                </>
            )}
        </>
    )
}

export default TaskCreateView

