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
            <div class="flex flex-col h-full z-10 overflow-hidden">
              <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
              <div class="flex-grow overflow-y-auto overflow-x-auto">
                <p
                  v-for="attr in attributes"
                  :key="attr.key"
                >
                  <img alt="Checked in" src="../assets/sunblock.png" style="width:20px;height:30px;"/>
                </p>
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

  export default {
    name: 'CheckinCalendar',
    components: {Calendar},
    data() {
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      return {
        masks: {
          weekdays: 'WWW',
        },
        attributes: [
          {
            key: 1,
            dates: new Date(year, month, 1),
          },
          {
            key: 2,
            dates: new Date(year, month, 2),
          },
          {
            key: 3,
            dates: new Date(year, month, 5),
          },
          {
            key: 4,
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
    //methods: {
    //  async checkedInDates() {
    //    const response = await checkInService.index(email)
    //  }
    //},

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
  /deep/ .custom-calendar.vc-container {
    --day-border: 1px solid #b8c2cc;
    --day-border-highlight: 1px solid #b8c2cc;
    --day-width: 90px;
    --day-height: 90px;
    --weekday-bg: #f8fafc;
    --weekday-border: 1px solid #eaeaea;
  
    border-radius: 0;
    width: 100%;
  
    & .vc-header {
      background-color: #f1f5f8;
      padding: 10px 0;
    }
    & .vc-weeks {
      padding: 0;
    }
    & .vc-weekday {
      background-color: var(--weekday-bg);
      border-bottom: var(--weekday-border);
      border-top: var(--weekday-border);
      padding: 5px 0;
    }
    & .vc-day {
      padding: 0 5px 3px 5px;
      text-align: left;
      height: var(--day-height);
      min-width: var(--day-width);
      background-color: white;
      &.weekday-1,
      &.weekday-7 {
        background-color: #eff8ff;
      }
      &:not(.on-bottom) {
        border-bottom: var(--day-border);
        &.weekday-1 {
          border-bottom: var(--day-border-highlight);
        }
      }
      &:not(.on-right) {
        border-right: var(--day-border);
      }
    }
    & .vc-day-dots {
      margin-bottom: 5px;
    }
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
  </style>