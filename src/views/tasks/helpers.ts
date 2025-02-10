import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


export async function urlToFile(url, fileName, mimeType?) {
    // 1. Загружаем изображение по URL
    const response = await fetch(url);
    // 2. Преобразуем ответ в Blob
    const blob = await response.blob();
    // 3. Создаем объект File из Blob
    return new File([blob], fileName);
}

export const usePageMetadata = (title: string, description: string) => {
    const location = useLocation();

    useEffect(() => {
        document.title = title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        }
    }, [title, description, location.pathname]);
};

export const shuffleArray = <T>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
}
