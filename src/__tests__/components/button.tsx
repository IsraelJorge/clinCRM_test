import { render, screen } from '@testing-library/react'

import { Button } from '@/components/ui/button'

describe('<button />', () => {
  it('should render button', () => {
    render(<Button>Olá</Button>)

    expect(screen.getByText('Olá')).toBeInTheDocument()
  })
})
