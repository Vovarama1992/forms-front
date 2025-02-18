import * as React from 'react'
import classNames from 'classnames'
import { useConfig } from '../ConfigProvider'
import { cn } from '@/lib/utils' // Используем cn для объединения классов
import type { CommonProps } from '../@types/common'
import type { ReactNode, ComponentPropsWithRef, MouseEvent, Ref } from 'react'

// Типы для заголовка и подвала карточки
type CardHeader = {
    content?: string | ReactNode
    className?: string
    bordered?: boolean
    extra?: string | ReactNode
}

type CardFooter = {
    content?: string | ReactNode
    className?: string
    bordered?: boolean
}

// Интерфейс для пропсов карточки
export interface CardProps
    extends CommonProps,
        Omit<ComponentPropsWithRef<'div'>, 'onClick'> {
    clickable?: boolean
    header?: CardHeader
    bodyClass?: string
    footer?: CardFooter
    bordered?: boolean
    ref?: Ref<HTMLDivElement>
    onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

// Компонент Card
const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const { ui } = useConfig()

    const {
        bodyClass,
        children,
        className,
        clickable = false,
        bordered = ui?.card?.cardBordered ?? true,
        header = {},
        footer = {},
        onClick,
        ...rest
    } = props

    const headerProps = {
        bordered: true,
        ...header,
    }

    const footerProps = {
        bordered: true,
        ...footer,
    }

    const cardClass = classNames(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className,
        bordered ? 'card-border' : 'card-shadow',
        clickable && 'cursor-pointer user-select-none',
    )

    const cardBodyClass = classNames('card-body', bodyClass)

    const renderHeader = () => {
        if (typeof headerProps.content === 'string') {
            return <h4>{headerProps.content}</h4>
        }
        return <>{headerProps.content}</>
    }

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        onClick?.(e)
    }

    return (
        <div
            ref={ref}
            className={cardClass}
            role="presentation"
            onClick={handleClick}
            {...rest}
        >
            {headerProps.content && (
                <div
                    className={classNames('card-header', headerProps.className)}
                >
                    {renderHeader()}
                    {headerProps.extra && <span>{headerProps.extra}</span>}
                </div>
            )}
            <div className={cardBodyClass}>{children}</div>
            {footerProps.content && (
                <div
                    className={classNames('card-footer', footerProps.className)}
                >
                    {footerProps.content}
                </div>
            )}
        </div>
    )
})
Card.displayName = 'Card'

// Компонент CardHeader
const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...props}
    />
))
CardHeader.displayName = 'CardHeader'

// Компонент CardTitle
const CardTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'text-2xl font-semibold leading-none tracking-tight',
            className,
        )}
        {...props}
    />
))
CardTitle.displayName = 'CardTitle'

// Компонент CardDescription
const CardDescription = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
    />
))
CardDescription.displayName = 'CardDescription'

// Компонент CardContent
const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

// Компонент CardFooter
const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex items-center p-6 pt-0', className)}
        {...props}
    />
))
CardFooter.displayName = 'CardFooter'

// Экспортируем все компоненты карточки
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
