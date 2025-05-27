<template>
  <div class="chartbox_item">
    <div class="c1">
      <div class="gauge-item">
        <div class="txt">
          <div>Running Status</div>
          <el-button type="primary" style="padding: 13px 28px; font-size: 19px">NO</el-button>
          <div>Running Status</div>
          <div style="color: #137415">179.1 H</div>
        </div>
      </div>
    </div>
    <div class="c1">
      <Gauge class="gauge-item" :value="GaugeValue.n1" title="1#Power" :min="0" :max="2000" unit="kW" />
    </div>
    <div class="c1">
      <Gauge
        class="gauge-item"
        :value="GaugeValue.n2"
        title="1#Frequency"
        :min="45"
        :max="55"
        unit="Hz"
        :color="[
          [0.1, `#fd666d`],
          [0.9, `#0c151e`],
          [1, `#fd666d`],
        ]"
      />
    </div>
    <div class="c1">
      <Gauge class="gauge-item" :value="GaugeValue.n3" title="1#Load" :min="0" :max="100" unit="%" />
    </div>

    <div class="c1">
      <Gauge class="gauge-item" :value="GaugeValue.n4" title="1#Speed" :min="0" :max="2500" unit="RPM" />
    </div>

    <div class="c1">
      <Gauge class="gauge-item" :value="GaugeValue.n5" title="Coolant pressure" :min="0" :max="5" unit="Bar" />
    </div>

    <div class="c1">
      <Gauge class="gauge-item" :value="GaugeValue.n6" title="Lube. Oli Pressure" :min="0" :max="8" unit="Bar" />
    </div>

    <div class="c1">
      <Gauge class="gauge-item" :value="GaugeValue.n7" title="Lube. Oli Temp" :min="0" :max="150" unit="℃" />
    </div>

    <!-- <div class="c1">
      <Gauge class="gauge-item" :value="GaugeValue.n8" title="Coolant temperature" :min="0" :max="120" unit="℃" />
    </div> -->
  </div>

  <!-- <el-row :gutter="24">
    <el-col :span="8">
      <div class="gauge-item">
        <div>Running Status</div>
        <el-button type="primary">Primary</el-button>
        <div>Running Status</div>
        <div>179.1 H</div>
      </div>
    </el-col>
    <el-col :span="8">
      <Gauge
        class="gauge-item"
        :value="3"
        :title="$t('SlopeAngle')"
        :min="-5"
        :max="5"
        unit="°"
        :color="[
          [0.1, `#fd666d`],
          [0.9, `#0c151e`],
          [1, `#fd666d`],
        ]"
      />
    </el-col>
    <el-col :span="8">
      <Gauge class="gauge-item" :value="2" :title="`${leg}#${$t('LegSpeed')}`" :min="-2" :max="2" unit="m/min" />
    </el-col>
  </el-row>
  <el-row :gutter="24">
    <el-col :span="8">
      <Gauge
        class="gauge-item"
        :value="3"
        :title="$t('SlopeAngle')"
        :min="-5"
        :max="5"
        unit="°"
        :color="[
          [0.1, `#fd666d`],
          [0.9, `#0c151e`],
          [1, `#fd666d`],
        ]"
      />
    </el-col>
    <el-col :span="8">
      <Gauge
        class="gauge-item"
        :value="3"
        :title="$t('SlopeAngle')"
        :min="-5"
        :max="5"
        unit="°"
        :color="[
          [0.1, `#fd666d`],
          [0.9, `#0c151e`],
          [1, `#fd666d`],
        ]"
      />
    </el-col>
    <el-col :span="8">
      <Gauge class="gauge-item" :value="2" :title="`${leg}#${$t('LegSpeed')}`" :min="-2" :max="2" unit="m/min" />
    </el-col>
  </el-row>
  <el-row :gutter="24">
    <el-col :span="8">
      <Gauge
        class="gauge-item"
        :value="3"
        :title="$t('SlopeAngle')"
        :min="-5"
        :max="5"
        unit="°"
        :color="[
          [0.1, `#fd666d`],
          [0.9, `#0c151e`],
          [1, `#fd666d`],
        ]"
      />
    </el-col>
    <el-col :span="8">
      <Gauge
        class="gauge-item"
        :value="3"
        :title="$t('SlopeAngle')"
        :min="-5"
        :max="5"
        unit="°"
        :color="[
          [0.1, `#fd666d`],
          [0.9, `#0c151e`],
          [1, `#fd666d`],
        ]"
      />
    </el-col>
    <el-col :span="8">
      <Gauge class="gauge-item" :value="2" :title="`${leg}#${$t('LegSpeed')}`" :min="-2" :max="2" unit="m/min" />
    </el-col>
  </el-row> -->
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
      },
    }
  },
  mounted() {
    setInterval(() => {
      this.GaugeValue = {
        n1: Math.floor(Math.random() * (2000 - 0 + 1)) + 0,
        n2: Math.floor(Math.random() * (55 - 45 + 1)) + 45,
        n3: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
        n4: Math.floor(Math.random() * (2500 - 0 + 1)) + 0,
        n5: Math.floor(Math.random() * (5 - 0 + 1)) + 0,
        n6: Math.floor(Math.random() * (8 - 0 + 1)) + 0,
        n7: Math.floor(Math.random() * (150 - 0 + 1)) + 0,
        n8: Math.floor(Math.random() * (120 - 0 + 1)) + 0,
      }
      // this.GaugeValue.n1 = Math.floor(Math.random() * (2000 - 0 + 1)) + 0
    }, 3000)
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.chartbox_item {
  display: flex;
  width: 100%;
  gap: 0.9%;
  overflow: auto;
  height: 100%;
  flex-wrap: wrap;
  // flex: 1 1 0; /* grow | shrink | basis */
  .c1 {
    // flex: 1 1 0; /* grow | shrink | basis */
    height: 250px; /* 设置高度 */
    margin-bottom: 3px;
    border-radius: 3px;
  }

  @media (min-width: 1450px) and (max-width: 2000px) {
    .c1 {
      width: calc(33.333% - 10px);
    }
  }
  /* 当屏幕宽度在1300到1450像素之间时，每行显示3个div */
  @media (min-width: 1300px) and (max-width: 1450px) {
    .c1 {
      // flex: calc(50% - 10px);
      width: calc(50% - 10px);
    }
  }
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

  .c1:first-child {
    border: 1px solid rgb(14, 93, 13);
  }
}
.gauge-item {
  width: 100%;
  position: relative;
  aspect-ratio: 1/1;
}
</style>
