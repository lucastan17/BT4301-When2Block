<template>
    <div class="home">
      <HeaderBar title="About Us"/>
    <div class="group-container">
      <div class="group-1">
        <div class="flex-col">
          <div class="container">
            <div class="header1 epilogue-extra-bold-ebony-clay-40px">
              Don't know when <br /> to
              wear&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              ?
            </div>
            <h1 class="header2">Sunscreen</h1>
          </div>
          <div class="content-block">
            Regular daily use of SPF 15 sunscreen can reduce your risk of skin cancer cells by 50%<br />
            <br />but... only 23.9% of people use a sunscreen on a regular basis <br /><br />
            Learn when is the best time to apply sunscreen!
          </div>
        </div>
        <img 
          class="sunscreen-img"
          src="../assets/spf50_sunscreen.png"
          alt="spf50 sunscreen icon"
        />
      </div>
  
      <div class="group-2">
        <div class="overlap-group">
          <h1 class="header3 epilogue-extra-bold-ebony-clay-40px">Search up to 2 hours in advance...</h1>
          <img
            class="search-img"
            src="../assets/search_map.png"
            alt="search map"
          />
          <div class="header3-1 epilogue-extra-bold-ebony-clay-40px">... for any location</div>
        </div>
      </div>
  
      <div class="group-3">
        <div class="flex-row">
          <img
            class="beach-img"
            src="../assets/beach_img.png"
            alt="beach icon"
          />
          <div class="flex-col-2">
            <h1 class="header4">
              <span style="color:rgba(240, 167, 59, 1)">Check-in <br /></span>
              <span class="epilogue-extra-bold-ebony-clay-40px">everytime you wear sunscreen to track your skin care 
              journey &amp; win prizes</span> 
            </h1>
            <div class="button-div">
                <o-button class="button" @click="checkin">Check In Today!</o-button>
            </div>
          </div>
        </div>
        <div class="header5 epilogue-extra-bold-ebony-clay-40px">How do we decide whether to apply sunblock?</div>
        <div class="content-block-2">
          Using the Ultra-Violet Index (UVI) and Weather Forecase data from National Environment Agency (NEA), we employ
          the use of machine learning models to predict the UVI over the next 2 hours. A forecasted UVI value of over 5 
          would indicate strong UV rays and combined with little cloud cover, creates a pressing need for sunscreen.
        </div>
      </div>
    </div>
    </div>
    
  </template>
  
  <script>
  // @ is an alias to /src
  import HeaderBar from '@/components/HeaderBar.vue';
  
  export default {
    name: 'AboutPage',
    components: {
      HeaderBar
    },
    methods: {
      checkin() {
        this.$router.push({ name: "track" })
      }
    }
  }
  </script>
  
  <style scoped>
  .epilogue-extra-bold-ebony-clay-40px {
    font-family: var(--font-family-epilogue);
    font-weight: 800;
    color: ebony-clay;
    font-size: 40px;
    font-style: normal;
  }
  
  .group-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 69px 113px;
  }
  
  .group-1 {
    align-items: center;
    display: flex;
    gap: 29px;
    min-width: 1024px;
  }
  
  .flex-col {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 27px;
    margin-top: 1px;
    min-height: 351px;
    width: 570px;
  }
  
  .container {
    height: 97px;
    position: relative;
    width: 503px;
  }
  
  .header1 {
    left: 0;
    letter-spacing: 0;
    position: absolute;
    top: 0;
    line-height: 48px;
    min-height: 97px;
    width: 503px;
    text-align: justify;
  }
  
  .header2 {
    color: rgba(240, 167, 59, 1);
    font-family: var(--font-family-epilogue);
    font-size: 44px;
    font-weight: 800;
    left: 156px;
    letter-spacing: 0;
    line-height: 48px;
    position: absolute;
    top: 17px;
    white-space: nowrap;
    width: 307px;
    text-align: start;
  }
  
  .content-block {
    color: black;
    font-family: var(--font-family-epilogue);
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 32px;
    min-height: 227px;
    width: 570px;
    text-align: left;
  }
  
  .sunscreen-img {
    height: 438px;
    object-fit: cover;
    width: 343px;
  }
  
  .group-2 {
    align-items: flex-start;
    display: flex;
    min-width: 1169px;
    margin-top: 4%;
  }
  
  .overlap-group {
    height: 700px;
    position: relative;
    width: 1165px;
  }
  .header3 {
    letter-spacing: 0;
    line-height: 48px;
    position: absolute;
    top: 0;
    width: 800px;
  }
  
  .search-img {
    height: 614px;
    left: 2%;
    object-fit: cover;
    position: absolute;
    top: 89px;
    width: 1115px;
  }
  
  .header3-1 {
    left: 800px;
    letter-spacing: 0;
    line-height: 48px;
    position: absolute;
    top: 630px;
    width: 401px;
  }
  
  .group-3 {
    align-items: center;
    display: flex;
    flex-direction: column;
    min-height: 878px;
    width: 1067px;
    margin-top: 6%;
  }
  
  .flex-row {
    align-items: center;
    display: flex;
    gap: 21px;
    margin-right: 6px;
    min-width: 1061px;
    margin-left: 75px;
  }
  
  .beach-img {
    height: 374px;
    object-fit: cover;
    width: 442px;
  }
  
  .header4 {
    font-family: var(--font-family-epilogue);
    font-size: 46px;
    font-weight: 800;
    letter-spacing: 0;
    line-height: 48px;
    margin-top: 56px;
    min-height: 200px;
    text-align: right;
    width: 628px;
    margin-left: 50px;
  }
  
  .header5 {
    letter-spacing: 0;
    line-height: 48px;
    margin-top: 164px;
    min-height: 64px;
    width: 1092px;
  }
  
  .content-block-2 {
    color: black;
    font-family: var(--font-family-epilogue);
    font-size: 32px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 32px;
    min-height: 218px;
    margin-top: 18px;
    width: 1092px;
    text-align: justify;
    margin-left: 75px;
  }

  .button-div {
    text-align: right;
  }
  
  .button {
      background-color: #F16308;
      margin: 15px;
      right: 5px;
      border-radius: 25px;
      width: 330px;
      height: 72px;
      font-size: 32px;
  }
  
  .flex-col-2 {
    display: flex;
    flex-direction: column;
    align-items: right;
  }
  
  </style>