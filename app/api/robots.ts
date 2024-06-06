import { NextApiRequest, NextApiResponse } from "next"

const SITE_URL = "https://www.example.com"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const robots = `
    User-agent: *
    Disallow: /private/
    Sitemap: ${SITE_URL}/sitemap.xml
  `
  res.send(robots)
}
