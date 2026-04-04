export const theme = `
        (function() {
          try {
            var theme = localStorage.getItem('theme');
            var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
            if (theme === 'dark' || (!theme && supportDarkMode)) {
              document.documentElement.classList.add('dark-mode');
            } else {
              document.documentElement.classList.remove('dark-mode');
            }
          } catch (e) {}
        })();
      `;
