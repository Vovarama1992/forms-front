import { useState } from 'react';

// Тип для уведомления
type Notification = {
    id: number;
    message: string;
    type: 'info' | 'success' | 'error';
};

// Тип для возвращаемого значения хука
type UseNotificationsReturn = {
    notifications: Notification[];
    addNotification: (message: string, type?: Notification['type'], duration?: number) => void;
    removeNotification: (id: number) => void;
    clearNotifications: () => void;
};

const useNotifications = (): UseNotificationsReturn => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // Добавление уведомления
    const addNotification = (
        message: string,
        type: Notification['type'] = 'info',
        duration: number = 5000,
    ) => {
        const id = Date.now(); // Уникальный ID для уведомления
        const newNotification: Notification = { id, message, type };

        setNotifications((prev) => [...prev, newNotification]);

        // Автоматическое удаление уведомления через указанное время
        if (duration) {
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        }
    };

    // Удаление уведомления по ID
    const removeNotification = (id: number) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    // Очистка всех уведомлений
    const clearNotifications = () => {
        setNotifications([]);
    };

    return {
        notifications,
        addNotification,
        removeNotification,
        clearNotifications,
    };
};

export default useNotifications;
