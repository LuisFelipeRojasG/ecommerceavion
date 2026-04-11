import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import ProductCart from './ProductCart'
import { AvionProvider } from '../context/AvionContext'

const mockProductInCart = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  quantity: 2,
  total: 199.98,
  images: ['https://via.placeholder.com/240'],
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

describe('ProductCart', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders empty cart message when cart is empty', () => {
    renderWithContext(<ProductCart />)

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  it('renders cart title', () => {
    renderWithContext(<ProductCart />)

    expect(screen.getByText('Your shopping cart')).toBeInTheDocument()
  })

  it('renders subtotal as zero when cart is empty', () => {
    renderWithContext(<ProductCart />)

    expect(screen.getByText('$0.00')).toBeInTheDocument()
  })

  it('does not render checkout button when cart is empty', () => {
    renderWithContext(<ProductCart />)

    expect(screen.queryByText('Place your order')).not.toBeInTheDocument()
  })

  it('renders products when cart has items', () => {
    localStorage.setItem('cartProducts', JSON.stringify([mockProductInCart]))

    renderWithContext(<ProductCart />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$199.98')).toBeInTheDocument()
  })

  it('renders checkout button when cart has items', () => {
    localStorage.setItem('cartProducts', JSON.stringify([mockProductInCart]))

    renderWithContext(<ProductCart />)

    expect(screen.getByText('Place your order')).toBeInTheDocument()
  })

  it('calculates correct subtotal with multiple products', () => {
    const products = [
      { ...mockProductInCart, id: 1, total: 100 },
      { ...mockProductInCart, id: 2, price: 50, quantity: 2, total: 100 },
    ]
    localStorage.setItem('cartProducts', JSON.stringify(products))

    renderWithContext(<ProductCart />)

    expect(screen.getByText('$200.00')).toBeInTheDocument()
  })

  it('shows taxes and shipping message', () => {
    renderWithContext(<ProductCart />)

    expect(screen.getByText('Taxes and shipping are calculated at checkout')).toBeInTheDocument()
  })

  it('shows thank you message after checkout', async () => {
    localStorage.setItem('cartProducts', JSON.stringify([mockProductInCart]))

    renderWithContext(<ProductCart />)

    const checkoutButton = screen.getByText('Place your order')
    fireEvent.click(checkoutButton)

    await waitFor(() => {
      expect(screen.getByText('¡Thanks for your purchase!')).toBeInTheDocument()
      expect(screen.getByText('Your order has been processed successfully.')).toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('shows processing state during checkout', async () => {
    localStorage.setItem('cartProducts', JSON.stringify([mockProductInCart]))

    renderWithContext(<ProductCart />)

    const checkoutButton = screen.getByText('Place your order')
    fireEvent.click(checkoutButton)

    expect(screen.getByText('Processing...')).toBeInTheDocument()
  })

  it('shows return to homepage link after checkout', async () => {
    localStorage.setItem('cartProducts', JSON.stringify([mockProductInCart]))

    renderWithContext(<ProductCart />)

    const checkoutButton = screen.getByText('Place your order')
    fireEvent.click(checkoutButton)

    await waitFor(() => {
      expect(screen.getByText('Return to homepage')).toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('renders product images in cart', () => {
    localStorage.setItem('cartProducts', JSON.stringify([mockProductInCart]))

    renderWithContext(<ProductCart />)

    const image = screen.getByAltText('Test Product')
    expect(image).toBeInTheDocument()
  })
})
