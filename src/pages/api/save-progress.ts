import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { questionId, answer } = req.body

  if (!questionId || !answer) {
    return res.status(400).json({ message: 'Invalid request body' })
  }

  try {
    const savedAnswer = await prisma.answer.create({
      data: {
        questionId,
        content: answer.content,
        isCorrect: answer.isCorrect,
      },
    })

    res.status(200).json({ answer: savedAnswer })
  } catch (error) {
    res.status(500).json({ message: 'Error saving progress' })
  }
}
