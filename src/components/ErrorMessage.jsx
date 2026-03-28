/**
 * Componente reutilizable para mostrar mensajes de error
 * Se muestra cuando hay errores en las llamadas a la API
 * @param {string} message - Mensaje de error a mostrar
 * @param {Function} onRetry - Función opcional para reintentar la acción
 */
function ErrorMessage({ message = 'Something went wrong. Please try again.', onRetry }) {
    return (
        <div className='flex flex-col items-center justify-center py-20 px-4' role='alert'>
            <div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center'>
                <p className='text-red-600 text-Headline_four mb-4'>{message}</p>
                {onRetry && (
                    <button 
                        onClick={onRetry}
                        className='bg-Dark text-Light px-6 py-2 rounded hover:bg-Primary transition-colors'
                    >
                        Try Again
                    </button>
                )}
            </div>
        </div>
    )
}

export default ErrorMessage