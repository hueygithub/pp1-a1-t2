'use client'

import teamMembers from '@/data/team.json'

// team name - falls back to a default if empty or missing
const TEAM_NAME = 'Team 50'
const DEFAULT_TEAM_NAME = 'Our Team'
const FALLBACK_IMAGE = '/fallback.png'

// if the blurb is longer than 240 characters, cut it off and add "..."
function truncateBlurb(text: string): string {
  if (text.length <= 240) {
    return text
  }
  return text.slice(0, 240).trimEnd() + '...'
}

// check if a photo path looks valid (must start with / or http)
function isValidPhoto(photo: string | null): boolean {
  if (typeof photo !== 'string') return false
  const trimmed = photo.trim()
  return trimmed.startsWith('/') || trimmed.startsWith('http')
}

export default function TeamPage() {
  // use team name with fallback if it's somehow empty
  const displayName = TEAM_NAME?.trim() || DEFAULT_TEAM_NAME

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      {/* page heading */}
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-muted uppercase tracking-wide">
          {displayName}
        </p>
        <h1 className="text-5xl font-bold text-primary mt-2">
          Our Crew
        </h1>
      </div>

      {/* member cards - 3 per row, last row centered */}
      <div className="flex flex-wrap justify-center gap-6 max-w-[960px] mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="w-full md:w-[calc(33.333%-1rem)] border border-border rounded-lg bg-surface p-4"
          >
            {/* member photo, falls back to placeholder if missing, empty, or broken */}
            <img
              src={isValidPhoto(member.photo) ? member.photo! : FALLBACK_IMAGE}
              alt={member.name}
              onError={(e) => {
                const img = e.target as HTMLImageElement
                // only swap to fallback if we haven't already (prevents infinite loop)
                if (!img.src.endsWith(FALLBACK_IMAGE)) {
                  img.src = FALLBACK_IMAGE
                }
              }}
              onLoad={(e) => {
                const img = e.target as HTMLImageElement
                // if image loaded but has no real content (corrupted), swap to fallback
                if (img.naturalWidth === 0 && !img.src.endsWith(FALLBACK_IMAGE)) {
                  img.src = FALLBACK_IMAGE
                }
              }}
              className="w-full aspect-square object-cover rounded-md"
            />

            {/* name */}
            <h2 className="text-xl font-semibold text-primary mt-4">
              {member.name || 'Team Member'}
            </h2>

            {/* role badge */}
            <span className="inline-block text-xs font-normal text-muted bg-surface-raised border border-border-raised rounded px-2 py-0.5 mt-1">
              {member.role}
            </span>

            {/* blurb - show a dash if the member hasn't added one yet */}
            <p className="text-sm font-normal text-muted mt-3 text-balance wrap-break-word">
              {member.blurb ? truncateBlurb(member.blurb) : '\u2013'}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

