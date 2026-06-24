<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-blue-50/60 p-4 dark:bg-dark-950">
    <!-- Background -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-white via-primary-50/55 to-accent-50/70 dark:from-dark-950 dark:via-dark-900 dark:to-dark-950"
    ></div>

    <!-- Brand Visual -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        src="/ails-hero.jpg"
        alt=""
        aria-hidden="true"
        class="absolute inset-y-0 right-0 hidden h-full w-[58vw] object-cover object-center opacity-75 lg:block"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30 dark:from-dark-950 dark:via-dark-950/90 dark:to-dark-950/50"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-blue-50/80 dark:from-dark-950/20 dark:to-dark-950"></div>
      <div
        class="absolute left-[-10rem] top-[-8rem] h-80 w-80 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-900/20"
      ></div>
      <div
        class="absolute bottom-[-10rem] right-[18%] h-96 w-96 rounded-full bg-accent-200/30 blur-3xl dark:bg-accent-900/10"
      ></div>
      <div
        class="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.035)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(96,165,250,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.045)_1px,transparent_1px)]"
      ></div>
    </div>

    <!-- Content Container -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="mb-8 text-center">
        <!-- Custom Logo or Default Logo -->
        <template v-if="settingsLoaded">
          <div
            class="mb-4 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-primary-500/25 ring-1 ring-primary-100 dark:bg-dark-800 dark:ring-primary-900/30"
          >
            <img :src="siteLogo || '/ails-logo.svg'" alt="Logo" class="h-full w-full object-contain" />
          </div>
          <h1 class="text-gradient mb-2 text-3xl font-bold">
            {{ siteName }}
          </h1>
          <p class="text-sm text-gray-500 dark:text-dark-400">
            {{ siteSubtitle }}
          </p>
        </template>
      </div>

      <!-- Card Container -->
      <div class="card-glass rounded-2xl p-8 shadow-glass ring-1 ring-white/50 dark:ring-dark-700/40">
        <slot />
      </div>

      <!-- Footer Links -->
      <div class="mt-6 text-center text-sm">
        <slot name="footer" />
      </div>

      <!-- Copyright -->
      <div class="mt-8 text-center text-xs text-gray-400 dark:text-dark-500">
        &copy; {{ currentYear }} {{ siteName }}. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAppStore } from '@/stores'
import { sanitizeUrl } from '@/utils/url'
import { DEFAULT_SITE_NAME, DEFAULT_SITE_SUBTITLE } from '@/constants/branding'

const appStore = useAppStore()

const siteName = computed(() => appStore.siteName || DEFAULT_SITE_NAME)
const siteLogo = computed(() => sanitizeUrl(appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || DEFAULT_SITE_SUBTITLE)
const settingsLoaded = computed(() => appStore.publicSettingsLoaded)

const currentYear = computed(() => new Date().getFullYear())

onMounted(() => {
  appStore.fetchPublicSettings()
})
</script>

<style scoped>
.text-gradient {
  @apply bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent;
}
</style>
