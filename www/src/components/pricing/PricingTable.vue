<script setup lang="ts">
import ButtonCta from '@theme/components/buttons/ButtonCta.vue'
import Tooltip from '@theme/components/Tooltip.vue'
import type { Pricing } from './types'

const {
  plans,
  items,
} = defineProps<Pricing>()
</script>

<template>
  <section>
    <div class="container">
      <div class="grid-container">
        <div class="grid-column">
          <div class="grid-header !justify-start bg-[var(--vp-c-white)] dark:bg-[var(--vp-c-black)]" />
          <template v-for="(item, i) in items" :key="`pricing-table-items-1-${i}`">
            <div v-if="item.type === 'subheader'" class="grid-subheader">
              {{ item.title }}
              <Tooltip v-if="item.description">
                {{ item.description }}
              </Tooltip>
            </div>
            <div v-else class="grid-cell !justify-start">
              {{ item.title }}
              <Tooltip v-if="item.description">
                {{ item.description }}
              </Tooltip>
            </div>
          </template>
        </div>

        <div class="grid-column plan-business">
          <div class="grid-header bg-[var(--vp-c-white)] dark:bg-[var(--vp-c-black)]">
            {{ plans.business.title }}
            <div class="price">
              {{ plans.business.price }}
              <div v-if="plans.business.unit" class="pt-2 text-base">
                {{ plans.business.unit }}
              </div>
            </div>
            <div>
              <ButtonCta :button="plans.business.button" />
            </div>
          </div>

          <template v-for="(item, i) in items" :key="`pricing-table-items-2-${i}`">
            <!-- <div v-if="item.type === 'subheader'" class="grid-subheader" /> -->
            <div class="grid-cell">
              <span v-if="typeof item.business === 'string'" v-html="item.business" />
              <div v-else v-bind="item.business" />
            </div>
          </template>

          <div class="grid-cell-action">
            <ButtonCta :button="plans.business.button" />
          </div>
        </div>

        <div class="grid-column plan-enterprise">
          <div class="grid-header bg-[var(--vp-c-white)] dark:bg-[var(--vp-c-black)]">
            {{ plans.enterprise.title }}
            <div class="price">
              {{ plans.enterprise.price }}
              <div v-if="plans.enterprise.unit" class="pt-2 text-base">
                {{ plans.enterprise.unit }}
              </div>
            </div>
            <div>
              <ButtonCta :button="plans.enterprise.button" />
            </div>
          </div>

          <template v-for="(item, i) in items" :key="`pricing-table-items-3-${i}`">
            <!-- <div v-if="item.type === 'subheader'" class="grid-subheader" /> -->
            <div class="grid-cell">
              <span v-if="typeof item.enterprise === 'string'" v-html="item.enterprise" />
              <div v-else v-bind="item.enterprise" />
            </div>
          </template>

          <div class="grid-cell-action">
            <ButtonCta :button="plans.enterprise.button" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --border-radius: 4px;
  --border-width-business: 4px;
  --border-width-enterprise: 2px;

  padding: 82px 0px;
  margin: 0 auto;
  height: 100%;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0px 16px;
  height: 100%;
}

.grid-column {
  min-width: 220px;
  height: 100%;
  border-radius: var(--border-radius);
}

.grid-header {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 12px;
  height: 220px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  /* sticky */
  position: sticky;
  top: var(--vp-nav-height);
  z-index: 1;
}

.grid-header .price {
  font-size: 38px;
  font-weight: 400;
  color: var(--vp-c-gray);
  height: 60px;
}

.grid-subheader {
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 18px;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.01);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.dark .grid-subheader {
  background-color: rgba(255, 255, 255, 0.01);
}

.grid-cell {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
}

.grid-subheader,
.grid-cell {
  min-height: 48px;
  padding: 12px;
}

.grid-cell-action {
  padding: 24px;
}

/* plans */

.plan-business {
  border: var(--border-width-business) solid var(--vp-c-primary);
  border-top: none;
}

.plan-business .grid-header {
  border-top: var(--border-width-business) solid var(--vp-c-primary);
}

.plan-enterprise {
  border: var(--border-width-enterprise) solid var(--vp-c-text-1);
  border-top: none;
}

.plan-enterprise .grid-header {
  border-top: var(--border-width-enterprise) solid var(--vp-c-text-1);
}

.i-mdi-check,

.i-mdi-close,
.i-mdi-clock-outline {
  margin: auto;
}

.i-mdi-check {
  background: #44c47d;
}
</style>
