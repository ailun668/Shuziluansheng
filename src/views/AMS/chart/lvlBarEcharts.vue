<template>
  <div class="chart-body" ref="chart" :id="id"></div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: 'chart',
    },
    value: {
      type: Number,
      default: 0,
    },
    fieldValue: {
      type: [String, Number],
      default: 0,
    },
    xData: {
      type: String,
      default: '',
    },
    isShowXAxis: {
      type: Boolean,
      default: true,
    },
    max: {
      type: Number,
      default: 100,
    },
    capacity: {
      type: Object,
      default: () => { },
    },
    itemparmts: {
      type: Object,
      default: () => { },
    }
  },
  watch: {
    value: {
      handler(val) {
        this.initChart()
      },
    },
    fieldValue: {
      handler(val) {
        this.initChart()
      },
    },
    capacity: {
      handler(val) {
        this.initChart()
      },
      deep: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      const option = {
        grid: {
          top: '25%',
          bottom: '5%',
          right: '60%',
        },
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          data: [this.xData],
          axisTick: {
            show: false,
          },
          show: this.isShowXAxis,
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false,
          },
          splitLine: { show: false },
          max: this.max,
          axisLabel: {
            show: false,
          },
        },
        series: [
          {
            type: 'bar',
            data: [this.value > 0 ? this.value : 0],
            showBackground: true,
            z: -1, // 将背景柱子置于底层
            barWidth: 35,
            itemStyle: {
              color: '#fff',
            },
          },
        ],
        graphic: [
          {
            type: 'text',
            left: '45%',
            top: '45%',
            style: {
              text: '',
              fill: '#fff',
              fontSize: 13,
              lineHeight: 16,
              padding: [2, 10, 2, 2],
              width: 60,
              height: 50,
              borderRadius: 3,
              borderWidth: 2,
              borderColor: 'rgba(66, 64, 82, 0.60)',
              rich: {
                capacity: {
                  color: '#fff',
                },
              },
            },
          },
        ],
      };
      this.chart.setOption(option);
      this.updateGraphicLabel();
    },

    updateGraphicLabel() {
      const capacityValue = this.capacity?.fieldValue == '###' ? '###' : Number(this.capacity?.fieldValue).toFixed(2);
      const fieldValue = this.fieldValue == '###' ? '###' : Number(this.fieldValue).toFixed(2);
      const precentValue = (this.value == ('###') || this.value == (undefined) || this.value == (null)) ? '###' : Number(this.value).toFixed(2);
      const textContent = `{capacity|${(capacityValue)} ${this.capacity?.unit || ''}}\n${fieldValue} ${this.itemparmts.unit || ''}\n${(precentValue)} %`;

      this.chart.setOption({
        graphic: [
          {
            type: 'text',
            left: '45%',
            top: '45%',
            style: {
              text: textContent,
            },
          },
        ],
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.initChart()
    })
  },
  beforeUnmount() {
    this.chart?.dispose()
  },
}
</script>
<style scoped lang="scss">
.chart-body {
  width: 100%;
  height: 100%;
}
</style>
