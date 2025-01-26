import { FormItem, Form } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { HiMinus } from 'react-icons/hi'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import { Card } from '@/components/ui/Card'
import { Upload } from '@/components/ui'
import { RichTextEditor } from '@/components/shared'
import FormQuestions from '@/views/tasks/components/FormQuestions/FormQuestions'

type FormSchema = {
    images: {
        image: File[]
        imageDescription: string
    }[],
    customFields: {
        name: string
        questions: []
    }[],
    taskName: string,
    taskDescription: {textContent?: string}
}

const validationSchema: ZodType<FormSchema> = z.object({
    images: z.array(
        z.object(
            {
                imageDescription: z.string().optional(),
                image: z.array(z.instanceof(File), {message: 'Загрузите изображение'}).nonempty('Загрузите изображение'),
            }
        )
    ),
    customFields: z.array(
        z.object(
            {
                name: z.string().min(1, 'Заполните название'),
                description: z.string().min(1, 'Заполните описание'),
            }
        )
    ),
    taskName: z.string().min(1,{message: 'Обязательное поле'} ),
    taskDescription: z.object({
        textContent: z.string()
    }).optional(),
})

const DynamicForm = () => {

    const defaultValues = {
            taskName: '',
            taskDescription: '',
            images: [
                {
                    imageDescription: '',
                    image: undefined,
                },
            ],
            customQuestions: [
                {
                    name: "",
                    answers: [{ value: "", }],
                },
            ],
    };

    const {
        control,
        handleSubmit,
        register,
        getValues,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: zodResolver(validationSchema)
    })

    const onSubmit = (values: FormSchema) => {
        alert(JSON.stringify(values, null, 2))
    }

    const { fields, append, remove } = useFieldArray({
        name: 'images',
        control
    })

    return (
        <Form layout="inline" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid-cols-1 gap-2 grid w-3/4">
                <div>
                    <Card>
                        <h5 className="mb-4">Общая информация</h5>
                        <FormItem
                            layout="vertical"
                            label="Текст задания"
                            invalid={Boolean(errors.taskName)}
                            errorMessage={errors.taskName?.message}
                            className="mb-0"
                        >
                            <Controller
                                name="taskName"
                                control={control}
                                render={({ field }) =>
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Укажите, какой товар на ваш взгляд более привлекательный"
                                        {...field}
                                    />
                                }
                            />
                        </FormItem>
                        <FormItem
                            layout="vertical"
                            label="Описание задания"
                            className="mb-0 mt-5"
                        >
                            <Controller
                                name="taskDescription"
                                control={control}
                                render={({ field }) =>
                                    <RichTextEditor
                                            type="text"
                                            autoComplete="off"
                                            placeholder="Укажите, почему данный товар на ваш взгляд более привлекательный"
                                        {...field}
                                    >
                                    </RichTextEditor>
                                }
                            />
                        </FormItem>
                    </Card>
                </div>
                <div className="">
                    <Card>
                        <div>
                            <h5 className="mb-4">Изображения</h5>
                            {fields.map((userField, index) => (
                                <div key={userField.id}>
                                    <FormItem
                                        layout="vertical"
                                        label="Описание"
                                        invalid={Boolean(errors.images?.[index]?.imageDescription?.message)}
                                        errorMessage={errors.images?.[index]?.imageDescription?.message}
                                    >
                                        <Controller
                                            name={`images.${index}.imageDescription`}
                                            control={control}
                                            render={({ field }) =>
                                                <Input
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Введите описание"
                                                    {...field}
                                                />
                                            }
                                        />
                                    </FormItem>
                                    <FormItem
                                        asterisk
                                        label="Изображение"
                                        invalid={Boolean(errors.images?.[index]?.image?.message)}
                                        errorMessage={errors.images?.[index]?.image?.message}
                                    >
                                        <Controller
                                            name={`images.${index}.image`}
                                            control={control}
                                            render={({ field }) =>
                                                <Upload
                                                    fileList={field.value}
                                                    onFileRemove={(files) =>
                                                        field.onChange(files)
                                                    }
                                                    onChange={(files) =>
                                                        field.onChange(files)
                                                    }
                                                >
                                                    <Button> Выбрать изображение </Button>
                                                </Upload>
                                            }
                                        />
                                    </FormItem>
                                    <Button
                                        type="button"
                                        shape="circle"
                                        size="sm"
                                        icon={<HiMinus />}
                                        onClick={() =>remove(index)}
                                    />
                                </div>
                            ))}
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    className="ltr:mr-2 rtl:ml-2"
                                    onClick={() => {
                                        append({
                                            imageDescription: '',
                                            image: undefined,
                                        })
                                    }}
                                >
                                    Добавить поле
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
                <div>
                    <Card>
                        <h5 className="mb-4">Дополнительные поля</h5>
                        <FormQuestions {...{ errors, control, register, defaultValues, getValues, setValue }}></FormQuestions>
                    </Card>
                </div>
                <div className="grid-cols">
                    <Button
                        className="mt-2"
                        type="submit"
                        variant="solid"
                    >
                        Отправить
                    </Button>
                </div>
            </div>
        </Form>
    )
}

export default DynamicForm

