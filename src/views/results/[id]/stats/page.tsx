import { PollResults } from '@/views/tasks/components/PollStats/poll-results'

// Это обычно будет приходить с API
const mockPollData = {
    id: '123',
    status: {
        complete: true,
        totalResponses: 100,
        duration: '29 минут',
    },
    options: [
        {
            id: 'А',
            title: 'АктивДафф',
            votes: 19,
            reasons: [
                'Прозрачность операции',
                'Сообщение об одобрении очень радуют',
                'Наименее отталкивающая',
                'Понятно, о чем речь',
                'Четко и понятно сказано',
            ],
        },
        {
            id: 'Б',
            title: 'ХастлДафф',
            votes: 23,
            reasons: [
                'Смайлик мешочка с деньгами привлекает',
                'Больше подходит и сразу видно будет видно в уведомлениях какая сумма мне одобрена',
                'Стоит значок денег и уточнена сумма плюс есть слово выплата сразу все ясно',
            ],
        },
        {
            id: 'В',
            title: 'ДейлиДаффи',
            votes: 18,
            reasons: [
                'Цепляет взгляд. Смайлик и сумма сразу дают понять о чем речь',
                'Хорошо видно сумму',
                'Понятный интерфейс',
            ],
        },
        {
            id: 'Г',
            title: 'ДжимИзи',
            votes: 25,
            reasons: [
                'Привлекательный дизайн',
                'Четкая информация',
                'Хорошо структурировано',
            ],
        },
        {
            id: 'Д',
            title: 'ДжимДафф',
            votes: 15,
            reasons: [
                'Простой и понятный интерфейс',
                'Легко читается',
                'Минималистичный дизайн',
            ],
        },
    ],
}

export default function ResultsPage({ params }: { params: { id: string } }) {
    return (
        <div className="container max-w-5xl py-8">
            <PollResults data={mockPollData} />
        </div>
    )
}
