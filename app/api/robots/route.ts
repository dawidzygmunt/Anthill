import { NextRequest } from "next/server"

export async function GET(request: NextRequest): Promise<Response> {
  const host = request.headers.get("host") || "localhost:3000"
  const protocol = host.includes("localhost") ? "http" : "https"
  const siteUrl = `${protocol}://${host}`

  const robots = `User-agent: *
Disallow: /private/
Sitemap: ${siteUrl}/sitemap.xml`

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
