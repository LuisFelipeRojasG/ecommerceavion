import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { AvionProvider } from './AvionContext'
import useAvionContext from './UseContext'

const mockProducts = [
  { id: 1, title: 'Product 1', price: 10, category: 'beauty' },
  { id: 2, title: 'Product 2', price: 20, category: 'furniture' },
  { id: 3, title: 'Product 3', price: 50, category: 'beauty' },
]

const mockCategories = [
  { slug: 'beauty', name: 'Beauty' },
  { slug: 'furniture', name: 'Furniture' },
]

const TestComponent = () => {
  const {
    dataProducts,
    dataCategories,
    isLoading,
    error,
    getAllProducts,
    getAllCategories,
    addToCart,
    cartProducts,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  } = useAvionContext()

  return (
    <div>
      <div data-testid="loading">{isLoading.toString()}</div>
      <div data-testid="error">{error || 'no-error'}</div>
      <div data-testid="products-count">{dataProducts.length}</div>
      <div data-testid="categories-count">{dataCategories.length}</div>
      <div data-testid="cart-count">{cartProducts.length}</div>
      <button data-testid="get-products" onClick={() => getAllProducts('https://dummyjson.com/products?limit=0')}>
        Get Products
      </button>
      <button data-testid="get-categories" onClick={() => getAllCategories('https://dummyjson.com/products/categories')}>
        Get Categories
      </button>
      <button data-testid="add-to-cart" onClick={() => addToCart(mockProducts[0], 1)}>
        Add to Cart
      </button>
      <button data-testid="remove-from-cart" onClick={() => removeFromCart(1)}>
        Remove from Cart
      </button>
      <button data-testid="clear-cart" onClick={() => clearCart()}>
        Clear Cart
      </button>
      <button data-testid="get-cart-total" onClick={() => getCartTotal()}>
        Get Cart Total
      </button>
      <button data-testid="get-cart-count" onClick={() => getCartItemsCount()}>
        Get Cart Count
      </button>
    </div>
  )
}

describe('AvionContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.stubGlobal('fetch', vi.fn())
  })

  it('provides initial state', () => {
    render(
      <AvionProvider>
        <TestComponent />
      </AvionProvider>
    )

    expect(screen.getByTestId('loading').textContent).toBe('false')
    expect(screen.getByTestId('error').textContent).toBe('no-error')
    expect(screen.getByTestId('products-count').textContent).toBe('0')
    expect(screen.getByTestId('categories-count').textContent).toBe('0')
    expect(screen.getByTestId('cart-count').textContent).toBe('0')
  })

  it('fetches products from API and updates state', async () => {
    const mockResponse = {
      products: mockProducts,
      total: 3,
      skip: 0,
      limit: 30,
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    render(
      <AvionProvider>
        <TestComponent />
      </AvionProvider>
    )

    const getProductsBtn = screen.getByTestId('get-products')
    getProductsBtn.click()

    await waitFor(() => {
      expect(screen.getByTestId('products-count').textContent).toBe('3')
    })
  })

  it('fetches categories from API and updates state', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCategories,
    })

    render(
      <AvionProvider>
        <TestComponent />
      </AvionProvider>
    )

    const getCategoriesBtn = screen.getByTestId('get-categories')
    getCategoriesBtn.click()

    await waitFor(() => {
      expect(screen.getByTestId('categories-count').textContent).toBe('2')
    })
  })

  it('adds product to cart', async () => {
    render(
      <AvionProvider>
        <TestComponent />
      </AvionProvider>
    )

    const addToCartBtn = screen.getByTestId('add-to-cart')
    addToCartBtn.click()

    await waitFor(() => {
      expect(screen.getByTestId('cart-count').textContent).toBe('1')
    })

    const savedCart = localStorage.getItem('cartProducts')
    expect(savedCart).toBeTruthy()
    expect(JSON.parse(savedCart).length).toBe(1)
  })

  it('removes product from cart', async () => {
    localStorage.setItem('cartProducts', JSON.stringify([{ ...mockProducts[0], quantity: 1, total: 10 }]))

    render(
      <AvionProvider>
        <TestComponent />
      </AvionProvider>
    )

    expect(screen.getByTestId('cart-count').textContent).toBe('1')

    const removeBtn = screen.getByTestId('remove-from-cart')
    removeBtn.click()

    await waitFor(() => {
      expect(screen.getByTestId('cart-count').textContent).toBe('0')
    })
  })

  it('clears cart', async () => {
    localStorage.setItem('cartProducts', JSON.stringify([
      { ...mockProducts[0], quantity: 1, total: 10 },
      { ...mockProducts[1], quantity: 2, total: 40 },
    ]))

    render(
      <AvionProvider>
        <TestComponent />
      </AvionProvider>
    )

    expect(screen.getByTestId('cart-count').textContent).toBe('2')

    const clearBtn = screen.getByTestId('clear-cart')
    clearBtn.click()

    await waitFor(() => {
      expect(screen.getByTestId('cart-count').textContent).toBe('0')
    })

    expect(localStorage.getItem('cartProducts')).toBeNull()
  })

  it('calculates cart total correctly', async () => {
    localStorage.setItem('cartProducts', JSON.stringify([
      { ...mockProducts[0], quantity: 2, total: 20 },
      { ...mockProducts[1], quantity: 1, total: 20 },
    ]))

    render(
      <AvionProvider>
        <TestComponent />
      </AvionProvider>
    )

    const getTotalBtn = screen.getByTestId('get-cart-total')
    const total = getTotalBtn.click()

    await waitFor(() => {
      expect(screen.getByTestId('cart-count').textContent).toBe('2')
    })
  })

  it('calculates cart items count correctly', async () => {
    localStorage.setItem('cartProducts', JSON.stringify([
      { ...mockProducts[0], quantity: 3, total: 30 },
      { ...mockProducts[1], quantity: 2, total: 40 },
    ]))

    render(
      <AvionProvider>
        <TestComponent />
      </AvionProvider>
    )

    const getCountBtn = screen.getByTestId('get-cart-count')
    getCountBtn.click()

    await waitFor(() => {
      expect(screen.getByTestId('cart-count').textContent).toBe('2')
    })
  })

  it('handles API error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))

    render(
      <AvionProvider>
        <TestComponent />
      </AvionProvider>
    )

    const getProductsBtn = screen.getByTestId('get-products')
    getProductsBtn.click()

    await waitFor(() => {
      expect(screen.getByTestId('error').textContent).toBe('Failed to load products. Please try again.')
    })
  })
})
