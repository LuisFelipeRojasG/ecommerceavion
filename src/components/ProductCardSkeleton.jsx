import { memo } from 'react'

/**
 * Componente de esqueleto de carga para ProductCard memoizado
 * Se muestra mientras los productos se cargan desde la API
 * Mantiene la misma estructura visual que ProductCard para evitar layout shift
 */
const ProductCardSkeleton = memo(function ProductCardSkeleton() {
  return (
    <article className='flex flex-col gap-4 w-60 h-[480px] p-4 border border-Gray'>
      {/* Imagen skeleton - misma dimensión que ProductCard */}
      <figure className='mb-4'>
        <div className='w-52 h-product-image bg-gray-200 animate-pulse rounded' />
      </figure>
      
      {/* Contenido skeleton */}
      <div className='flex flex-col justify-between h-auto gap-4'>
        {/* Título skeleton */}
        <div className='h-6 bg-gray-200 animate-pulse rounded w-48 mb-2' />
        
        {/* Rating skeleton */}
        <div className='h-4 bg-gray-200 animate-pulse rounded w-12' />
        
        {/* Precio y botón skeleton */}
        <div className='flex justify-between items-center'>
          <div className='h-6 bg-gray-200 animate-pulse rounded w-16' />
          <div className='h-8 bg-gray-200 animate-pulse rounded w-16' />
        </div>
      </div>
    </article>
  )
})

export default ProductCardSkeleton