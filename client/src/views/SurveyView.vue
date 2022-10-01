<template>
    <div>
        <HeaderBar2 title="Survey" />
        <br />
        <SurveyItem />
    </div>
</template>
    
<script>
import HeaderBar2 from '@/components/HeaderBar2.vue';
import SurveyItem from '@/components/Survey.vue';

export default {
    components: { HeaderBar2, SurveyItem }
}
</script>
    
<style scoped>

</style>
    