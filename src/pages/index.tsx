import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Home() {
  const { data: session } = useSession()

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Welcome to Study Helper</h1>
      {session ? (
        <Link href="/dashboard">
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to Dashboard
          </a>
        </Link>
      ) : (
        <Link href="/api/auth/signin">
          <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Sign In
          </a>
        </Link>
      )}
    </Layout>
  )
}
