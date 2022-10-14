<template>
    <div>
        <HeaderBar2 title="Survey">
            <!-- TODO: Add logout button -->
            <o-button class="button" @click="logOut">Log Out</o-button>
        </HeaderBar2>
        <br />
        <SurveyItem />
    </div>
</template>
    
<script>
import { userStore } from '../store/store'

import HeaderBar2 from '@/components/HeaderBar2.vue';
import SurveyItem from '@/components/Survey.vue';

export default {
    components: { HeaderBar2, SurveyItem },
    setup() {
        const store = userStore();
        return { store };
    },
    methods: {
        async logOut() {
            await this.store.setToken(null)
            await this.store.setUser(null)

            this.$router.push("/login")
        }
    }
}
</script>
    
<style scoped>
.button {
    background-color: #F16308;
    margin: 15px;
    border-radius: 5px;
    position: absolute;
    right: 10px;
}
</style>
    