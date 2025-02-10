import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


export async function urlToFile(url: string) {
    // Получаем изображение по URL
    const response = await fetch(url);
    // Преобразуем ответ в Blob
    const blob = await response.blob();

    // Извлекаем имя файла и расширение из URL
    const fileName = url.substring(url.lastIndexOf('/') + 1); // Получаем имя файла
    const fileExtension = fileName.split('.').pop(); // Получаем расширение файла

    // Определяем MIME-тип на основе расширения
    const mimeType = `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`;

    // Создаем объект File из Blob
    const file = new File([blob], fileName, { type: mimeType });
    return file;
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
