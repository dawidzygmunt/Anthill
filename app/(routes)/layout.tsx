export default async function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="w-full min-h-screen flex mx-10 my-5">{children}</div>
}
