import { NextApiRequest, NextApiResponse } from 'next'
import { parsePDF } from '@/lib/pdf-parser'
import formidable from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing form data' })
    }

    const file = files.file[0]
    const buffer = await fs.promises.readFile(file.filepath)
    const content = await parsePDF(buffer)

    // Save to database logic here if needed

    res.status(200).json({ content })
  })
}
