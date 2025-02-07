import { z, ZodType } from 'zod'
import { FormSchema } from '@/views/tasks/types/types'

export const validationSchema: ZodType = z.object({
    label: z.string().min(1,{message: 'Обязательное поле'} ),
    description: z.string().optional(),
    customQuestions: z.array(
        z.object(
            {
                label: z.string().min(1, 'Заполните название'),
                description: z.string().optional(),
                image: z.array(z.instanceof(File), {message: 'Загрузите изображение'}).nonempty('Загрузите изображение'),
                imageDescription: z.string().optional(),
            }
        )
    ),
    inputs: z.array(z.object({
        value: z.string().optional()
    })).optional(),
    visible: z.string().default('PUBLIC'),
})


export const defaultValues: FormSchema = {
    label: '',
    description: '',
    customQuestions: [
        {
            label: "",
            description: "",
            image: undefined,
            imageDescription: '',
        },
    ],
    inputs: [],
    visible: 'PUBLIC',
};
