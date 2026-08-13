import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from '@/actions/auth.actions'

export const metadata: Metadata = {
  title: 'Authentication',
}

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  // if the user is already logged in, send them to the team page
  const session = await getServerSession()
  if (session) redirect('/team')

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}

