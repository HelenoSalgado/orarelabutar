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

    <audio
      ref="audioRef"
      :src="src"
      @timeupdate="updateProgress"
      @loadedmetadata="onLoadedMetadata"
      @ended="isPlaying = false"
    ></audio>
    
    <div class="player-content">
      <!-- Espaço superior para valorizar a imagem -->
      <div class="image-focus-area"></div>

      <!-- Seção de Controles (agora acima do progresso) -->
      <div class="controls-section">
        <button type="button" class="control-btn skip" @click="skip(-10)" aria-label="Voltar 10 segundos">
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M12.5 5.5v13L3 12l9.5-6.5zM21 5.5v13L11.5 12 21 5.5z"/>
          </svg>
          <span class="skip-label">10s</span>
        </button>

        <button type="button" class="main-play-btn" @click="togglePlay" :aria-label="isPlaying ? 'Pausar' : 'Ouvir'">
          <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
            <path d="M8 5.14v14.13L19 12 8 5.14z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>

        <button type="button" class="control-btn skip" @click="skip(10)" aria-label="Avançar 10 segundos">
          <span class="skip-label">10s</span>
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M1.5 5.5v13L11 12 1.5 5.5zM11.5 5.5v13l9.5-6.5-9.5-6.5z"/>
          </svg>
        </button>
      </div>

      <!-- Barra de Progresso (último elemento) -->
      <div class="progress-section">
        <div class="time-info">
          <span>{{ formatTime(currentTime) }}</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
        <div class="progress-container" @click="seek">
          <div class="progress-bar-fill" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string
  imgUrl?: string
}>()

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)

const togglePlay = () => {
  if (!audioRef.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const skip = (seconds: number) => {
  if (!audioRef.value) return
  audioRef.value.currentTime += seconds
}

const updateProgress = () => {
  if (!audioRef.value) return
  currentTime.value = audioRef.value.currentTime
  progress.value = (currentTime.value / (duration.value || 1)) * 100
}

const onLoadedMetadata = () => {
  if (!audioRef.value) return
  duration.value = audioRef.value.duration
}

const seek = (event: MouseEvent) => {
  if (!audioRef.value || !duration.value) return
  
  // Evita forced reflow usando requestAnimationFrame para leitura assíncrona
  requestAnimationFrame(() => {
    const container = event.currentTarget as HTMLElement
    if (!container) return
    
    const rect = container.getBoundingClientRect()
    const x = event.clientX - rect.left
    const percentage = x / rect.width
    audioRef.value!.currentTime = percentage * duration.value
  })
}

const formatTime = (seconds: number) => {
  if (!seconds) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

onBeforeUnmount(() => {
  if (audioRef.value) {
    audioRef.value.pause()
    audioRef.value.src = ''
    audioRef.value.load()
  }
})
</script>

<style scoped>
.elegant-player-container {
  position: relative;
  width: 100%;
  height: 450px; /* Altura aumentada significativamente */
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
  filter: brightness(0.7) contrast(1.1); /* Imagem mais nítida e vibrante */
  transition: transform 0.5s ease;
}

.elegant-player-container:hover .player-background {
  transform: scale(1.03);
}

/* Gradiente superior para dar profundidade */
.player-overlay-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4), transparent);
  z-index: 1;
}

/* Gradiente inferior denso para destacar controles e progresso */
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

/* Overlay de cor destaque sutil (Gold) */
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
  padding: 0; /* Padding controlado internamente */
}

.image-focus-area {
  flex-grow: 1; /* Empurra os controles para baixo, deixando o topo livre */
}

/* Controles */
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

/* Progresso na base */
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
