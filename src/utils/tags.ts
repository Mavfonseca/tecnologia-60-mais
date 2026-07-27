export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Unifica tags e keywords, remove duplicatas e trata posts sem nenhum dos dois
export function getPostTags(data: { tags?: string[]; keywords?: string[] }): string[] {
  const combined = [...(data.tags ?? []), ...(data.keywords ?? [])];
  return [...new Set(combined)];
}