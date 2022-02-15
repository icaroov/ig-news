import { render } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { mocked } from 'jest-mock'

import SignInButton from '.'

jest.mock('next-auth/client')
const useSessionMocked = mocked(useSession)

describe('SignInButton Component', () => {
  it('Should render SignInButton correctly when user is not logged', () => {

    useSessionMocked.mockReturnValueOnce([null, false])

    const { getByText } = render(<SignInButton />)

    expect(getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('Should render SignInButton when user is logged', () => {

    useSessionMocked.mockReturnValueOnce([{
      user: {
        name: 'John Doe'
      },
      expires: '2022-12-31'
    }, false])

    const { getByText } = render(<SignInButton />)

    expect(getByText('John Doe')).toBeInTheDocument()
  })
})
