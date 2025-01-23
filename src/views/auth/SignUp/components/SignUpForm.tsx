import { useMemo, useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import { FormItem, Form } from '@/components/ui/Form'
import { useAuth } from '@/auth'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    setMessage?: (message: string) => void
}

type SignUpFormSchema = {
    password: string
    email: string
    confirmPassword: string
}

const validationSchema: ZodType<SignUpFormSchema> = z
    .object({
        email: z.string({ required_error: 'Please enter your email' }),
        password: z.string({ required_error: 'Password Required' }),
        confirmPassword: z.string({
            required_error: 'Confirm Password Required',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords not match',
        path: ['confirmPassword'],
    })

const rolesList = [
    { label: 'Частное лицо', value: 'PRIVATE_PERSON', },
    { label: 'Индивидуальный предприниматель', value: 'INDIVIDUAL_ENTREPRENEUR', },
    { label: 'Работник компании', value: 'COMPANY_EMPLOYEE', }
]

const SignUpForm = (props: SignUpFormProps) => {
    const { disableSubmit = false, className, setMessage } = props

    const [isSubmitting, setSubmitting] = useState<boolean>(false)

    const [selectedRole, setSelectedRole] = useState<string>('PRIVATE_PERSON');

    const { signUp } = useAuth()

    const handleRoleChange = (value?: string) => {
        if (value) {
            setSelectedRole(value);
            console.log('Selected role:', value);
        }
    };

    const roleOption = useMemo(
            () =>
                rolesList.map((role) => ({
                    value: role.value,
                    label: role.label,
                })),
            [rolesList],
        )

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<SignUpFormSchema>({
        resolver: zodResolver(validationSchema),
    })

    const onSignUp = async (values: SignUpFormSchema) => {
        const { email, password } = values
        const role = selectedRole

        if (!disableSubmit) {
            setSubmitting(true)
            const result = await signUp({ password, email, role })

            if (result?.status === 'failed') {
                setMessage?.(result.message)
            }

            setSubmitting(false)
        }
    }

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(onSignUp)}>
                <FormItem
                    label="Email"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                placeholder="Email"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Password"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                autoComplete="off"
                                placeholder="Password"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Confirm Password"
                    invalid={Boolean(errors.confirmPassword)}
                    errorMessage={errors.confirmPassword?.message}
                >
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                autoComplete="off"
                                placeholder="Confirm Password"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Role"
                >
                <Select
                    size="sm"
                    menuPlacement="top"
                    isSearchable={false}
                    value={
                        roleOption.find(
                            option => option.value === selectedRole
                        )
                    }
                    options={roleOption}
                    onChange={(option) => handleRoleChange(option?.value)}
                    
                />
                </FormItem>
                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </Button>
            </Form>
        </div>
    )
}

export default SignUpForm
