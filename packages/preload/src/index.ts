// // All the Node.js APIs are available in the preload process.
// @ts-ignore
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    // @ts-ignore
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
