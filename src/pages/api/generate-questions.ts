import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/lib/prisma'
import openai from '@/lib/openai'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { studySessionId } = req.query

  if (!studySessionId || typeof studySessionId !== 'string') {
    return res.status(400).json({ message: 'Invalid study session ID' })
  }

  const studySession = await prisma.studySession.findUnique({
    where: { id: studySessionId },
  })

  if (!studySession) {
    return res.status(404).json({ message: 'Study session not found' })
  }

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate questions based on this content: ${studySession.content}`,
      max_tokens: 100,
    })

    res.status(200).json({ questions: response.data.choices[0].text })
  } catch (error) {
    res.status(500).json({ message: 'Error generating questions' })
  }
}
