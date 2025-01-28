import { FormItem, Form } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { HiMinus } from 'react-icons/hi'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/Card'
import { Upload } from '@/components/ui'
import { RichTextEditor } from '@/components/shared'
import FormQuestions from '@/views/tasks/components/FormQuestions/FormQuestions'
import FormInputs from '@/views/tasks/components/FormQuestions/FormInputs'
import { apiTaskCreate, apiTaskImageSave } from '@/services/TaskApiService'
import { FormSchema } from '@/views/tasks/types/types'
import { defaultValues, validationSchema } from '@/views/tasks/consts'


const TaskCreateView = () => {

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
        resolver: zodResolver(validationSchema)
    })

    const onSubmit = async (values: FormSchema) => {
        console.log(values)
        try {
            const result = await apiTaskCreate({
                description: values.description,
                label: values.label,
                options: [
                    ...values.customQuestions,
                ] as [],
                inputs: [
                    ...values.inputs.flatMap(obj => Object.values(obj)),
                ] as [],
            });
            if (result.id) {
                const { id, label } = result;
                values.images.forEach(image => {
                    console.log(image)
                    const formData = new FormData()
                    image.image?.forEach(imageInner => {
                        formData.append('file', imageInner)
                    })
                    apiTaskImageSave(formData, id.toString(), label).then(result => {
                        console.log(result);
                    }).catch(e => {
                        console.log(e);
                    });
                })
            }
            reset({ ...defaultValues })
            console.log(result);
        } catch (e) {
            console.error(e)
        }
    }

    const { fields, append, remove } = useFieldArray({
        name: 'images',
        control
    })

    return (
        <>
            <h1 className="mb-5 h3">Создать задание</h1>
            <Form layout="inline" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid-cols-1 gap-2 grid w-3/4">
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
                                            invalid={Boolean(errors.description)}
                                            onChange={({html}) => {
                                                field.onChange(html)
                                            }}
                                        />
                                    )}
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
                                            asterisk
                                            label="Изображение"
                                            invalid={Boolean(
                                                errors.images?.[index]?.image
                                                    ?.message,
                                            )}
                                            errorMessage={
                                                errors.images?.[index]?.image
                                                    ?.message
                                            }
                                        >
                                            <Controller
                                                name={`images.${index}.image`}
                                                control={control}
                                                render={({ field }) => (
                                                    <Upload
                                                        fileList={field.value}
                                                        onFileRemove={(files) =>
                                                            field.onChange(
                                                                files,
                                                            )
                                                        }
                                                        onChange={(files) =>
                                                            field.onChange(
                                                                files,
                                                            )
                                                        }
                                                    >
                                                        <Button>
                                                            {' '}
                                                            Выбрать изображение{' '}
                                                        </Button>
                                                    </Upload>
                                                )}
                                            />
                                        </FormItem>
                                        <Button
                                            type="button"
                                            shape="circle"
                                            size="sm"
                                            icon={<HiMinus />}
                                            onClick={() => remove(index)}
                                        />
                                        <FormItem
                                            layout="vertical"
                                            label="Описание"
                                            invalid={Boolean(
                                                errors.images?.[index]
                                                    ?.imageDescription?.message,
                                            )}
                                            errorMessage={
                                                errors.images?.[index]
                                                    ?.imageDescription?.message
                                            }
                                        >
                                            <Controller
                                                name={`images.${index}.imageDescription`}
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        type="text"
                                                        autoComplete="off"
                                                        placeholder="Введите описание"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </FormItem>
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
                    </div>
                    <div className="grid-cols">
                        <Button className="mt-2" type="submit" variant="solid">
                            Отправить
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default TaskCreateView

