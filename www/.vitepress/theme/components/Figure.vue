<script setup lang="ts">
import { useEvents } from '@theme/composables/events'

const { src, srcDark, alt, showCaption = false, isGIF = false, subtitles } = defineProps<{
  src: string
  srcDark?: string
  poster?: string // URL of the poster image
  alt?: string
  showCaption?: boolean
  isGIF?: boolean
  subtitles?: [
    {
      label: string
      kind: 'subtitles' | 'captions'
      srclang: string
      src: string
      default?: boolean
    },
  ]
}>()

const { isDark } = useData() // IMPORTANT: use vitepress/useData() not @vueuse/useDark()

const playButtonVisible = ref(!isGIF)

const { trackVideoPlay } = useEvents()

async function togglePlayButton() {
  const el = document.querySelector('video')

  if (!el) return

  trackVideoPlay()

  if (el.paused) {
    await el.play()
    playButtonVisible.value = false
  }
  else {
    el.pause()
    playButtonVisible.value = true
  }
}
</script>

<template>
  <figure>
    <template v-if="src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.ogg')">
      <!-- IMPORTANT: chrome does not allow to auto play video with sound on, so make sure to add muted
     NOTE: playsinline is necessary for autoplaying to occur in iOS -->
      <video
        v-if="isGIF"
        v-bind="{ alt, src: isDark && srcDark ? srcDark : src, poster, subtitles }"
        class="lazy"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
      >
        <source v-if="src.endsWith('.mp4')" :src="isDark && srcDark ? srcDark : src" type="video/mp4">
        <source v-if="src.endsWith('.webm')" :src="isDark && srcDark ? srcDark : src" type="video/webm">
        <source v-if="src.endsWith('.ogg')" :src="isDark && srcDark ? srcDark : src" type="video/ogg">
        Your browser does not support the video tag.
      </video>

      <div
        v-else class="relative flex justify-center items-center w-full max-w-full cursor-pointer"
        @click.prevent="togglePlayButton()"
      >
        <video
          v-bind="{ alt, src: isDark && srcDark ? srcDark : src, poster, subtitles }"
          allowfullscreen
          controls
          controlslist="nodownload captionssubtitles"
          preload="metadata"
        >
          <source v-if="src.endsWith('.mp4')" :src="isDark && srcDark ? srcDark : src" type="video/mp4">
          <source v-if="src.endsWith('.webm')" :src="isDark && srcDark ? srcDark : src" type="video/webm">
          <source v-if="src.endsWith('.ogg')" :src="isDark && srcDark ? srcDark : src" type="video/ogg">
          Your browser does not support the video tag.

          <track
            v-for="subtitle in subtitles"
            :key="subtitle.srclang"
            :label="subtitle.label"
            :kind="subtitle.kind"
            :srclang="subtitle.srclang"
            :src="subtitle.src"
            :default="subtitle.default"
          >
        </video>
        <svg
          v-if="playButtonVisible"
          class="absolute flex rounded-full cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#ffffff"
          width="80px"
          height="80px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      </div>
    </template>

    <picture v-if="!(src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.ogg'))">
      <source v-if="src.endsWith('.png')" :src="isDark && srcDark ? srcDark : src" type="image/png">
      <source
        v-if="src.endsWith('.  webp')" :src="isDark && srcDark ? srcDark : src" type="image/webp"
      >
      <source v-if="src.endsWith('.jpg')" :src="isDark && srcDark ? srcDark : src" type="image/jpg">
      <img v-bind="{ alt, src: isDark && srcDark ? srcDark : src }">
    </picture>

    <figcaption v-if="showCaption">
      {{ alt }}
    </figcaption>
  </figure>
</template>

  <style scoped>
/* removes default loader */

video::-webkit-media-controls {
  visibility: hidden;
}

video::-webkit-media-controls-enclosure {
    visibility: visible;
}
</style>

