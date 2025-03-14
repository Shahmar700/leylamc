<template>
    <div class="doctor-card skeleton-card relative overflow-hidden">
      <!-- Skeleton şəkil -->
      <div class="skeleton-image"></div>
      
      <!-- Skeleton mətn -->
      <div class="mt-3 space-y-3">
        <div class="skeleton-title"></div>
        <div class="skeleton-position"></div>
      </div>
      
      <!-- Şüa effekti -->
      <div class="skeleton-shine"></div>
    </div>
  </template>
  
  <style scoped>
  .doctor-card {
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    height: 100%;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  
  .skeleton-card {
    background-color: #f8f8f8;
  }
  
  .skeleton-image {
    width: 100%;
    height: 260px;
    background-color: #e0e0e0;
    border-radius: 0.375rem;
  }
  
  .skeleton-title {
    height: 28px;
    background-color: #e0e0e0;
    border-radius: 4px;
    width: 90%;
  }
  
  .skeleton-position {
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 3px;
    width: 70%;
  }
  
  /* Şüa effekti */
  .skeleton-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: shine 1.7s infinite linear;
  }
  
  @keyframes shine {
    to {
      left: 150%;
    }
  }
  </style>