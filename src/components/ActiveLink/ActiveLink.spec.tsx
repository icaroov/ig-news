import { render, screen } from '@testing-library/react'

import ActiveLink from '.'

jest.mock('next/router', () => {
  return {
    useRouter: () => ({
      asPath: '/',
    }),
  }
})

describe('ActiveLink Component', () => {
  it('Should render ActiveLink correctly', () => {
    render(<ActiveLink href="/" activeClassName='active'><a>Home</a></ActiveLink>)

    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('Should receive "active" class', () => {
    render(<ActiveLink href="/" activeClassName='active'><a>Home</a></ActiveLink>)

    expect(screen.getByText('Home')).toHaveClass('active')
  })
})