// src/components/ui/Card/index.ts
import { Card } from './Card'

// Экспортируем тип CardProps из Card.ts
export type { CardProps } from './Card'

// Экспортируем компонент Card
export { Card }

// Экспортируем CardContent и другие компоненты из Card.ts
export {
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from './Card'

// Экспортируем компонент Card по умолчанию
export default Card
