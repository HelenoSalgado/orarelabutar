<template>
  <div class="elegant-player-container">
    <!-- Fundo com imagem e filtros aprimorados -->
    <div 
      class="player-background" 
      :style="{ backgroundImage: `url(${imgUrl})` }"
    ></div>
    
    <!-- Gradientes para profundidade e destaque -->
    <div class="player-overlay-top"></div>
    <div class="player-overlay-bottom"></div>

    <audio :src="src"></audio>
    
    <div class="player-content">
      <!-- Espaço superior para valorizar a imagem -->
      <div class="image-focus-area"></div>

      <!-- Seção de Controles (agora acima do progresso) -->
      <div class="controls-section">
        <button type="button" class="control-btn skip" aria-label="Voltar 10 segundos">
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M12.5 5.5v13L3 12l9.5-6.5zM21 5.5v13L11.5 12 21 5.5z"/>
          </svg>
          <span class="skip-label">10s</span>
        </button>

        <button type="button" class="main-play-btn" aria-label="Ouvir">
          <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
            <path d="M8 5.14v14.13L19 12 8 5.14z"/>
          </svg>
        </button>

        <button type="button" class="control-btn skip" aria-label="Avançar 10 segundos">
          <span class="skip-label">10s</span>
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M3 5.5v13L12.5 12 3 5.5zM11.5 5.5v13L21 12 11.5 5.5z"/>
          </svg>
        </button>
      </div>

      <!-- Barra de Progresso (último elemento) -->
      <div class="progress-section">
        <div class="time-info">
          <span>00:00</span>
          <span>00:00</span>
        </div>
        <div class="progress-container">
          <div class="progress-bar-fill" style="width: 0%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  imgUrl?: string
}>()

useHead({
  script: [
    {
      innerHTML: `
        (function() {
          if (window.__AUDIO_PLAYER_INIT__) return;
          window.__AUDIO_PLAYER_INIT__ = true;

          const format = (s) => {
            if (!s || isNaN(s)) return '00:00';
            const m = Math.floor(s / 60);
            const rs = Math.floor(s % 60);
            return m.toString().padStart(2, '0') + ':' + rs.toString().padStart(2, '0');
          };

          const update = (audio) => {
            const container = audio.closest('.elegant-player-container');
            if (!container) return;
            const isPlaying = !audio.paused;
            const playBtn = container.querySelector('.main-play-btn');
            if (playBtn) {
              playBtn.innerHTML = isPlaying 
                ? '<svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
                : '<svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M8 5.14v14.13L19 12 8 5.14z"/></svg>';
            }
            const bar = container.querySelector('.progress-bar-fill');
            if (bar && audio.duration) {
              bar.style.width = (audio.currentTime / audio.duration * 100) + '%';
            }
            const times = container.querySelectorAll('.time-info span');
            if (times.length >= 2) {
              times[0].textContent = format(audio.currentTime);
              times[1].textContent = format(audio.duration);
            }
          };

          document.addEventListener('click', (e) => {
            const play = e.target.closest('.main-play-btn');
            if (play) {
              const a = play.closest('.elegant-player-container').querySelector('audio');
              if (a.paused) a.play(); else a.pause();
              return;
            }
            const skip = e.target.closest('.control-btn.skip');
            if (skip) {
              const a = skip.closest('.elegant-player-container').querySelector('audio');
              const label = skip.getAttribute('aria-label');
              a.currentTime += label.includes('Voltar') ? -10 : 10;
              return;
            }
            const prog = e.target.closest('.progress-container');
            if (prog) {
              const a = prog.closest('.elegant-player-container').querySelector('audio');
              const r = prog.getBoundingClientRect();
              const x = e.clientX - r.left;
              if (a.duration) a.currentTime = (x / r.width) * a.duration;
            }
          });

          ['play', 'pause', 'timeupdate', 'loadedmetadata'].forEach(ev => {
            document.addEventListener(ev, (e) => {
              if (e.target.tagName === 'AUDIO') update(e.target);
            }, true);
          });
        })();
      `,
      tagPosition: 'bodyClose',
      id: 'audio-player-handler'
    }
  ]
});
</script>

<style scoped>
.elegant-player-container {
  position: relative;
  width: 100%;
  height: 450px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 25px 50px var(--color-shadow);
  background: #000;
}

.player-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: brightness(0.7) contrast(1.1);
  transition: transform 0.5s ease;
}

.elegant-player-container:hover .player-background {
  transform: scale(1.03);
}

.player-overlay-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4), transparent);
  z-index: 1;
}

.player-overlay-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70%;
  background: linear-gradient(to top, 
    rgba(0,0,0,0.9) 0%, 
    rgba(0,0,0,0.6) 50%, 
    transparent 100%
  );
  z-index: 1;
}

.elegant-player-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at bottom, var(--color-gold-muted) 0%, transparent 70%);
  opacity: 0.3;
  z-index: 1;
  pointer-events: none;
}

.player-content {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0;
}

.image-focus-area {
  flex-grow: 1;
}

.controls-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xl);
  margin-bottom: var(--space-lg);
  padding: 0 var(--space-lg);
}

.main-play-btn {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  background: white;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.main-play-btn:hover {
  transform: scale(1.1);
  background: var(--color-gold);
  color: white;
  box-shadow: 0 0 30px var(--color-gold-muted);
}

.control-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.8;
  transition: all 0.2s;
}

.control-btn:hover {
  opacity: 1;
  color: var(--color-gold);
  transform: translateY(-2px);
}

.skip-label {
  font-size: 0.8rem;
  font-weight: bold;
  font-family: monospace;
}

.progress-section {
  width: 100%;
  padding-bottom: var(--space-md);
}

.time-info {
  display: flex;
  justify-content: space-between;
  padding: 0 var(--space-lg);
  margin-bottom: 8px;
  font-size: 0.8rem;
  font-family: monospace;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 1px;
}

.progress-container {
  height: 8px;
  width: 100%;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
}

.progress-container::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
}

.progress-bar-fill {
  position: relative;
  height: 4px;
  background: var(--color-gold);
  border-radius: 2px;
  transition: width 0.1s linear;
}

.progress-bar-fill::after {
  content: '';
  position: absolute;
  right: -8px;
  top: -6px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0,0,0,0.8);
  border: 2px solid var(--color-gold);
  transform: scale(0);
  transition: transform 0.2s ease;
}

.progress-container:hover .progress-bar-fill::after {
  transform: scale(1);
}

@media (max-width: 600px) {
  .elegant-player-container {
    height: 350px;
  }
  .main-play-btn {
    width: 65px;
    height: 65px;
  }
  .controls-section {
    gap: var(--space-lg);
  }
}
</style>
