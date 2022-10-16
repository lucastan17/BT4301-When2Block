<template>
<div class="text-center section">
    <HeaderBar title="TrackStatus" 
    HeaderBar/>
    <CheckinCalendar
        v-if="mounted"
    CheckinCalendar/>
</div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue';
import CheckinCalendar from '@/components/CheckinCalendar.vue';

export default {
    name: 'TrackView',
    components: { HeaderBar, CheckinCalendar },
    
    data() {
        return {
            dates: [],
            mounted: true,
        }
    },
};
</script>

<style scoped>

</style>