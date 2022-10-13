<template>
    <div class="home">
        <HeaderBar title="Profile">
        </HeaderBar>
        <UserInfo id="info" v-if="mounted" :user="user" @clicked="onClickEdit"/>
        <EditProfileForm id="editform" v-if="editting" />
        <br />
    </div>
</template>
  
<script>
import HeaderBar from '@/components/HeaderBar.vue';
import UserInfo from '@/components/UserInfo.vue';
import EditProfileForm from '@/components/EditProfileForm.vue'

export default {
    name: 'ProfileView',
    components: {
        HeaderBar,
        UserInfo,
        EditProfileForm
    },
    data() {
        return {
        user: {
            user: null,
            mounted: false,
        },
        mounted: true,
        editting: false
        }
    },
    methods: {
        onClickEdit (value) {
            this.editting = value
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
  