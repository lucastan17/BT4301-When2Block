<template>
    <div class="text-center section">
      <h2 class="h2">Your Sunblock Journey</h2>
      <p class="text-lg font-medium text-gray-600 mb-6">
        Check in with us if you use sunblock today!
      </p>
      <o-button @click="checkin" expanded class="button">CHECK IN</o-button>
      <div class="float-child-left">
        <Calendar
          class="custom-calendar max-w-full"
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
//import checkInService from '@/services/checkInService';

  // async function getDates(user) {
  //   var dates = []
  //   try {
  //     var { data } = await checkInService.index(email);
  //     dates.push()
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  //   return dates
  // };

  export default {
    name: 'CheckinCalendar',
    components: {Calendar},
    data() {
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      //const attributes = [];
      return {
        masks: {
          weekdays: 'WWW',
        },
        attributes: [
          {
            dates: new Date(year, month, 1),
          },
          {
            dates: new Date(year, month, 2),
          },
          {
            dates: new Date(year, month, 5),
          },
          {
            dates: new Date(year, month, 7),
          },
          {
            key: 'today',
            highlight: "orange",
            dates: new Date(),
          }
        ],
      };
    },
    // created() {
    //   getDates(this.user.email).then((x) => {
    //     for (var i = 0; i < x.length; i++) {
    //       this.attributes.push({
    //         dates: new Date(year, month, x[i]),
    //       });
    //     }
    //   }) 
    // }
    

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