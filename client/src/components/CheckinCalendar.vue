<template>
    <div class="text-center section">
      <h2 class="h2">Your Sunblock Journey</h2>
      <p>
        Check in with us if you use sunblock today!
      </p>
      <div class="float-child-left">
        <Calendar
          class="custom-calendar max-w-full"
          firstDayOfWeek=2
          :masks="masks"
          :attributes="attributes"
          disable-page-swipe
          is-expanded
          v-if="loaded"
        >
        
          <template v-slot:day-content="{ day, attributes }">
            <div class="flex">
              <span class="day-label" >{{ day.day }}</span>
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
        <button @click="checkin" expanded class="button" v-bind:disabled="checkedin">CHECK IN</button>
      </div>
      <div class="float-child-left">
        <h2 class="h2">Your Sunblock Summary</h2>
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
        checkedin: false,
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
            key: 'today',
            bar: 'orange',
            dates: new Date()
          })
          await this.store.setUser(this.store.user)
          this.checkedin = true
          alert("Checked in for today")
          this.$router.push("/track")
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
                key: i,
                bar: "orange",
                dates: r.data.dates[i].checkin_date
                })
            }
            this.loaded = true
            for (var x = 0; x < this.attributes.length; x++) {
              console.log(this.attributes[x].dates)
              console.log(new Date().toISOString().slice(0, 19).replace('T', ' '))
            }
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

  button {
    margin: 10px;
    margin-top: 10px;
    background-color: #ffcc00;
    border: none;
    color: black;
    padding: 10px;
    border-radius: 4px;
    font-weight: bold;
  }
  button:hover {
    background: #F16308;
    color: black;
    cursor: pointer;
  }
  button:focus {
    outline: none;
}
button:disabled {
  background: #666;
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