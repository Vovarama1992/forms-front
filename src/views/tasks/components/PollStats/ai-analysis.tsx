import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface AIAnalysisProps {
    AIReport: {
        taskId: string;
        bestCreative: string;
        reasoning: string;
        suggestions: string[];
        creatives: {
            id: string;
            analysis: {
                overall_score: number;
                strengths: string[];
                weaknesses: string[];
                recommendations: string[];
            };
            visual_analysis: {
                dominant_colors: string[];
                contrast_ratio: number;
                text_readability: string;
                object_focus: string;
                emotion_detected: string;
            };
            performance_prediction: {
                engagement_score: number;
                conversion_likelihood: number;
                expected_CTR: string;
            };
        }[];
    } | null;
}

export function AIAnalysis({ AIReport }: AIAnalysisProps) {
    if (!AIReport) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Отчет от AI менеджера</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Ждем полноценного репорта...</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Отчет от AI менеджера</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <p><strong>Лучший креатив:</strong> {AIReport.bestCreative}</p>
                <p><strong>Обоснование:</strong> {AIReport.reasoning}</p>
                <div>
                    <strong>Рекомендации:</strong>
                    <ul className="list-disc pl-5">
                        {AIReport.suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <strong>Анализ креативов:</strong>
                    {AIReport.creatives.map((creative) => (
                        <div key={creative.id} className="border p-3 rounded-md mt-4">
                            <p><strong>ID:</strong> {creative.id}</p>
                            <p><strong>Общий рейтинг:</strong> {creative.analysis.overall_score}</p>
                            <div>
                                <strong>Сильные стороны:</strong>
                                <ul className="list-disc pl-5">
                                    {creative.analysis.strengths.map((s, index) => (
                                        <li key={index}>{s}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <strong>Слабые стороны:</strong>
                                <ul className="list-disc pl-5">
                                    {creative.analysis.weaknesses.map((w, index) => (
                                        <li key={index}>{w}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <strong>Рекомендации:</strong>
                                <ul className="list-disc pl-5">
                                    {creative.analysis.recommendations.map((r, index) => (
                                        <li key={index}>{r}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}