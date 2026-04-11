import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import ProductCard from './ProductCard'
import { AvionProvider } from '../context/AvionContext'

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  rating: 4.5,
  images: ['https://via.placeholder.com/240'],
}

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  )
}

const renderWithContext = (ui) => {
  return render(
    <AvionProvider>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </AvionProvider>
  )
}

describe('ProductCard', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  it('renders product information correctly', () => {
    renderWithContext(<ProductCard data={mockProduct} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$ 99.99')).toBeInTheDocument()
    expect(screen.getByText('(4.5)')).toBeInTheDocument()
  })

  it('renders product image with correct alt text', () => {
    renderWithContext(<ProductCard data={mockProduct} />)

    const image = screen.getByAltText('Test Product')
    expect(image).toBeInTheDocument()
    expect(image.src).toBe('https://via.placeholder.com/240')
  })

  it('renders Details button', () => {
    renderWithContext(<ProductCard data={mockProduct} />)

    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  it('renders rating star icon', () => {
    renderWithContext(<ProductCard data={mockProduct} />)

    const starIcon = screen.getByLabelText('Rating: 4.5 out of 5')
    expect(starIcon).toBeInTheDocument()
  })

  it('handles product with different price formats', () => {
    const productWithDecimal = {
      ...mockProduct,
      price: 10.5,
    }

    renderWithContext(<ProductCard data={productWithDecimal} />)

    expect(screen.getByText('$ 10.5')).toBeInTheDocument()
  })

  it('handles product with integer price', () => {
    const productWithIntegerPrice = {
      ...mockProduct,
      price: 100,
    }

    renderWithContext(<ProductCard data={productWithIntegerPrice} />)

    expect(screen.getByText('$ 100')).toBeInTheDocument()
  })

  it('handles product with low rating', () => {
    const productWithLowRating = {
      ...mockProduct,
      rating: 1.2,
    }

    renderWithContext(<ProductCard data={productWithLowRating} />)

    expect(screen.getByText('(1.2)')).toBeInTheDocument()
  })

  it('handles product with perfect rating', () => {
    const productWithPerfectRating = {
      ...mockProduct,
      rating: 5,
    }

    renderWithContext(<ProductCard data={productWithPerfectRating} />)

    expect(screen.getByText('(5)')).toBeInTheDocument()
    expect(screen.getByLabelText('Rating: 5 out of 5')).toBeInTheDocument()
  })
})
