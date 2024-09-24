import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { questionId, answer } = req.body
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
