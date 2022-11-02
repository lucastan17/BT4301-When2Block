<template>
    <div class="home">
      <imdaPage />
    </div>
    
  </template>
  
  <script>
  // @ is an alias to /src
  import imdaPage from '@/components/imdaPage.vue';
  
  export default {
    name: 'imdaPageView',
    components: {
      imdaPage,
    }
  }
  </script>