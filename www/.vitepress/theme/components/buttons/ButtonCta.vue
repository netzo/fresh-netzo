<script setup lang="ts">
import VideoModal from '@theme/components/VideoModal.vue'
import VideoModalConsent from '@theme/components/VideoModalConsent.vue'
import type { ButtonCta } from '../types'
import { BUTTONS } from './buttons'

const props = defineProps<{
  button: ButtonCta
}>()

const BUTTON = props.button?.type ? BUTTONS?.[props.button.type] : {}

const {
  variant,
  type,
  text: _text,
  icon,
  href,
  target,
  onClick,
  class: _class = 'vp-button',
  video,
}: ButtonCta = { ...BUTTON, ...props.button }

const classList = {
  primary: `${_class} vp-button vp-button--primary`,
  secondary: `${_class} vp-button vp-button--secondary`,
  tertiary: `${_class} vp-button vp-button--tertiary`,
}?.[variant as string] ?? _class

const route = useRoute()

const text = computed(() => {
  if (!classList.includes('nav-bar-cta')) return _text
  return route.path.startsWith('/es') ? 'Contáctanos' : 'Let\'s Talk'
})
</script>

<template>
  <VideoModal
    v-if="type === 'video-modal'"
    v-bind="{ class: classList, text, video }"
  />
  <VideoModalConsent
    v-else-if="type === 'video-modal-consent'"
    v-bind="{ class: classList, video }"
  />
  <button
    v-else-if="onClick"
    v-bind="{ ...$attrs, class: classList, onClick }"
  >
    {{ text }}
  </button>
  <a
    v-else
    v-bind="{ ...$attrs, class: classList, href, target }"
  >
    <div v-if="icon && icon !== 'default'" :class="`h-24px w-24px -ml-1 mr-2 ${icon}`" />
    {{ text }}
    <svg
      v-if="icon === 'default' && !classList.includes('nav-bar-cta')"
      class="icon"
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
    >
      <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
    </svg>
  </a>
  <p v-if="button.caption" v-html="button.caption" />
</template>

<style>
/* actions: global styles for cta buttons container */
.actions {
  display: flex;
  place-content: center;
  gap: 12px 18px;
  margin-top: 36px;
  margin-bottom: 36px;
}

@media (max-width: 576px) {
  .actions {
    flex-direction: column;
  }

  .actions a,
  .actions button {
    width: 100%;
  }
}
</style>

<style scoped>
.vp-button {
  font-size: 16px;
  padding: 8px 18px;
  display: inline-flex;
  place-items: center;
  place-content: center;
  text-align: center;
  font-weight: 500;
  border-radius: 4px;
  background-color: var(--vp-c-bg-mute);
  transition: background-color 0.5s, color 0.5s;
  cursor: pointer;
}

.vp-button[large] {
  margin-top: 32px;
  margin-bottom: 32px;
  padding: 12px 24px;
  font-weight: 600;
}

/* nav-bar-cta */

.vp-button.nav-bar-cta {
  font-size: 14px;
  padding: 4px 12px;
  margin-left: 10px;
}

@media (min-width: 768px) {
  .vp-button.nav-bar-cta {
    margin-left: 18px;
  }
}

.icon {
  display: inline;
  position: relative;
  top: -1px;
  margin-left: 6px;
  fill: currentColor;
  transition: transform 0.2s;
}

p {
  padding-top: 4px;
  margin-bottom: -8px;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  text-align: center
}

/* primary */

.vp-button.vp-button--primary {
  font-weight: 600;
  background-color: var(--vp-c-primary);
  color: #ffffff;
}

.dark .vp-button.vp-button--primary {
  /* background-color: var(--vp-c-primary-dark) !important; */
}

.vp-button.vp-button--primary:hover {
  background-color: var(--vp-c-primary-dark);
  transition-duration: 0.2s;
}

.dark .vp-button.vp-button--primary:hover {
  background-color: var(--vp-c-primary-light);
}

.vp-button.vp-button--primary:hover .icon {
  transform: translateX(2px);
}

/* secondary */

.vp-button.vp-button--secondary {
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-text-1);
}

.vp-button.vp-button--secondary:hover {
  background-color: var(--vp-c-bg-mute);
  transition-duration: 0.2s;
}

/* tertiary */

.vp-button.vp-button--tertiary {
  background-color: transparent;
  color: var(--vp-c-text-1);
}

.vp-button.vp-button--tertiary:hover {
  opacity: 0.8;
  transition-duration: 0.2s;
}
</style>
