<template>
    <section class="hero">
      <div class="hero-text container">
        <EditProfileForm />
      </div>
    </section>
  </template>
  
  <script>
  import EditProfileForm from '@/components/EditProfileForm.vue'
  
  export default {
      name: 'EditProfileView',
      components: {
        EditProfileForm,
      },
  };
  </script>
  
  <style scoped>
  .hero {
    background-attachment: fixed;
    position: relative;
    height: 100vh;
  }
  .hero-text {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: black;
  }
  </style>