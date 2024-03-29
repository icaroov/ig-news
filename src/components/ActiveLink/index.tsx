import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import { cloneElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: React.ReactElement
  activeClassName: string
}

export default function ActiveLink({
  children,
  activeClassName,
  ...props
}: ActiveLinkProps) {
  const { asPath } = useRouter()

  const className = asPath === props.href ? activeClassName : ''

  return <Link {...props}>{cloneElement(children, { className })}</Link>
}
