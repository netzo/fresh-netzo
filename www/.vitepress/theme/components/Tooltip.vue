<template>
  <div class="tooltip my-auto ml-2">
    <slot name="activator">
      <div class="i-mdi-information bg-gray-300 dark:bg-dark-100 text-base" />
    </slot>
    <div class="tooltip-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.tooltip {
  --tooltip-width: 220px;
  position: relative;
  display: inline-block;
}

.tooltip .tooltip-content {
  /* Tooltip text */
  visibility: hidden;
  width: var(--tooltip-width);
  background-color: var(--vp-c-gray-dark-4);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 4px;
  position: absolute;
  font-size: initial;
  font-weight: initial;
    /* Position the tooltip text - see examples below! */
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: calc(-1 * var(--tooltip-width) / 2);
}

.tooltip .tooltip-content::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: var(--vp-c-gray-dark-4) transparent transparent transparent;
}

.tooltip:hover .tooltip-content {
  visibility: visible;
}
</style>
