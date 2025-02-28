import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface AIAnalysisProps {
    AIReport: string;
}

export function AIAnalysis({ AIReport }: AIAnalysisProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Отчет от AI менеджера</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {AIReport ? (
                    <p>{AIReport}</p>
                ) : (
                    <p>Ждем полноценного репорта...</p>
                )}
            </CardContent>
        </Card>
    );
}