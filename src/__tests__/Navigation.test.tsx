import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

test('navigates to product detail when product clicked', async ()=>{
  const user = userEvent.setup()
  render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>)

  // find product titles (may appear multiple times) and click the first one
  const prods = await screen.findAllByText(/Instagram 100 Takipçi/i)
  await user.click(prods[0])

  // expect to see product detail title
  const detail = await screen.findByText(/Instagram 100 Takipçi - Otomatik/i)
  expect(detail).toBeInTheDocument()
})
