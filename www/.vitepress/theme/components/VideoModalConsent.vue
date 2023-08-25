<script setup lang="ts">
import type { ButtonCta } from './types'

const {
  text = 'Preview',
  video,
} = defineProps<ButtonCta>()

// video:

const showTertiaryCta = ref<boolean>(false)
watch(
  () => showTertiaryCta.value,
  (value) => {
    if (value) {
      document.documentElement.style.overflow = 'hidden'
      // NOTE: fathom will capture event only in production (site: 'netzo')
      window?.fathom?.trackGoal('6GGROL1Z', 0)
    }
    else {
      document.documentElement.style.overflow = 'auto'
    }
  },
)

// styles based on usercentrics consent given:

const videoSpaceStyle = ref('') // will change if YouTube video not consented

onMounted(() => {
  // Checks constentent of YouTube video and applies necessary styles accordingly
  // see https://docs.usercentrics.com/#/cmp-v2-ui-api?id=getservices
  window.addEventListener('UC_UI_INITIALIZED', (event) => {
    const servicesBaseInfo = window.UC_UI.getServicesBaseInfo()
    const YoutubeVideo = servicesBaseInfo.find(data => (data.id === 'BJnb3X38F'))
    videoSpaceStyle.value = YoutubeVideo?.consent?.status ? '' : 'padding: 0px !important;'
  })
})
</script>

<template>
  <button class="flex justify-center" @click="showTertiaryCta = true">
    <svg
      class="icon-play"
      aria-labelledby="simpleicons-play-icon"
      role="img"
      viewBox="0 0 100 125"
      fill="#FFFFFF"
    >
      <title id="simpleicons-play-icon" lang="en">Play icon</title>
      <path
        d="M50,3.8C24.5,3.8,3.8,24.5,3.8,50S24.5,96.2,50,96.2S96.2,75.5,96.2,50S75.5,3.8,50,3.8z M71.2,53.3l-30.8,18  c-0.6,0.4-1.3,0.5-1.9,0.5c-0.6,0-1.3-0.1-1.9-0.5c-1.2-0.6-1.9-1.9-1.9-3.3V32c0-1.4,0.8-2.7,1.9-3.3c1.2-0.6,2.7-0.6,3.8,0  l30.8,18c1.2,0.6,1.9,1.9,1.9,3.3S72.3,52.7,71.2,53.3z"
      />
    </svg>
    {{ text }}
  </button>
  <Teleport v-if="showTertiaryCta" to="body">
    <div
      class="video-modal-mask"
      @click="showTertiaryCta = false"
    >
      <div class="video-modal-wrapper">
        <div class="video-space" :style="videoSpaceStyle">
          <!-- See: https://docs.usercentrics.com/#/smart-data-protector for info on GDPR compliant YouTube video use -->
          <iframe
            :uc-src="video!.src"
            type="text/plain"
            data-usercentrics="YouTube Video"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
button {
  padding: 8px 1em;
  margin: 0 auto;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: background-color 0.5s, color 0.5s;
}

button:hover {
  opacity: 0.8;
  transition-duration: 0.2s;
}

@media (min-width: 576px) {
  button {
    margin: 0;
  }
}

.icon-play {
  display: inline-flex;
  margin-left: 2px;
  margin-right: 6px;
  fill: currentColor;
  width: 1.5em;
  align-items: center;
}

.video-modal-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 30;
  transition: opacity 0.3s ease;
}

.video-modal-wrapper {
  display: block;
  box-sizing: border-box;
  border-radius: 8px;
  position: fixed;
  width: 75%;
  height: auto;
  box-shadow: 0 0 10px rgb(0 0 0 / 20%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 40;
}

.video-space {
  position: relative;
  padding: 56.25% 0 0 0;
}

.video-space:has(> #uc1652097957738) {
  padding: 0 !important;
}

iframe {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  border-radius: 6px;
}
</style>
