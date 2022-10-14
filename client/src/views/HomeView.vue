<template>
  <div class="home">
    <HeaderBar2 />
    <!-- <BoxDisplay title="Hello" actualNumber="300" percentage="60%"></BoxDisplay>
    <UserBehaviourChart></UserBehaviourChart> -->
    <ModelRegister></ModelRegister>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderBar2 from '@/components/HeaderBar2.vue';
// import BoxDisplay from '@/components/BoxDisplay.vue';
// import UserBehaviourChart from '@/components/UserBehaviourChart.vue';
import ModelRegister from '@/components/ModelRegister.vue';


export default {
  name: 'HomeView',
  components: {
    HeaderBar2,
    // BoxDisplay,
    // UserBehaviourChart,
    ModelRegister
}
}
</script>
