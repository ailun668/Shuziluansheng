<template>
  <div class="amschartbox">
    <h1> (Real-Time Data):  {{ GaugeValue.n9 }} Hz</h1>
    <div class="chartbox_item">
      <div class="c1">
        <Gauge2 class="gauge-item" :value="GaugeValue.n1" title="U相电压" :min="0" :max="400" unit="V" />
      </div>
      <div class="c1">
        <Gauge2 class="gauge-item" :value="GaugeValue.n2" title="V相电压" :min="0" :max="400" unit="V" />
      </div>
      <div class="c1">
        <Gauge2 class="gauge-item" :value="GaugeValue.n3" title="W相电压" :min="0" :max="400" unit="V" />
      </div>

      <div class="c1">
        <Gauge2 class="gauge-item" :value="GaugeValue.n4" title="U相电流" :min="0" :max="4000" unit="A" />
      </div>

      <div class="c1">
        <Gauge2 class="gauge-item" :value="GaugeValue.n5" title="V相电流" :min="0" :max="4000" unit="A" />
      </div>

      <div class="c1">
        <Gauge2 class="gauge-item" :value="GaugeValue.n6" title="W相电流" :min="0" :max="4000" unit="A" />
      </div>

      <div class="c1">
        <Gauge2 class="gauge-item" :value="GaugeValue.n7" title="1相功率" :min="0" :max="3000" unit="W" />
      </div>
      <div class="c1">
        <Gauge2 class="gauge-item" :value="GaugeValue.n8" title="1相功率因素" :min="0" :max="1" unit="VA" />
      </div>

      <!-- <div class="c1">
        <Gauge class="gauge-item" :value="GaugeValue.n9" title="频率" :min="0" :max="100" unit="Hz" />
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'chartbox',
  data() {
    return {
      GaugeValue: {
        n1: 12,
        n2: 12,
        n3: 12,
        n4: 12,
        n5: 12,
        n6: 12,
        n7: 12,
        n8: 12,
        n9: 12,
      },
    }
  },
  mounted() {
    let width = window.innerWidth
    let heigh = window.innerHeight

    //  alert(width,"=====ppp");
    //  alert(heigh);

    setInterval(() => {
      this.GaugeValue = {
        n1: Math.floor(Math.random() * (400 - 0 + 1)) + 0,
        n2: Math.floor(Math.random() * (400 - 45 + 1)) + 45,
        n3: Math.floor(Math.random() * (400 - 0 + 1)) + 0,
        n4: Math.floor(Math.random() * (4000 - 0 + 1)) + 0,
        n5: Math.floor(Math.random() * (4000 - 0 + 1)) + 0,
        n6: Math.floor(Math.random() * (4000 - 0 + 1)) + 0,
        n7: Math.floor(Math.random() * (3000 - 0 + 1)) + 0,
        n8: Math.floor(Math.random() * (1 - 0 + 1)) + 0,
        n9: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
      }
      // this.GaugeValue.n1 = Math.floor(Math.random() * (2000 - 0 + 1)) + 0
    }, 3000)
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.amschartbox {
  width: 100%;
  height: 100%;

  h1 {
    font-size: 20px;
    padding: 8px 20px;
    color: #ffff;
  }
}

.chartbox_item {
  display: flex;
  width: 100%;
  height: 89%;
  overflow: auto;
  flex-wrap: wrap;
  padding-bottom: 60px;
  background: #a2a8b1;

  .c1 {
    height: calc(100% / 2);
    width: calc(24%);
    margin-right: 10px;
  }

  /* .c1 {
    
    height: calc(100% / 2); 
    border-radius: 3px; 
  }

  @media (min-width: 1450px) and (max-width: 2000px) {
    .c1 {
      width: calc(100% / 4);
    }
  }
  @media (min-width: 2000px) and (max-width: 5000px) {
    .c1 {
      width: calc(100% / 4);
    }
  }
   
  @media (min-width: 1300px) and (max-width: 1450px) {
    .c1 {
      width: calc(100% / 4) ;
    }
  }*/

  .txt {
    font-size: 19px;
    padding: 10px 0px 0 10px;

    > * {
      vertical-align: middle;
    }

    > *:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}

.gauge-item {
  width: 100%;
  height: 100%;
  position: relative;
  // aspect-ratio: 1/1;
}
</style>
