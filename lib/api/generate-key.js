import { generateKey } from './scraping/hasan-tool'

export default async function handler(req, res) {
  return generateKey(req, res)
}
