import { useState } from 'react'
import { auth, provider } from '@/lib/firebase'
import { signInWithPopup } from 'firebase/auth'
import openai from '@/lib/openai'
import Layout from '@/components/Layout'

export default function Home() {
  const [user, setUser] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider)
    setUser(result.user)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100,
    })
    setResponse(res.data.choices[0].text)
  }

  return (
    <Layout>
      <h1>Study Helper</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your question"
            />
            <button type="submit">Generate</button>
          </form>
          {response && <p>Response: {response}</p>}
        </div>
      ) : (
        <button onClick={handleLogin}>Sign in with Google</button>
      )}
    </Layout>
  )
}
