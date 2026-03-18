# .claude/commands/new-project.md
# Usage: /new-project
# Adds a new project to the data layer and syncs all consumers.

## Step 1 — Gather info
Ask Jas for the following if not already provided:
- Project title
- One-line tag (e.g. "Full-Stack · Mobile")
- 1-2 sentence description (Syne body style — factual, no fluff)
- Tech stack array
- Status: complete / in-progress / concept
- Is it featured? (only one featured project at a time)
- Case study path (e.g. `/projects/name`) — if it has one
- GitHub URL
- Any metrics for `cat impact.txt` (accuracy %, endpoints, etc.)

## Step 2 — Add to data/projects.ts
Append a new `Project` object following this exact TypeScript interface:

```typescript
{
  id: 'kebab-case-id',
  title: 'Project Title',
  tag: 'Category · Subcategory',
  description: 'One to two sentences. Factual. No adjectives like "powerful" or "robust".',
  stack: ['Tech1', 'Tech2', 'Tech3'],
  status: 'complete' | 'in-progress' | 'concept',
  featured: false,
  caseStudyPath: '/projects/kebab-case-id',  // omit if no case study
  githubUrl: 'https://github.com/Jaskaran-0/repo',
  metrics: [                                  // omit if no metrics
    { label: 'Metric label', value: 'Value' },
  ],
}
```

## Step 3 — Update Terminal
Open `components/Terminal.tsx`.
Find the `'ls projects'` command response array.
Add a new entry:
```typescript
{ t: 'drwxr-xr-x  [Repo-Name]/', c: 'out' }
```

If the project has metrics, add them to the `'cat impact.txt'` command response.

## Step 4 — Create case study page (if applicable)
Create `app/projects/[id]/page.tsx` with `generateStaticParams()`.
Use the existing RCAF case study as the template.

## Step 5 — Verify
Run `npm run build` to confirm static params are correct and no TypeScript errors.
