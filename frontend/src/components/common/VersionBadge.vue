<template>
  <span v-if="displayVersion" class="text-xs text-gray-500 dark:text-dark-400">
    v{{ displayVersion }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores'

const props = defineProps<{
  version?: string
}>()

const appStore = useAppStore()

const displayVersion = computed(() => props.version || appStore.siteVersion || '')
</script>
