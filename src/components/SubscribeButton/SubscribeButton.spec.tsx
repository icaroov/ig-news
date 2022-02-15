import { render, fireEvent } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import SubscribeButton from '.'

jest.mock('next-auth/client')
jest.mock('next/router')

const useSessionMocked = mocked(useSession)

describe('SubscribeButton Component', () => {
  it('Should render SubscribeButton correctly', () => {


    useSessionMocked.mockReturnValueOnce([null, false])

    const { getByText } = render(<SubscribeButton />)

    expect(getByText('Subscribe Now')).toBeInTheDocument()
  })

  it('Should redirects user to Sign In when not logged', () => {
    const signInMocked = mocked(signIn)

    useSessionMocked.mockReturnValueOnce([null, false])

    const { getByText } = render(<SubscribeButton />)

    fireEvent.click(getByText('Subscribe Now'))

    expect(signInMocked).toHaveBeenCalledWith('github')
    expect(signInMocked).toHaveBeenCalledTimes(1)
  })

  it('Should redirects user to Posts when already logged', () => {
    const useRouterMocked = mocked(useRouter)
    const pushMocked = jest.fn()

    useSessionMocked.mockReturnValueOnce([{
      user: {
        name: 'John Doe'
      },
      activeSubscription: '123',
      expires: '2022-12-31'
    }, false])

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked
    } as any)

    const { getByText } = render(<SubscribeButton />)

    fireEvent.click(getByText('Subscribe Now'))

    expect(pushMocked).toHaveBeenCalledWith('/posts')
  })
})
