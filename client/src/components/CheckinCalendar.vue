<template>
    <div class="text-center section">
      <h2 class="h2">Your Sunblock Journey</h2>
      <p v-if="loaded">
        Check in with us if you use sunblock today!
      </p>
      <o-button @click="checkin" expanded class="button">CHECK IN</o-button>
      <div class="float-child-left">
        <Calendar
          class="custom-calendar max-w-full"
          :columns="$screens({ lg: 2 }, 1)"
          :masks="masks"
          :attributes="attributes"
          disable-page-swipe
          is-expanded
        >
          <template v-slot:day-content="{ day, attributes }">
            <div class="flex">
              <span class="day-label">{{ day.day }}</span>
              <div class="checked-in">
                <i
                  v-for="attr in attributes"
                  :key=attr
                >
                  <img alt="Checked in" src="../assets/sunblock.png" style="width:20px;height:25px"/>
              </i>
              </div>
            </div>
          </template>
        </Calendar>
      </div>
      <div class="float-child-left">
        <h2 class="h2">Your Sunblock Journey</h2>
      </div>
    </div>
  </template>
  
  <script>
import { Calendar } from 'v-calendar';
import { userStore } from '@/store/store'
import CheckInService from '@/services/checkInService'

  export default {
    name: 'CheckinCalendar',
    components: {Calendar},
    setup() {
        const store = userStore();
        return { store };
    },
    data() {
      //const attributes = [];
      return {
        loaded: false,
        user_id: this.store.user.user_id,
        masks: {
          weekdays: 'WWW',
        },
        attributes: [],
      };
    },
    methods: {
      async checkin() {
        const today = new Date().toISOString().slice(0, 19).replace('T', ' ');
        try {
          const r = await CheckInService.checkin({
            id: this.user_id,
            date: today
          })
          console.log(r)
          this.attributes.push({
            dates: new Date(),
          })
          alert("Checked in for today")
        } catch (err) {
          console.log(err)
        }

      }
    },
    async created() {
        try {
            const r = await CheckInService.getdates({
              id: this.user_id
            })
            for (var i = 0; i < r.data.dates.length; i++) {
              this.attributes.push({
                dates: r.data.dates[0].checkin_date})
            }
            this.loaded = true
        } catch (err) {
          console.log(err)
      }
    }
    

  };
  </script>
  
  <style lang="postcss" scoped>
  ::-webkit-scrollbar {
    width: 0px;
  }
  
  ::-webkit-scrollbar-track {
    display: none;
  }
  .button {
    background-color: #F16308;
    border: 0;
}
  .custom-calendar.vc-container {
    --day-border: 1px solid #b8c2cc;
    --day-border-highlight: 1px solid #b8c2cc;
    --day-width: 90px;
    --day-height: 90px;
    --weekday-bg: #f8fafc;
    --weekday-border: 1px solid #eaeaea;
  
    border-radius: 0;
    width: 100%;
  
  }
  .float-child-left {
    width: 50%;
    height: 100%;
    border-radius: 20px;
    float: left;
    padding: 30px 90px 0px 90px;
    background-color: #FCF5E8;
}
.float-child-right {
  width: 50%;
  height: 100%;
  border-radius: 20px;
  float: left;
  margin: 0px;
}
.day-label {
  display: inline-block;
  padding: 5px 5px;
}
 .checked-in {
  display: inline-block;
  padding: 5px 5px;
  vertical-align: -10px;
}
  </style>