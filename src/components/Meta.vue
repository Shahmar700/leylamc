<template>
    <div>
      <meta v-for="(content, name) in metaTags" :key="name" :name="name" :content="content" />
      <title>{{ title }}</title>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SeoMeta',
    props: {
      title: {
        type: String,
        required: true
      },
      metaTags: {
        type: Object,
        required: true
      }
    }
  }
  </script>