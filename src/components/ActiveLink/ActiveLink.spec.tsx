import { render } from '@testing-library/react'

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
    const { getByText } = render(<ActiveLink href="/" activeClassName='active'><a>Home</a></ActiveLink>)

    expect(getByText('Home')).toBeInTheDocument()
  })

  it('Should receive "active" class', () => {
    const { getByText } = render(<ActiveLink href="/" activeClassName='active'><a>Home</a></ActiveLink>)

    expect(getByText('Home')).toHaveClass('active')
  })
})