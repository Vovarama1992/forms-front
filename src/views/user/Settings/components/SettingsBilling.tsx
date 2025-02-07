import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import BillingHistory from './BillingHistory'
import { apiGetSettingsBilling } from '@/services/AccontsService'
import useSWR from 'swr'
import { PiLightningFill } from 'react-icons/pi'
import { NumericFormat } from 'react-number-format'
import type {
    GetSettingsBillingResponse,
} from '../types'
import { z, ZodType } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { Form, FormItem, Input } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'

type FormSchema = {
    amount: string
}

const validationSchema: ZodType<FormSchema> = z.object({
    amount: z.string().min(1, {message: 'Обязательное поле'})
})

const SettingsBilling = () => {

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<FormSchema>({
        defaultValues: {
            amount: '',
        },
        resolver: zodResolver(validationSchema),
    });

    const onSubmit = (values: FormSchema) => {
        window.alert(JSON.stringify(values))
    }

    const {
        data = {
            currentPlan: {
                plan: '',
                status: '',
                billingCycle: '',
                nextPaymentDate: null,
                amount: null,
            },
            paymentMethods: [],
            transactionHistory: [],
        },
    } = useSWR(
        '/api/settings/billing/',
        () => apiGetSettingsBilling<GetSettingsBillingResponse>(),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )

    return (
        <div>
            <h4 className="mb-4">Платежи</h4>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div>
                            <Avatar
                                className="bg-emerald-500"
                                shape="circle"
                                icon={<PiLightningFill />}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h6 className="font-bold">
                                    Текущий баланс:  <NumericFormat
                                    className="font-bold heading-text"
                                    displayType="text"
                                    value={(
                                        Math.round(
                                            (data.currentPlan.amount || 0) *
                                            100,
                                        ) / 100
                                    ).toFixed(2)}
                                    prefix={'₽'}
                                    thousandSeparator={true}
                                />
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 w-1/3">
                <h5>Пополнение баланса</h5>
                <div className="font-semibold mt-3">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormItem
                            label="Сумма пополнения"
                            invalid={Boolean(errors.amount)}
                            errorMessage={errors.amount?.message}
                        >
                            <Controller
                                name="amount"
                                control={control}
                                render={({ field }) =>
                                    <Input
                                        type="number"
                                        autoComplete="off"
                                        placeholder="Введите сумму"
                                        {...field}
                                    />
                                }
                            />
                        </FormItem>
                        <Button variant="solid"> Пополнить </Button>
                    </Form>
                </div>
            </div>
            <div className="mt-8">
                <h5>История транзакций</h5>
                <BillingHistory
                    className="mt-4"
                    data={data.transactionHistory}
                />
            </div>
        </div>
    )
}

export default SettingsBilling
