<script setup lang="ts">
// video:

const VIDEO_SOURCE = '/netzo-overview.mp4'
const showTertiaryCta = ref<boolean>(false)
watch(
  () => showTertiaryCta.value,
  (value) => {
    if (value) {
      document.documentElement.style.overflow = 'hidden'
      // NOTE: fathom will capture event only in production (site: 'netzo')
      window?.fathom?.trackGoal('MJ8EU222', 0)
    }
    else {
      document.documentElement.style.overflow = 'auto'
    }
  },
)

// styles based on usercentrics consent given:

// onMounted(() => {
//   // Checks constentent of YouTube video and applies necessary styles accordingly
//   // see https://docs.usercentrics.com/#/cmp-v2-ui-api?id=getservices
//   window.addEventListener('UC_UI_INITIALIZED', (event) => {
//     const servicesBaseInfo = window.UC_UI.getServicesBaseInfo()
//     const YoutubeVideo = servicesBaseInfo.find(data => (data.id === 'BJnb3X38F'))
//     if (YoutubeVideo?.consent?.status === false) {
//     //   // NOTE: fathom will capture event only in production (site: 'netzo')
//     //   // window?.fathom?.trackGoal('6GGROL1Z', 0)
//       window.uc.blockElements({
//         //     // 'BJz7qNsdj-7': '.video-space', // Show youtube overlay over the element with ID 'custom-container'
//         BJnb3X38F: '.video-space', // Show Adition overlay over the element with class 'another-example'
//       })
//     }
//     else {
//       // window.uc.deactivateBlocking()
//     }
//   })
// })
</script>

<template>
  <div class="video-container">
    <div class="video-space">
      <!-- See: https://docs.usercentrics.com/#/smart-data-protector?id=deactivate-smart-data-protector-for-specific-services
      Youtube videos are detected and blocked automatically by the CMP until consented.No need for the "uc-src" and "text/plain" tags -->
      <iframe
        :src="VIDEO_SOURCE"
        width="560"
        height="315"
        frameborder="0"
        allowfullscreen
        webkitallowfullscreen
        mozallowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  </div>
</template>

<style scoped>
.video-container {
  display: grid;
  place-items: center;
  max-height: 432px;
}

.video-space {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  max-width: 786px;
  max-height: 432px;
}

.video-space:has(> #uc1652097957738) {
  padding: 0 !important;
}

iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 432px;
}
</style>
