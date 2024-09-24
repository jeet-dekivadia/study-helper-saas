import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/lib/prisma'
import { parsePDF } from '@/lib/pdf-parser'
import { IncomingForm } from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const form = new IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing form data' })
    }

    const file = files.file[0]
    const buffer = await fs.promises.readFile(file.filepath)
    const content = await parsePDF(buffer)

    const studySession = await prisma.studySession.create({
      data: {
        userId: session.user.id,
        title: fields.title[0],
        content,
      },
    })

    res.status(200).json({ studySession })
  })
}
