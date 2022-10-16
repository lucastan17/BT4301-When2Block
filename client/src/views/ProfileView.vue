<template>
    <div class="home">
        <HeaderBar title="Profile">
        </HeaderBar>
        <UserInfo id="info" v-if="!editting && !changingpw" @clicked="onClick"/>
        <EditProfileForm id="editform" v-if="editting" @backed="onBack"/>
        <ChangePassword id="changepw" v-if="changingpw" @backed="onBack"/>
        <br />
    </div>
</template>
  
<script>
import HeaderBar from '@/components/HeaderBar.vue';
import UserInfo from '@/components/UserInfo.vue';
import EditProfileForm from '@/components/EditProfileForm.vue'
import ChangePassword from '@/components/ChangePassword.vue'

export default {
    name: 'ProfileView',
    components: {
        HeaderBar,
        UserInfo,
        EditProfileForm,
        ChangePassword
    },
    data() {
        return {
            editting: false,
            changingpw: false
            }
    },
    methods: {
        onClick (value1, value2) {
            console.log(value1, value2)
            this.editting = value1
            this.changingpw = value2
        },
        onBack(value) {
            console.log(value)
            if (value) {
                this.editting = false
                this.changingpw = false
            }
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
  