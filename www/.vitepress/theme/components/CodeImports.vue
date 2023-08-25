<script setup lang="ts">
const { component } = defineProps<{
  component: any
}>()

const imports = {
  '@/': './',
  'netzo/': 'https://deno.land/x/netzo@v0.2.28/',
  '$fresh/': 'https://deno.land/x/fresh@1.4.2/',
  'preact': 'https://esm.sh/preact@10.17.1',
  'preact/': 'https://esm.sh/preact@10.17.1/',
  'preact-render-to-string': 'https://esm.sh/*preact-render-to-string@6.2.1',
  '@preact/signals': 'https://esm.sh/*@preact/signals@1.2.1',
  '@preact/signals-core': 'https://esm.sh/*@preact/signals-core@1.4.0',
  '@radix-ui/react-slot': 'https://esm.sh/@radix-ui/react-slot@latest?external=react,react-dom&target=es2022',
  'class-variance-authority': 'https://esm.sh/class-variance-authority@0.7.0',
}
</script>

<template>
  <pre class="shiki github-dark vp-code-dark">
    {{ imports }}
  </pre>
</template>

<style scoped>
span {
  height: 16px;
  line-height: 16px;
  font-size: 8px;
  font-weight: 700;
  padding: 0px 4px;
  margin-left: 8px;
  border-radius: 4px;
  text-transform: uppercase;
}
</style>
