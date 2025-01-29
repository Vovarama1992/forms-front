export type FormSchema = {
    label: string // Обязательное поле, строка
    description?: '',
    customQuestions: {
        imageDescription?: string // Обязательное поле, строка
        image?: File[]// Опциональное поле, может быть файлом или undefined
        label: string // Обязательное поле, строка
        description: string // Обязательное поле, строка
    }[]
    inputs: { value: string }[] // Массив неизвестных элементов (можно уточнить тип, если известна структура)
    visible: string
}
