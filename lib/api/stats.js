import { getStats } from './scraping/hasan-tool'

export default async function handler(req, res) {
  return getStats(req, res)
}
