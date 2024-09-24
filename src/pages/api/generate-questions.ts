import { NextApiRequest, NextApiResponse } from 'next'
import openai from '@/lib/openai'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { content } = req.body
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate questions based on this content: ${content}`,
      max_tokens: 100,
    })

    res.status(200).json({ questions: response.data.choices[0].text })
  } catch (error) {
    res.status(500).json({ message: 'Error generating questions' })
  }
}
