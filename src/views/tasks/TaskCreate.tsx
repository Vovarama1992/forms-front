import { FormItem, Form } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/Card'
import { RichTextEditor } from '@/components/shared'
import FormQuestions from '@/views/tasks/components/FormQuestions/FormQuestions'
import FormInputs from '@/views/tasks/components/FormQuestions/FormInputs'
import { apiTaskCreate, apiTaskImageSave } from '@/services/TaskApiService'
import { FormSchema } from '@/views/tasks/types/types'
import { defaultValues, validationSchema } from '@/views/tasks/consts'
import { ToastContainer, toast } from 'react-toastify';
import { Radio } from '@/components/ui'


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
        try {
            const result = await apiTaskCreate({
                description: values.description,
                label: values.label,
                options: [
                    ...values.customQuestions,
                ],
                inputs: [
                    ...values.inputs.flatMap(obj => Object.values(obj)),
                ],
                visible: values.visible,
            });
            const { id:taskId } = result;
            if (taskId) {
                result.options.forEach(option => {
                    const { label } = option;
                    const existOption = values.customQuestions.find(el => el.label === label);
                    if (existOption?.image) {
                        const formData = new FormData()
                        existOption?.image.forEach(imageInner => {
                            formData.append('file', imageInner)
                        })
                        apiTaskImageSave(formData, taskId.toString(), option.label).catch(e => {
                            toast.error(e.response.data.message);
                        });
                    }
                })
            }
            toast.success('Задание успешно создано')
            reset({ ...defaultValues })
            console.log(result);
        } catch (e) {
            console.log(e);
            toast.error("Произошла ошибка")
        }
    }

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
            <ToastContainer/>
        </>
    )
}

export default TaskCreateView

