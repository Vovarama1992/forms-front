import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Trophy } from 'lucide-react';
import React from 'react';

interface FeedbackSectionProps {
    options: Array<{
        id: string;
        title: string;
        votes: number;
        reasons: string[];
        isWinner: boolean;
    }>;
}

// Define CardProps (assuming you have a Card component)
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    bodyClass?: string;
    // Add other props as needed based on your original Card component
    bordered?: boolean;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    clickable?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

// You might need to adjust this forwardRef if you don't actually need it
const CustomCard = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const {
        bodyClass,
        children,
        className,
        clickable = false,
        bordered = true, // Default to bordered if not provided
        header,
        footer,
        onClick,
        ...rest
    } = props;

    return (
        <div
            ref={ref}
            className={`rounded-lg border bg-card text-card-foreground shadow-sm ${
                bordered ? 'border' : ''
            } ${className}`} // Added basic styling
            onClick={onClick}
            {...rest}
        >
            {header && <div className="p-6">{header}</div>}
            <div className={`p-6 pt-0 ${bodyClass}`}>{children}</div>
            {footer && <div className="p-6">{footer}</div>}
        </div>
    );
});
CustomCard.displayName = 'CustomCard';



export function FeedbackSection({ options }: FeedbackSectionProps) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Отзывы и причины выбора</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {options.map((option) => (
                        <CustomCard key={option.id}>
                            <div className="p-4 flex flex-col gap-4">
                                <div>
                                    <div className="w-full mb-2">
                                        Название опции: {option.title}
                                    </div>
                                    <span className="text-sm text-muted-foreground mb-2">
                                        Кол-во голосов:
                                      ({option.votes}{' '}
                                        {option.votes === 1
                                            ? 'голос'
                                            : option.votes < 5
                                                ? 'голоса'
                                                : 'голосов'}
                                        )
                                    </span>
                                        {option.isWinner && (
                                            <div className="flex h-8 w-full mt-2">
                                                <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                                  <Trophy className="h-3 w-3" />
                                                  Победитель
                                                </span>
                                            </div>
                                        )}
                                </div>
                                {option.reasons.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold">Причины:</h3>
                                        <ul className="mt-2 flex flex-col gap-2 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                            {option.reasons.map((reason, reasonIndex) => (
                                                <li
                                                    key={reasonIndex}
                                                    className="text-sm leading-relaxed text-muted-foreground"
                                                >
                                                    {reason}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </CustomCard>
                    ))}
                </div>
            </CardContent>

        </Card>
    );
}