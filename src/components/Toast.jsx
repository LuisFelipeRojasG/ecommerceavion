import { useState, useEffect } from 'react'

/**
 * Componente Toast flotante para mostrar notificaciones temporales
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de toast ('success' | 'error' | 'info')
 * @param {Function} onClose - Función para cerrar el toast
 * @param {number} duration - Duración en ms (default: 3000)
 */
function Toast({ message, type = 'success', onClose, duration = 3000 }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    const bgColors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500'
    }

    return (
        <div 
            className={`fixed bottom-4 right-4 ${bgColors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up`}
            role='alert'
            aria-live='polite'
        >
            <div className='flex items-center gap-2'>
                <span>{message}</span>
                <button 
                    onClick={onClose}
                    className='ml-2 text-white hover:text-gray-200 font-bold'
                    aria-label='Close notification'
                >
                    ×
                </button>
            </div>
        </div>
    )
}

/**
 * Hook personalizado para gestionar toasts en la aplicación
 * Proporciona funciones para mostrar diferentes tipos de notificaciones
 */
export function useToast() {
    const [toast, setToast] = useState(null)

    const showToast = (message, type = 'success') => {
        setToast({ message, type })
    }

    const hideToast = () => {
        setToast(null)
    }

    return { toast, showToast, hideToast }
}

export default Toast