import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Listing from '../pages/Listing'

describe('Listing filters', ()=>{
  test('filter by tag Fırsat shows matching products', async ()=>{
  render(<MemoryRouter><Listing /></MemoryRouter>)
    const user = userEvent.setup()

    // Click the 'Fırsat' tag button in the filter panel
    const firsatBtn = screen.getAllByText('Fırsat')[0]
    await user.click(firsatBtn)

    // Click the 'Uygula' button
    const uygula = screen.getAllByText('Uygula')[0]
    await user.click(uygula)

    // Expect to find a product that has 'Fırsat' tag
    const product = await screen.findByText(/TikTok 1000 İzlenme|Instagram 2000 Beğeni/i)
    expect(product).toBeInTheDocument()
  })
})
