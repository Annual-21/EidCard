export function getUrlParams() {
  const p = new URLSearchParams(window.location.search)
  return {
    to:   p.get('to')   || '',
    from: p.get('from') || '',
  }
}
