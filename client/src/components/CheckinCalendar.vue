<template>

  <div class="parent">
    <div id="title-row">
      <h3> Check in with us if you applied sunblock today!</h3>
    </div>
    <div class="float-child-left">
      <div class="container">
        <h2 class="h2" style="margin: 5px 0px 5px 0px;">Your Sunblock Journey</h2>
      </div>
      <Calendar class="custom-calendar max-w-full" firstDayOfWeek=2 :masks="masks" :attributes="attributes"
        disable-page-swipe is-expanded v-if="loaded">

        <template v-slot:day-content="{ day, attributes }">
          <div class="flex">
            <span class="day-label">{{ day.day }}</span>
            <div class="checked-in">
              <i v-for="attr in attributes" :key=attr>
                <img alt="Checked in" src="../assets/sunblock.png" style="width:20px;height:25px" />
              </i>
            </div>
          </div>
        </template>
      </Calendar>
      <button @click="checkin" expanded class="button" v-bind:disabled="checkedin">CHECK IN</button>
    </div>
    <div class="float-child-right">
      <div class="container">
        <h2 class="h2" style="margin: 5px 0px 5px 0px;">Your Sunblock Summary</h2>
      </div>
      <h3 class=" h3"> {{ total }} </h3>
      <h4 class="h4"> days </h4>
      <p>total sunblock checks-in</p>
      <div>
        <img alt="Checked in" src="../assets/man.png" style="width:100px;height:100px" />
      </div>
      <div>
        <b>Joined since {{ joined }}</b>
      </div>


    </div>
  </div>
</template>
  
<script>
import { Calendar } from 'v-calendar';
import { userStore } from '@/store/store'
import CheckInService from '@/services/checkInService'

export default {
  name: 'CheckinCalendar',
  components: { Calendar },
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
      total: 0,
      joined: this.store.user.createdAt.slice(0, 10).replace('T', ' '),
      masks: {
        weekdays: 'WWW',
      },
      attributes: [],
    };
  },
  methods: {
    async checkin() {
      alert("Checked in for today")
      const today = new Date().toISOString().slice(0, 10).replace('T', ' ');
      window.location.reload()
      await this.store.setCheckedin()
      try {
        const r = await CheckInService.checkin({
          id: this.user_id,
          date: today
        })
        console.log(r.data)
        this.attributes.push({
          key: 'today',
          bar: 'orange',
          dates: new Date()
        })
      } catch (err) {
        console.log(err)
      }

    }
  },
  async created() {
    this.attributes = []
    this.checkedin = this.store.checkedin
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
        console.log(new Date().toISOString().slice(0, 10).replace('T', ' '))
      }
      this.total = this.attributes.length
    } catch (err) {
      console.log(err)
    }
  }


};
</script>
  
<style scoped>
::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  display: none;
}

button {
  margin: 10px;
  margin-top: 10px;
  background-color: #F16308;
  border: none;
  color: black;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
}

button:hover {
  background: #ffcc00;
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

.day-label {
  display: inline-block;
  padding: 5px 5px;
}

.checked-in {
  display: inline-block;
  padding: 5px 5px;
  vertical-align: -10px;
}

.h2 {
  color: white;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 0;
}

.h3 {
  font-size: 80px;
  font-weight: 700;
  color: #ffc400;
  margin: 40px 30px 10px 30px;
}

.h4 {
  font-size: 30px;
  font-weight: 700;
  color: #666;
  margin: 0px 30px 5px 30px;
}

#title-row {
  text-align: center;
}

.container {
  font-family: var(--font-family-epilogue);
  background-color: #F16308;
  width: 100%;
  border-radius: 20px;
  margin: 0px 0px 20px 0px;
  border: 1px solid black;
}

.parent {
  height: 450px;
  margin: 50px 0px 0px 0px;
}


.float-child-left {
  width: 58%;
  height: 105%;
  border-radius: 20px;
  margin: 20px;
  float: left;
  background-color: white;
  position: relative;
  border: 1px solid black;
  border-top: none;
}

.float-child-right {
  width: 35%;
  height: 105%;
  border-radius: 20px;
  margin: 20px;
  float: left;
  background-color: white;
  position: relative;
  border: 1px solid black;
  border-top: none;
}
</style>