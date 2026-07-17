(function () {
  try {
    var theme = localStorage.getItem('filhos-obaluaie-theme')
    if (
      theme === 'dark' ||
      (theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    }
  } catch {}
})()
