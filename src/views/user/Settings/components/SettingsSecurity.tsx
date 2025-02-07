import { useState, useRef } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, FormItem } from '@/components/ui/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import { updateUserPassword } from '@/services/AccontsService'

type PasswordSchema = {
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
}

const validationSchema: ZodType<PasswordSchema> = z
    .object({
        currentPassword: z
            .string().min(1, { message: 'Пожалуйста, введите свой текущий пароль!' }),
        newPassword: z.string().min(1, { message: 'Пожалуйста, введите новый пароль!' }),
        confirmNewPassword: z.string().min(1, { message: 'Пожалуйста, подтвердите новый пароль!' }),
    })
    .refine((data) => data.confirmNewPassword === data.newPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmNewPassword'],
    })

const SettingsSecurity = () => {
    const [confirmationOpen, setConfirmationOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const formRef = useRef<HTMLFormElement>(null)

    const {
        getValues,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<PasswordSchema>({
        resolver: zodResolver(validationSchema),
    })

    const handlePostSubmit = async () => {
        setIsSubmitting(true)
        try {
            const values = getValues()
            console.log(values, 'values');
            await updateUserPassword({
                newPassword: values.newPassword,
                oldPassword: values.currentPassword,
            })
            reset({})
            toast.success('Пароль обновлен успешно')
        } catch (e) {
            toast.error(e.response.data.message as string)
        }
        setConfirmationOpen(false)
        setIsSubmitting(false)
    }

    const onSubmit = async () => {
        setConfirmationOpen(true)
    }

    return (
        <div>
            <div className="mb-8">
                <h4>Пароль</h4>
                <p>
                    Помните, что Ваш пароль — это доступ к твоему аккаунту. Храните его в безопасности!
                </p>
            </div>
            <Form
                ref={formRef}
                className="mb-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormItem
                    label="Текущий пароль"
                    invalid={Boolean(errors.currentPassword)}
                    errorMessage={errors.currentPassword?.message}
                >
                    <Controller
                        name="currentPassword"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                autoComplete="off"
                                placeholder="•••••••••"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Новый пароль"
                    invalid={Boolean(errors.newPassword)}
                    errorMessage={errors.newPassword?.message}
                >
                    <Controller
                        name="newPassword"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                autoComplete="off"
                                placeholder="•••••••••"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Подтверждение пароля"
                    invalid={Boolean(errors.confirmNewPassword)}
                    errorMessage={errors.confirmNewPassword?.message}
                >
                    <Controller
                        name="confirmNewPassword"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                autoComplete="off"
                                placeholder="•••••••••"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <div className="flex justify-start">
                    <Button variant="solid" type="submit">
                        Сохранить
                    </Button>
                </div>
            </Form>
            <ConfirmDialog
                isOpen={confirmationOpen}
                type="warning"
                title="Обновление пароля"
                confirmText="Подвердить"
                cancelText="Отменить"
                confirmButtonProps={{
                    loading: isSubmitting,
                    onClick: handlePostSubmit,
                }}
                onClose={() => setConfirmationOpen(false)}
                onRequestClose={() => setConfirmationOpen(false)}
                onCancel={() => setConfirmationOpen(false)}
            >
                <p>Подтверждаете смену пароля?</p>
            </ConfirmDialog>
            <ToastContainer/>
        </div>
    )
}

export default SettingsSecurity
