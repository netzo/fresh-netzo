---
layout: home
title: Blog
description: Updates, tips & opinions from the Netzo team.
---

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vitepress'
import locale from '@theme/../../locales/en'
import Blog from './blog/Blog.vue'
import Footer from '@theme/components/Footer.vue'

const route = useRoute()
const isIndex = computed(() => route.path.replace(/blog.html$/, '') === '/')
const isNotFound = computed(() => route.component === NotFound)
</script>

<Blog />

<!-- <NewsLetter /> -->

<Footer v-bind="locale.footer" />
