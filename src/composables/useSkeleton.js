import { ref } from 'vue';

export function useSkeleton(delay = 300) {
  const loading = ref(true);
  const showSkeleton = ref(false);
  let skeletonTimer;

  const startLoading = () => {
    loading.value = true;
    
    // Əvvəlki taymeri təmizlə
    clearTimeout(skeletonTimer);
    
    // Yeni taymer başlat
    skeletonTimer = setTimeout(() => {
      if (loading.value) { // Hələ yüklənmə davam edirsə
        showSkeleton.value = true;
      }
    }, delay);
  };

  const stopLoading = () => {
    loading.value = false;
    showSkeleton.value = false;
    clearTimeout(skeletonTimer);
  };

  const cleanupSkeleton = () => {
    clearTimeout(skeletonTimer);
  };

  return {
    loading,
    showSkeleton,
    startLoading,
    stopLoading,
    cleanupSkeleton
  };
}