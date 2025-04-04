<template>
    <div class="skeleton-loader">
      <!-- Ana konteyner -->
      <div class="flex flex-col md:flex-row md:items-start sm:justify-between">
        <!-- Əsas məzmun bölməsi -->
        <div class="w-full" :class="{ 'sm:w-3/4': showSidebar }">
          <!-- Başlıq skeleti -->
          <div class="h-10 bg-gray-200 rounded w-3/4 mb-10 animate-pulse"></div>
          
          <!-- Məzmun skeleti -->
          <div class="space-y-4">
            <div v-for="i in contentLines" :key="i" 
                 class="h-4 bg-gray-200 rounded animate-pulse"
                 :class="getRandomWidth()"></div>
          </div>
          
          <!-- Link skeleti (lazım olsa) -->
          <div v-if="showLink" class="mt-6">
            <div class="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
          </div>
  
          <!-- Əlavə elementlər -->
          <slot name="additional-content"></slot>
        </div>
        
        <!-- Sidebar bölməsi -->
        <div v-if="showSidebar" class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0 flex flex-col items-center">
          <div v-for="i in sidebarItems" :key="`sidebar-${i}`" 
               class="bg-gray-200 rounded w-full animate-pulse mb-4"
               :class="{ 'h-40': true }"></div>
          <slot name="sidebar"></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    // Məzmunda neçə sətir göstərilməsi
    contentLines: {
      type: Number,
      default: 5
    },
    // Link/button göstərilməsi
    showLink: {
      type: Boolean,
      default: false
    },
    // Sidebar göstərilməsi
    showSidebar: {
      type: Boolean,
      default: true
    },
    // Sidebar-da neçə element göstərilməsi
    sidebarItems: {
      type: Number,
      default: 2
    }
  });
  
  // Təsadüfi genişliklər generasiya etmək
  const getRandomWidth = () => {
    const widths = ['w-full', 'w-[90%]', 'w-[95%]', 'w-[85%]', 'w-[80%]'];
    return widths[Math.floor(Math.random() * widths.length)];
  };
  </script>