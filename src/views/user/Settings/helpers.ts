// Функция для преобразования blob: URL в File
const convertBlobUrlToFile = async (blobUrl: string, fileName: string, fileType: string): Promise<File> => {
    try {
        // Шаг 1: Получаем Blob по URL
        const response = await fetch(blobUrl);
        const blob = await response.blob();

        // Шаг 2: Преобразуем Blob в File
        const file = new File([blob], fileName, { type: fileType });
        return file;
    } catch (error) {
        console.error('Ошибка при преобразовании blob: URL в File:', error);
        throw error;
    }
};

export { convertBlobUrlToFile };
