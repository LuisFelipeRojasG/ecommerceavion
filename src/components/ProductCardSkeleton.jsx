/**
 * Componente de esqueleto de carga para ProductCard
 * Se muestra mientras los productos se cargan desde la API
 * Mantiene la misma estructura visual que ProductCard para evitar layout shift
 */
function ProductCardSkeleton() {
  return (
    <article className='flex flex-col gap-4 w-60 p-4 border border-Gray'>
      {/* Imagen skeleton - misma dimensión que ProductCard */}
      <figure className='mb-4'>
        <div className='w-60 h-[200px] bg-gray-200 animate-pulse rounded' />
      </figure>
      
      {/* Contenido skeleton */}
      <div className='flex flex-col justify-between h-full gap-4'>
        {/* Título skeleton */}
        <div className='h-6 bg-gray-200 animate-pulse rounded w-48 mb-2' />
        
        {/* Precio y botón skeleton */}
        <div className='flex justify-between items-center'>
          <div className='h-6 bg-gray-200 animate-pulse rounded w-16' />
          <div className='h-8 bg-gray-200 animate-pulse rounded w-16' />
        </div>
      </div>
    </article>
  )
}

export default ProductCardSkeleton