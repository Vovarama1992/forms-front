import { z, ZodType } from 'zod'
import { FormSchema } from '@/views/tasks/types/types'

export const validationSchema: ZodType = z.object({
    label: z.string().min(1,{message: 'Обязательное поле'} ),
    description: z.string().optional(),
    images: z.array(
        z.object(
            {
                imageDescription: z.string().optional(),
                image: z.array(z.instanceof(File), {message: 'Загрузите изображение'}).nonempty('Загрузите изображение'),
            }
        )
    ),
    customQuestions: z.array(
        z.object(
            {
                label: z.string().min(1, 'Заполните название'),
                description: z.string().min(1, 'Заполните описание').optional(),
            }
        )
    ),
    inputs: z.array(z.object({
        value: z.string().optional()
    })),
})


export const defaultValues: FormSchema = {
    label: '',
    description: '',
    images: [
        {
            imageDescription: '',
            image: undefined,
        },
    ],
    customQuestions: [
        {
            label: "",
            description: "",
        },
    ],
    inputs: [{
        value: ''
    }],
};
