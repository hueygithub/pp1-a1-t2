'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: LoginInput) => {
    try {
      await signInWithEmail(data.email, data.password)
      toast.success('Signed in successfully')
      router.replace('/dashboard')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
      } else {
        toast.error('Invalid email or password')
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/dashboard')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  return (   /*900 zinc ref*/
    <div className="border border-zinc-800 space-y-6 pt-10 pr-10 pb-10 pl-10 rounded-md bg-zinc-900">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold text-primary: #EDEDED">Welcome!</h1>
        {/* <p className="text-sm text-zinc-500">Enter your credentials to continue</p> */}
      </div>

      {/* <div className="relative"> */}
        {/* <div className="absolute inset-0 flex items-center"> */}
          {/* <span className="w-full border-t border-zinc-200 dark:border-zinc-700" /> */}
        {/* </div> */}
        {/* <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-zinc-50 px-2 text-zinc-400 dark:bg-zinc-950">or</span>
        </div> */}
      {/* </div> */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5 surface: zinc-900">
          {/* <label htmlFor="email" className="text-sm font-medium">
            Email
          </label> */}
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined} /*900 zinc ref*/
            className="w-full border border-zinc-800 rounded-md px-3 py-2 offset: 2px border-focus: 2px text-sm shadow-sm placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-500 focus:outline-none aria-invalid:border-red-500 dark:bg-zinc-950 dark:bg-zinc-900 surface-sunken: bg-zinc-950"
            placeholder="Email"
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className="pt-2 text-red-400 text-xs font-normal border-focus: 2px border-error: #E83F48 text-error: #F26B72" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

{/* password field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            {/* <label htmlFor="password" className="text-sm font-medium">
              Password
            </label> */}
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className="w-full border border-zinc-800 rounded-md px-3 py-2 offset: 2px border-focus: 2px text-sm shadow-sm placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-500 focus:outline-none aria-invalid:border-red-500 dark:bg-zinc-950 dark:bg-zinc-900 surface-sunken: bg-zinc-950"
            placeholder="Password"
            {...register('password')} 
          />
          {errors.password && (
            <p id="password-error" className="pt-2 border-red-400 text-red-400 text-xs font-normal border-error: #F26B72 text-error: #F26B72" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

          {/* submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md offset: 2px border-focus: 2px surface-alt: #EDEDED px-4 py-2.5 text-sm font-semibold text-inverse: #09090B transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
        
        <button
        type="button"
        onClick={handleGoogleSignIn}   /* bg-black ref here and also outline-1 outline-offset4*/
        className="border border-zinc-800 text-primary: #EDEDED offset: 2px border-focus: 2px flex w-full items-center justify-center gap-3 rounded-md px-2 py-2.5 text-sm font-semibold shadow-sm transition-colors hover:bg-black dark:border-zinc-700 dark:bg-black dark:hover:bg-zinc-800 surface-sunken: #0C0C0E border: zinc-800"
      >
        
        <svg className="outline-1 outline-offset-4 rounded-xl h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Sign in with Google
      </button>
      </form>

      <p className="text-center text-xs font-normal text-primary text-muted: #A0A0A8">
        Create an account {' '}
        <Link
          href="/auth/signup"
          className="text-xs font-semibold text-primary hover:underline dark:text-white"
        >
          here
        </Link>
      </p>
    </div>
  )
}
