import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import ts from 'typescript'

const root = fileURLToPath(new URL('../', import.meta.url))
const code = ts.transpileModule(readFileSync(path.join(root, 'src/data.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText
const data = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)
const { projects, experience, categories, strengths, workingStyle, profile, portfolioDocument, projectVisuals } = data
const slugs = new Set(projects.map(project => project.slug))
assert.equal(slugs.size, projects.length, 'Project slugs must be unique')
assert.equal(projects.length, 5, 'The portfolio must contain five core projects')
assert.equal(experience.length, 6, 'Experience must include five cases and volunteer service')
const projectExperience = experience.filter(item => item.kind === 'project')
assert.equal(projectExperience.length, projects.length)
assert.equal(new Set(projectExperience.map(item => item.projectSlug)).size, projects.length)

function checkLocalization(value) {
  if (!value || typeof value !== 'object') return
  if ('en' in value || 'zh' in value) {
    assert.ok(value.en?.trim() && value.zh?.trim(), 'Both languages must have text')
  }
  Object.values(value).forEach(checkLocalization)
}
Object.values(data).forEach(checkLocalization)

function asset(url) {
  assert.ok(url.startsWith('./'), `Asset must be relative for GitHub Pages: ${url}`)
  const target = path.resolve(root, 'public', url.slice(2))
  assert.ok(target.startsWith(path.join(root, 'public') + path.sep))
  assert.ok(existsSync(target), `Missing public file: ${url}`)
  return target
}
for (const item of projectExperience) {
  assert.ok(slugs.has(item.projectSlug), `Missing experience project: ${item.projectSlug}`)
  assert.deepEqual(item.period, projects.find(project => project.slug === item.projectSlug).period)
}
for (const category of categories) {
  asset(category.image)
  category.projectSlugs.forEach(slug => assert.ok(slugs.has(slug), `Missing category project: ${slug}`))
}
for (const item of [...strengths, ...workingStyle]) {
  assert.ok(slugs.has(item.link.replace('#/projects/', '')), `Broken evidence link: ${item.link}`)
}
projects.forEach(project => asset(projectVisuals[project.slug]))
for (const pdf of [profile.resume, profile.portfolio, ...experience.filter(item => item.kind === 'volunteer').map(item => item.certificate)]) {
  assert.equal(readFileSync(asset(pdf)).subarray(0, 5).toString(), '%PDF-')
}
for (let page = 1; page <= portfolioDocument.pages; page++) {
  asset(`${portfolioDocument.previewPath}/page-${String(page).padStart(2, '0')}.webp`)
}
assert.ok(profile.email.includes('@'))
assert.ok(profile.linkedin.startsWith('https://www.linkedin.com/'))
assert.ok(!profile.github || profile.github.startsWith('https://github.com/'))
console.log(`Content checks passed: ${projects.length} projects, ${experience.length} experiences, ${portfolioDocument.pages} preview pages, bilingual fields and asset links.`)
