---
layout: home
title: Design Kit
---

<script setup>
import locale from '@theme/../../locales/en'
import DesignKit from './design-kit/DesignKit.vue'
import Footer from '@theme/components/Footer.vue'
</script>

<DesignKit />

<!-- <NewsLetter /> -->

<Footer v-bind="locale.footer" />

