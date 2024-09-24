import pdf from 'pdf-parse'

export async function parsePDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer)
    return data.text
  } catch (error) {
    console.error('Error parsing PDF:', error)
    throw new Error('Failed to parse PDF')
  }
}
