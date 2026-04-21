(function () {
  var html = document.documentElement
  var overlay = document.querySelector('.aside-overlay')
  var aside = document.querySelector('.sacred-aside')

  function openMenu() {
    if (aside) aside.classList.add('open')
    if (overlay) overlay.classList.add('open')
    if (menuBtn) menuBtn.classList.add('open')
    // Prevent scroll jump by compensating for scrollbar width
    var scrollWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollWidth > 0) document.body.style.paddingRight = scrollWidth + 'px'
  }

  function closeMenu() {
    if (aside) aside.classList.remove('open')
    if (overlay) overlay.classList.remove('open')
    if (menuBtn) menuBtn.classList.remove('open')
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }

  // Theme toggle
  var themeBtn = document.querySelector('.theme-toggle')
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var themes = ['light', 'sepia', 'dark']
    var current = 'light'
    if (html.classList.contains('dark')) current = 'dark'
    else if (html.classList.contains('sepia')) current = 'sepia'
    
    var nextIndex = (themes.indexOf(current) + 1) % themes.length
    var nextTheme = themes[nextIndex]
    
    html.classList.remove('light', 'dark', 'sepia')
    if (nextTheme !== 'light') html.classList.add(nextTheme)
    
    try { document.cookie = 'ol-color-mode=' + nextTheme + ';path=/;max-age=31536000' } catch (e) {}
  })

  // Hamburger
  var menuBtn = document.querySelector('.hamburguer-btn')
  if (menuBtn) menuBtn.addEventListener('click', function () {
    aside && aside.classList.contains('open') ? closeMenu() : openMenu()
  })

  // Close on overlay click
  if (overlay) overlay.addEventListener('click', closeMenu)

  // Close on nav link click
  if (aside) aside.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu)
  })

  // Header hide on scroll
  var header = document.querySelector('.frontispiece')
  if (header) {
    var last = 0, ticking = false
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var y = window.scrollY
          var isOpen = aside && aside.classList.contains('open')
          if (y > last && y > 100 && !isOpen) {
            header.style.transform = 'translateY(-100%)'
            header.style.opacity = '.2'
          } else {
            header.style.transform = ''
            header.style.opacity = ''
          }
          last = y
          ticking = false
        })
        ticking = true
      }
    }, { passive: true })
  }
})()
