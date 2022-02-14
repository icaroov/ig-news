import { render } from '@testing-library/react'

import Header from '.'

jest.mock('next/router', () => {
  return {
    useRouter: () => ({
      asPath: '/',
    }),
  }
})

jest.mock('next-auth/client', () => {
  return {
    useSession: () => ([null, false]),
  }
})

describe('Header Component', () => {
  it('Should render Header correctly', () => {
    const { container, getByText } = render(<Header />)

    expect(getByText('Home')).toBeInTheDocument()
    expect(getByText('Posts')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
