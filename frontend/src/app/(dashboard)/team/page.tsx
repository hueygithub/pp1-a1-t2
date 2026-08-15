'use client'

import teamMembers from '@/data/team.json'

// if the blurb is longer than 240 characters, cut it off and add "..."
function truncateBlurb(text: string): string {
  if (text.length <= 240) {
    return text
  }
  return text.slice(0, 240).trimEnd() + '...'
}

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16">
      {/* page heading */}
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-muted uppercase tracking-wide">
          Team 50
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
            {/* member photo, falls back to placeholder if missing or broken */}
            <img
              src={member.photo || '/fallback.png'}
              alt={member.name}
              onError={(e) => {
                const img = e.target as HTMLImageElement
                img.src = '/fallback.png'
              }}
              className="w-full aspect-square object-cover rounded-md"
            />

            {/* name */}
            <h2 className="text-xl font-semibold text-primary mt-4">
              {member.name}
            </h2>

            {/* role badge */}
            <span className="inline-block text-xs font-normal text-muted bg-surface-raised border border-border-raised rounded px-2 py-0.5 mt-1">
              {member.role}
            </span>

            {/* blurb - show a dash if the member hasn't added one yet */}
            <p className="text-sm font-normal text-muted mt-3">
              {member.blurb ? truncateBlurb(member.blurb) : '\u2013'}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
