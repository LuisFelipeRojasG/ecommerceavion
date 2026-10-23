import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import All from './All'
import { AvionProvider } from '../../context/AvionContext'

const renderWithContext = (ui) => {
  return render(
    <AvionProvider>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </AvionProvider>
  )
}

describe('All page', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ products: [] })
    }))
  })

  it('renders product header', () => {
    renderWithContext(<All />)

    expect(screen.getByAltText('All Products Header')).toBeInTheDocument()
  })

  it('renders filter sidebar sections', () => {
    renderWithContext(<All />)

    expect(screen.getAllByText('Categories').length).toBeGreaterThan(0)
    expect(screen.getByText('Filter Price')).toBeInTheDocument()
    expect(screen.getByText('Sort By')).toBeInTheDocument()
  })

  it('renders sort options', () => {
    renderWithContext(<All />)

    expect(screen.getByText('Name (A - Z)')).toBeInTheDocument()
    expect(screen.getByText('Name (Z - A)')).toBeInTheDocument()
    expect(screen.getByText('Price (Low to High)')).toBeInTheDocument()
    expect(screen.getByText('Price (High to Low)')).toBeInTheDocument()
  })

  it('renders price range options', () => {
    renderWithContext(<All />)

    expect(screen.getAllByText('$ < 10').length).toBeGreaterThan(0)
    expect(screen.getAllByText('$ 10 - 20').length).toBeGreaterThan(0)
    expect(screen.getAllByText('$ 20 - 50').length).toBeGreaterThan(0)
    expect(screen.getAllByText('$ 50 - 100').length).toBeGreaterThan(0)
    expect(screen.getAllByText('$ > 100').length).toBeGreaterThan(0)
  })

  it('renders clear all filters button', () => {
    renderWithContext(<All />)

    expect(screen.getByText('Clear All Filters')).toBeInTheDocument()
  })

  it('renders default sort option', () => {
    renderWithContext(<All />)

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(screen.getByText('Default')).toBeInTheDocument()
  })

  it('displays no products message when data is empty', async () => {
    renderWithContext(<All />)

    expect(await screen.findByText('No products available at the moment')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your filters or check back later')).toBeInTheDocument()
  })
})
