export const secondsToTime = (seconds: number) => {
  if (seconds <= 0) {
    return {
      h: 0,
      m: 0,
      s: 0
    }
  }
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0')
  const m = Math.floor(seconds % 3600 / 60).toString().padStart(2, '0')
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')

  return { h, m, s }
}
