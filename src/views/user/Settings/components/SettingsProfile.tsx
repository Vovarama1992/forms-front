import { useMemo, useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Upload from '@/components/ui/Upload'
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import { Form, FormItem } from '@/components/ui/Form'
import NumericInput from '@/components/shared/NumericInput'
import { countryList } from '@/constants/countries.constant'
import { components } from 'react-select'
import type { ControlProps, OptionProps } from 'react-select'
import { getUserProfile, updateUserAvatar, updateUserProfile } from '@/services/AccontsService'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { HiOutlineUser } from 'react-icons/hi'
import { TbPlus } from 'react-icons/tb'
import type { ZodType } from 'zod'
import { TUserProfileInformation } from '../types'
import { ToastContainer, toast } from 'react-toastify'
import { useSessionUser } from '@/store/authStore'

type ProfileSchema = {
    firstName?: string
    lastName?: string
    email?: string
    dialCode?: string
    phone: string
    avatarUrl: string
}

type CountryOption = {
    label: string
    dialCode: string
    value: string
}

const { Control } = components

const validationSchema: ZodType<TUserProfileInformation> = z.object({
    firstName: z.string().nullable().optional(), // firstName может быть string или null, и это поле необязательное
    lastName: z.string().nullable().optional(),  // lastName может быть string или null, и это поле необязательное
    email: z
        .string()
        .min(1, { message: 'Email required' })
        .email({ message: 'Invalid email' }), // email обязательный и должен быть валидным
    phone: z.string().nullable().optional(), // phone может быть string или null, и это поле необязательное
    // Остальные поля из Root, если они нужны для валидации
    dialCode: z.string().optional(),
    avatarUrl: z.string().nullable().optional(), // avatarUrl может быть string или null, и это поле необязательное
}).refine(
    (data) => {
        // Если выбран dialCode, то phone должен быть заполнен
        if (data.dialCode && data.dialCode.trim() !== "" && !data.phone) {
            return false;
        }
        return true;
    },
    {
        message: 'Телефон обязателен, если выбран код страны', // Сообщение об ошибке
        path: ['phone'], // Указываем, что ошибка связана с полем phone
    }
);


const CustomSelectOption = (
    props: OptionProps<CountryOption> & { variant: 'country' | 'phone' },
) => {
    return (
        <DefaultOption<CountryOption>
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">
                    <Avatar
                        shape="circle"
                        size={20}
                        src={`/img/countries/${data.value}.png`}
                    />
                    {props.variant === 'country' && <span>{label}</span>}
                    {props.variant === 'phone' && <span>{data.dialCode}</span>}
                </span>
            )}
        />
    )
}

const CustomControl = ({ children, ...props }: ControlProps<CountryOption>) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={20}
                    src={`/img/countries/${selected.value}.png`}
                />
            )}
            {children}
        </Control>
    )
}

const SettingsProfile = () => {

    const [avatar, setAvatar] = useState<File>();
    const user = useSessionUser((state) => state.user)

    const dialCodeList = useMemo(() => {
        const newCountryList: Array<CountryOption> = JSON.parse(
            JSON.stringify(countryList),
        )

        return newCountryList.map((country) => {
            country.label = country.dialCode
            return country
        })
    }, [])

    const beforeUpload = (files: FileList | null) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png']
        if (files) {
            for (const file of files) {
                if (!allowedFileType.includes(file.type)) {
                    valid = 'Пожалуйста загрузите .jpeg or .png file!'
                }
            }
        }

        return valid
    }

    const {
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        control,
    } = useForm<TUserProfileInformation>({
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = async (values: ProfileSchema) => {
        try {
            const formData = new FormData();
            formData.append('file', avatar || null)
            await updateUserAvatar(user.id as number, formData);
            await updateUserProfile({
                firstName: values.firstName || '',
                lastName: values.lastName || '',
                phone: values.phone,
            })
            toast.success('Данные успешно обновлены');
            console.log(values);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userData = await getUserProfile();
                reset({
                    phone: userData.phone,
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    avatarUrl: userData.avatarUrl,
                });
            } catch(e) {
                console.error(e);
                toast.error(e?.message as string);
            }
        }
        fetchUserData();
    }, [])

    return (
        <>
            <h4 className="mb-8">Персональная информация</h4>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8">
                    <Controller
                        name="avatarUrl"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center gap-4">
                                <Avatar
                                    size={90}
                                    className="border-4 border-white bg-gray-100 text-gray-300 shadow-lg"
                                    icon={<HiOutlineUser />}
                                    src={field.value as string}
                                />
                                <div className="flex items-center gap-2">
                                    <Upload
                                        showList={false}
                                        uploadLimit={1}
                                        beforeUpload={beforeUpload}
                                        onChange={(files) => {
                                            if (files.length > 0) {
                                                field.onChange(
                                                    URL.createObjectURL(
                                                        files[0],
                                                    ),
                                                    setAvatar(files[0])
                                                )
                                            }
                                        }}
                                    >
                                        <Button
                                            variant="solid"
                                            size="sm"
                                            type="button"
                                            icon={<TbPlus />}
                                        >
                                           Загрузить
                                        </Button>
                                    </Upload>
                                    <Button
                                        size="sm"
                                        type="button"
                                        onClick={() => {
                                            field.onChange('')
                                        }}
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            </div>
                        )}
                    />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem
                        label="Имя"
                        invalid={Boolean(errors.firstName)}
                        errorMessage={errors.firstName?.message}
                    >
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Введите имя"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Фамилия"
                        invalid={Boolean(errors.lastName)}
                        errorMessage={errors.lastName?.message}
                    >
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Введите фамилию"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                </div>
                <div className="flex items-end gap-4 w-full mt-4">
                    {/*<FormItem*/}
                    {/*    invalid={*/}
                    {/*        Boolean(errors.phone)*/}
                    {/*    }*/}
                    {/*>*/}
                    {/*    <label className="form-label mb-2">Номер телефона</label>*/}
                    {/*    <Controller*/}
                    {/*        name="dialCode"*/}
                    {/*        control={control}*/}
                    {/*        render={({ field }) => (*/}
                    {/*            <Select<CountryOption>*/}
                    {/*                options={dialCodeList}*/}
                    {/*                {...field}*/}
                    {/*                className="w-[150px]"*/}
                    {/*                components={{*/}
                    {/*                    Option: (props) => (*/}
                    {/*                        <CustomSelectOption*/}
                    {/*                            variant="phone"*/}
                    {/*                            {...(props as OptionProps<CountryOption>)}*/}
                    {/*                        />*/}
                    {/*                    ),*/}
                    {/*                    Control: CustomControl,*/}
                    {/*                }}*/}
                    {/*                placeholder=""*/}
                    {/*                value={dialCodeList.filter(*/}
                    {/*                    (option) =>*/}
                    {/*                        option.dialCode === field.value,*/}
                    {/*                )}*/}
                    {/*                onChange={(option) =>*/}
                    {/*                    field.onChange(option?.dialCode)*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*        )}*/}
                    {/*    />*/}
                    {/*</FormItem>*/}
                    <FormItem
                        label="Номер телефона"
                        className="w-full"
                        invalid={
                            Boolean(errors.phone) ||
                            Boolean(errors.dialCode)
                        }
                        errorMessage={errors.phone?.message}
                    >
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <NumericInput
                                    autoComplete="off"
                                    placeholder="Введите телефон"
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                    </FormItem>
                </div>
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
                                readOnly={true}
                                type="email"
                                autoComplete="off"
                                placeholder="Введите Email"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <div className="flex justify-start">
                    <Button
                        variant="solid"
                        type="submit"
                        loading={isSubmitting}
                    >
                        Сохранить
                    </Button>
                </div>
            </Form>
            <ToastContainer/>
        </>
    )
}

export default SettingsProfile
