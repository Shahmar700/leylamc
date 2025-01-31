<template>
  <div class="bg-gray-100 p-3 rounded-md w-full">
    <nav v-if="breadcrumbs.length" class="container">
      <ol class="list-reset flex text-grey-dark">
        <li class="flex items-center">
          <router-link to="/" class="text-blue-600 hover:text-blue-800">
            <i class="fa-solid fa-house"></i>
          </router-link>
          <span v-if="breadcrumbs.length" class="mx-2">/</span>
        </li>
        <li v-for="(breadcrumb, index) in breadcrumbs" :key="index" class="flex items-center">
          <router-link
            v-if="index < breadcrumbs.length - 1"
            :to="breadcrumb.path"
            class="text-blue-600 hover:text-blue-800"
          >
            {{ breadcrumb.meta.breadcrumb }}
          </router-link>
          <span v-else class="text-gray-500">
            {{ breadcrumb.meta.breadcrumb }}
          </span>
          <span v-if="index < breadcrumbs.length - 1" class="mx-2">/</span>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  const matched = route.matched.filter(r => r.meta && r.meta.breadcrumb)
  return matched.map((r, index) => {
    const pathArray = matched.slice(0, index + 1).map(m => m.path.replace(/^\//, '')).join('/')
    return {
      path: `/${pathArray}`,
      meta: r.meta
    }
  })
})
</script>

<style scoped>
/* Mövcud stil qaydaları */
</style>