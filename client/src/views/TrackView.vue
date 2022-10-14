<template>
<div class="text-center section">
    <HeaderBar title="TrackStatus" 
    HeaderBar/>
    <CheckinCalendar
        v-if="mounted"
        :user="user"
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
            //user: sessionStorage.getItem("user"),
            mounted: true,
        }
    },
    created() {

    }
};
</script>

<style scoped>

</style>