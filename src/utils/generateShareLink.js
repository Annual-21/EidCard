export function generateShareLink(to, from) {
  const url = new URL(window.location.href.split('?')[0])
  if (to)   url.searchParams.set('to',   to)
  if (from) url.searchParams.set('from', from)
  return url.toString()
}
