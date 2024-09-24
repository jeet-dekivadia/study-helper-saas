import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto p-4">
      {children}
    </div>
  )
}

export default Layout
