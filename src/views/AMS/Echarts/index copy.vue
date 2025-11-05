<template>
  <!-- isEnumValue: false
isSwitchValue: false -->
  <div class="box">
    <el-row class="layout">
      <el-col :span="8" class="type">
        <el-row class="container">
          <el-col class="h50" :span="14">
            <Render>
              <AirData :data="dataMap.no1_main_air_reservoir_pressure"></AirData>
            </Render>
          </el-col>

          <el-col class="h50" :span="10">
            <Render title="运行时间" :data="main_propulsion_motor_nde_bearing_temperature" @handRange="handRange" type="gauge">
              <hourChart :value="main_propulsion_motor_nde_bearing_temperature.fieldValue" unit="H" />
              <!-- main_propulsion_motor_nde_bearing_temperature.unit -->
              <!-- <Gauge class="chart-comp" :value="main_propulsion_motor_nde_bearing_temperature.fieldValue"
                :data="main_propulsion_motor_nde_bearing_temperature"
                :title="main_propulsion_motor_nde_bearing_temperature.fieldName"
                :min="processing(main_propulsion_motor_nde_bearing_temperature.range)[0] || 0"
                :max="processing(main_propulsion_motor_nde_bearing_temperature.range)[1] || 2000"
                :unit="main_propulsion_motor_nde_bearing_temperature.unit"
                :parmts="main_propulsion_motor_nde_bearing_temperature" :radiusvalue="85" /> -->
            </Render>


          </el-col>
          <el-col class="h50" :span="12">
            <Render title="变频器负载" :data="main_propulsion_motor_nde_bearing_temperature" @handRange="handRange" type="voltage">
              <voltageChart
                class="chart-comp"
                :value="main_propulsion_motor_nde_bearing_temperature.fieldValue"
                :data="main_propulsion_motor_nde_bearing_temperature"
                :unit="main_propulsion_motor_nde_bearing_temperature.unit"
                :options="{
                  min: processing(main_propulsion_motor_nde_bearing_temperature.range)[0] || 0,
                  max: processing(main_propulsion_motor_nde_bearing_temperature.range)[1] || 2000,
                  splitNumber: main_propulsion_motor_nde_bearing_temperature.splitNumber || 4,
                }"
              />
            </Render>
          </el-col>
          <el-col class="h50" :span="12">
            <Render title="变频器电压" :data="main_propulsion_motor_nde_bearing_temperature" @handRange="handRange" type="gauge">
              <Gauge
                class="chart-comp"
                :value="main_propulsion_motor_nde_bearing_temperature.fieldValue"
                :data="main_propulsion_motor_nde_bearing_temperature"
                :min="processing(main_propulsion_motor_nde_bearing_temperature.range)[0] || 0"
                :max="processing(main_propulsion_motor_nde_bearing_temperature.range)[1] || 2000"
                :unit="main_propulsion_motor_nde_bearing_temperature.unit"
                :parmts="main_propulsion_motor_nde_bearing_temperature"
                :size="26"
              />
            </Render>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="16" class="type">
        <el-row class="container">
          <el-col class="h33" :span="6">
            <Render title="速度" :data="speedcomputed" @handRange="handRange" type="rudder">
              <!-- <Gauge class="chart-comp" :value="main_propulsion_rudder_indication.fieldValue"
                :data="main_propulsion_rudder_indication" title="Motor Power"
                :min="processing(main_propulsion_rudder_indication.range)[0] || 0"
                :max="processing(main_propulsion_rudder_indication.range)[1] || 2000"
                :unit="main_propulsion_rudder_indication.unit" :parmts="main_propulsion_rudder_indication"
                :radiusvalue="95" v-if="main_propulsion_rudder_indication" /> -->
              <Speed
                class="chart-comp"
                :value="speed_fieldValue"
                title="speedcomputed"
                :min="processing(speedcomputed.range)[0] || 0"
                :max="processing(speedcomputed.range)[1] || 2200"
                :unit="speedcomputed.unit"
                :parmts="speedcomputed"
                :radiusvalue="speedcomputed.radiusvalue || 85"
                :fontSize="speedcomputed.fontSize"
                :isInteger="speedcomputed.isInteger"
              ></Speed>
            </Render>
          </el-col>
          <el-col class="h33" :span="6">
            
            <Render title="变频器转速" :data="main_propulsion_vfd_rpm_indication" @handRange="handRange" type="voltage">
              <voltageChart
                class="chart-comp"
                :value="main_propulsion_vfd_rpm_indication.fieldValue"
                :data="main_propulsion_vfd_rpm_indication"
                :unit="main_propulsion_vfd_rpm_indication.unit"
                :options="{
                  min: processing(main_propulsion_vfd_rpm_indication.range)[0] || 0,
                  max: processing(main_propulsion_vfd_rpm_indication.range)[1] || 2000,
                  splitNumber: main_propulsion_vfd_rpm_indication.splitNumber || 4,
                }"
              />
            </Render>
          </el-col>
          <el-col class="h33" :span="6">
            <Render title="电机  绕组温度" :data="main_propulsion_motor_nde_bearing_temperature" @handRange="handRange" type="gauge">
              <pressure
                class="chart-comp"
                :value="main_propulsion_motor_nde_bearing_temperature.fieldValue"
                :data="main_propulsion_motor_nde_bearing_temperature"
                :title="main_propulsion_motor_nde_bearing_temperature.fieldName"
                :min="processing(main_propulsion_motor_nde_bearing_temperature.range)[0] || 0"
                :max="processing(main_propulsion_motor_nde_bearing_temperature.range)[1] || 2000"
                :unit="main_propulsion_motor_nde_bearing_temperature.unit"
                :parmts="main_propulsion_motor_nde_bearing_temperature"
                :radiusvalue="85"
              />
            </Render>
          </el-col>
          <el-col class="h33" :span="6">
            <Render title="变频器电流" :data="main_propulsion_motor_nde_bearing_temperature" @handRange="handRange" type="voltage">
              <voltageChart
                class="chart-comp"
                :value="main_propulsion_motor_nde_bearing_temperature.fieldValue"
                :data="main_propulsion_motor_nde_bearing_temperature"
                :unit="main_propulsion_motor_nde_bearing_temperature.unit"
                :options="{
                  min: processing(main_propulsion_motor_nde_bearing_temperature.range)[0] || 0,
                  max: processing(main_propulsion_motor_nde_bearing_temperature.range)[1] || 2000,
                  splitNumber: main_propulsion_motor_nde_bearing_temperature.splitNumber || 4,
                }"
              />
            </Render>
          </el-col>
          <!-- 第二层 ************* -->
          <el-col class="h33" :span="6">
            <!-- 08009 -->
            <!-- <Render title="Rudder" :data="main_propulsion_motor_nde_bearing_temperature" @handRange="handRange"
              type="gauge">
              <Rudder :value="item.data.fieldValue" :unit="item.data.unit" :data="item.data" /> 
            </Render> -->

            <Render :title="rendder.title" :data="rendder.data" @handRange="handRange" type="rudder">
              <Rudder :value="rendder.data.fieldValue" :unit="rendder.data.unit" :data="rendder.data" />
            </Render>
          </el-col>

          <el-col class="h33" :span="6">
            <!-- 08012 -->
            <Render title="变频器扭矩" :data="main_propulsion_motor_nde_bearing_temperature" @handRange="handRange" type="gauge">
              <Rudder1
                class="chart-comp"
                :value="main_propulsion_motor_nde_bearing_temperature.fieldValue"
                :data="main_propulsion_motor_nde_bearing_temperature"
                :title="main_propulsion_motor_nde_bearing_temperature.fieldName"
                :min="processing(main_propulsion_motor_nde_bearing_temperature.range)[0] || 0"
                :max="processing(main_propulsion_motor_nde_bearing_temperature.range)[1] || 2000"
                :unit="main_propulsion_motor_nde_bearing_temperature.unit"
                :parmts="main_propulsion_motor_nde_bearing_temperature"
                :radiusvalue="85"
              />
            </Render>
          </el-col>
          <el-col class="h33" :span="6">
            <!-- 08013 -->
            <!-- <Render title="Fresh Water Tank 1P" :data="cabinchartdata" @handRange="handRange" type="gauge">
              <CabinChart :data="cabinchartdata" :value="cabinchartdata.fieldValue" :title="cabinchartdata.title"
                :min="processing(cabinchartdata.range)[0] || 0" :max="processing(cabinchartdata.range)[1] || 2000"
                :unit="cabinchartdata.unit" :options="cabinchartdata.options" />
            </Render> -->

            <Render :title="cabinchartdata.title" :data="cabinchartdata.options" @handRange="handRange" type="cabin">
              <CabinChart
                :data="cabinchartdata.data"
                :value="cabinchartdata.data.fieldValue"
                :title="cabinchartdata.title"
                :min="processing(cabinchartdata.data.range)[0] || 0"
                :max="processing(cabinchartdata.data.range)[1] || 2000"
                :unit="cabinchartdata.data.unit"
                :options="cabinchartdata.options"
              />
            </Render>
          </el-col>

          <el-col class="h33" :span="6">
            <!-- 08014 -->
            <Render title="变频器冷却水" :data="main_propulsion_motor_nde_bearing_temperature" @handRange="handRange" type="gauge">
              <Gauge
                class="chart-comp"
                :value="main_propulsion_motor_nde_bearing_temperature.fieldValue"
                :data="main_propulsion_motor_nde_bearing_temperature"
                :title="main_propulsion_motor_nde_bearing_temperature.fieldName"
                :min="processing(main_propulsion_motor_nde_bearing_temperature.range)[0] || 0"
                :max="processing(main_propulsion_motor_nde_bearing_temperature.range)[1] || 2000"
                :unit="main_propulsion_motor_nde_bearing_temperature.unit"
                :parmts="main_propulsion_motor_nde_bearing_temperature"
                :radiusvalue="85"
              />
            </Render>
          </el-col>

          <el-col class="h33" :span="6">
            <Render title="电机轴承温度" :data="main_propulsion_motor_nde_bearing_temperature" @handRange="handRange" type="gauge">
              <Gauge
                class="chart-comp"
                :value="main_propulsion_motor_nde_bearing_temperature.fieldValue"
                :data="main_propulsion_motor_nde_bearing_temperature"
                :title="main_propulsion_motor_nde_bearing_temperature.fieldName"
                :min="processing(main_propulsion_motor_nde_bearing_temperature.range)[0] || 0"
                :max="processing(main_propulsion_motor_nde_bearing_temperature.range)[1] || 2000"
                :unit="main_propulsion_motor_nde_bearing_temperature.unit"
                :parmts="main_propulsion_motor_nde_bearing_temperature"
                :radiusvalue="85"
              />
            </Render>
          </el-col>
          <el-col class="h33" :span="6">
         <Render :title="lvlBarEchartsData.title" :data="main_propulsion_motor_nde_bearing_temperature" @handRange="handRange"
              type="voltage">
              <lvlBarEcharts
              :id="'chart1'"
              :isShowXAxis="false"
              :value="lvlBarEchartsData.value?.fieldValue"
              :capacity="lvlBarEchartsData.capacity"
              :fieldValue="lvlBarEchartsData.fieldValue"
              :itemparmts="lvlBarEchartsData"
              @click="handRange(lvlBarEchartsData)"
            />
            </Render> 
          </el-col>
          <el-col class="h33" :span="6">
            <!-- <Render title="VFD Current" :data="dataMap.no1_main_air_reservoir_pressure" @handRange="handRange"
              type="voltage"> -->
            <!-- </Render> -->
            <Render title="启动空气压力" :data="main_propulsion_motor_nde_bearing_temperature" @handRange="handRange" type="gauge">
              <numChart
                :value="main_propulsion_motor_nde_bearing_temperature.fieldValue"
                :data="main_propulsion_motor_nde_bearing_temperature"
                :unit="main_propulsion_motor_nde_bearing_temperature.unit"
              />
              <!-- <Gauge class="chart-comp" :value="main_propulsion_motor_nde_bearing_temperature.fieldValue"
                :data="main_propulsion_motor_nde_bearing_temperature"
                :title="main_propulsion_motor_nde_bearing_temperature.fieldName"
                :min="processing(main_propulsion_motor_nde_bearing_temperature.range)[0] || 0"
                :max="processing(main_propulsion_motor_nde_bearing_temperature.range)[1] || 2000"
                :unit="main_propulsion_motor_nde_bearing_temperature.unit"
                :parmts="main_propulsion_motor_nde_bearing_temperature" :radiusvalue="85" /> -->
            </Render>
          </el-col>
          <el-col class="h33" :span="6">
            <Render title="Empty Chart" :data="Rangenull_temperature" @handRange="handRange" type="voltage">
              <voltageChart
                class="chart-comp"
                :value="Rangenull_temperature.fieldValue"
                :data="Rangenull_temperature"
                :unit="Rangenull_temperature.unit"
                :options="{
                  min: processing(Rangenull_temperature.range)[0] || 0,
                  max: processing(Rangenull_temperature.range)[1] || 2000,
                  splitNumber: Rangenull_temperature.splitNumber || 4,
                }"
              />
            </Render>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import numChart from '../chart/numChart.vue'
import AirData from '../chart/airData.vue'
import Speed from '../chart/speed.vue'
import voltageChart from '../chart/voltageChart.vue'
import Rudder from '../chart/rudderChart.vue'
import Rudder1 from '../chart/rudderChart1.vue'
import hourChart from '../chart/hourChart.vue'
import lvlBarEcharts from '../chart/lvlBarEcharts.vue'
import pressure from '../chart/pressure.vue'
import CabinChart from '../chart/cabinChart.vue'
import menuCollapse from '@/store/module/menu'
import Render from '../render.vue'
import { createComputed } from '../common.js'
let props = defineProps({
  singledeviceMap: {
    type: Object,
    default: () => ({}),
  },
})

// const dataMap = computed(() => {
//   return {
//     no1_main_air_reservoir_pressure:

//   }
// })

let dataMap = ref({
  no1_main_air_reservoir_pressure: {
    title: '空气储罐',
    index: 3,
    fieldKey: 'no1_main_air_reservoir_pressure',
    fieldName: 'NO.1 MAIN AIR RESERVOIR PRESSURE',
    unit: 'bar',
    channel: 'B1301',
    itemNo: '20004',
    ioStatus: 'SUCCESS',
    ioAlarmTitleType: 'compressed_air_system_device1#no1_main_air_reservoir_pressure#IOF',
    fieldValue: 39,
    isSwitchValue: false,
    exAlarmType: 'LOW_ALARM',
    analogType: null,
    aiotTypeEnum: 'DOUBLE',
    alarmStatus: 'RELEASED',
    isEnumValue: false,
    valueType: 'Analog',
    enumList: null,
    range: '0,40', 
    splitNumber: 5,
    valueAlarmRangeVo: {
      alarmRanges: [
        {
          isInhibit: true,
          alarmRange: ['30', 30],
          alarmType: 'H-A',
          threshold: '30',
          ruleId: '1b7c890501ca7815',
        },
      ],
    },
    deviceCodeFront: 'compressed_air_system_device1',
  },
  no2_main_air_reservoir_pressure: {
    title: 'NO.2 Main Air Reservoir',
    index: 4,
    fieldKey: 'no2_main_air_reservoir_pressure',
    fieldName: 'NO.2 MAIN AIR RESERVOIR PRESSURE',
    unit: 'bar',
    channel: 'B1302',
    itemNo: '20005',
    ioStatus: 'SUCCESS',
    ioAlarmTitleType: 'compressed_air_system_device1#no2_main_air_reservoir_pressure#IOF',
    fieldValue: 78,
    isSwitchValue: false,
    exAlarmType: 'LOW_ALARM',
    analogType: null,
    aiotTypeEnum: 'DOUBLE',
    alarmStatus: 'RELEASED',
    isEnumValue: false,
    valueType: 'Analog',
    enumList: null,
    range: '0,40',
    splitNumber: 5,
    valueAlarmRangeVo: {
      alarmRanges: [
        {
          isInhibit: true,
          alarmRange: ['33', 40],
          alarmType: 'H-A',
          threshold: '33',
          ruleId: '644ea3c21322968c',
        },
      ],
    },
    deviceCodeFront: 'compressed_air_system_device1',
  },
  daily_air_reservoir_pressure: {
    title: 'Daily Air Reservoir',
    index: 5,
    fieldKey: 'daily_air_reservoir_pressure',
    fieldName: 'DAILY AIR RESERVOIR PRESSURE',
    unit: 'bar',
    channel: 'B1303',
    itemNo: '20006',
    ioStatus: 'SUCCESS',
    ioAlarmTitleType: 'compressed_air_system_device1#daily_air_reservoir_pressure#IOF',
    fieldValue: 4,
    isSwitchValue: false,
    exAlarmType: 'LOW_ALARM',
    analogType: null,
    aiotTypeEnum: 'DOUBLE',
    alarmStatus: 'RELEASED',
    isEnumValue: false,
    valueType: 'Analog',
    enumList: null,
    range: '0,16',
    splitNumber: 5,
    valueAlarmRangeVo: {
      alarmRanges: [
        {
          isInhibit: true,
          alarmRange: ['11', 16],
          alarmType: 'H-A',
          threshold: '11',
          ruleId: '9f82bc8afbc49c99',
        },
      ],
    },
    deviceCodeFront: 'compressed_air_system_device1',
  },
  no1_main_deck_air_reservoir_pressure: {
    title: 'NO.1 Main Deck Air Reservoir',
    index: 8,
    fieldKey: 'no1_main_deck_air_reservoir_pressure',
    fieldName: 'NO.1 MAIN DECK AIR RESERVOIR PRESSURE',
    unit: 'bar',
    channel: 'A0805',
    itemNo: '20009',
    ioStatus: 'SUCCESS',
    ioAlarmTitleType: 'compressed_air_system_device1#no1_main_deck_air_reservoir_pressure#IOF',
    fieldValue: 7,
    isSwitchValue: false,
    exAlarmType: 'LOW_ALARM',
    analogType: null,
    aiotTypeEnum: 'DOUBLE',
    alarmStatus: 'RELEASED',
    isEnumValue: false,
    valueType: 'Analog',
    enumList: null,
    range: '0,16',
    splitNumber: 5,
    valueAlarmRangeVo: {
      alarmRanges: [
        {
          isInhibit: true,
          alarmRange: [0, '5'],
          alarmType: 'L-A',
          threshold: '5',
          ruleId: 'fbad6e451da741a3',
        },
      ],
    },
    deviceCodeFront: 'compressed_air_system_device1',
  },
  no2_main_deck_air_reservoir_pressure: {
    title: 'NO.2 Main Deck Air Reservoir',
    index: 9,
    fieldKey: 'no2_main_deck_air_reservoir_pressure',
    fieldName: 'NO.2 MAIN DECK AIR RESERVOIR PRESSURE',
    unit: 'bar',
    channel: 'A0806',
    itemNo: '20010',
    ioStatus: 'SUCCESS',
    ioAlarmTitleType: 'compressed_air_system_device1#no2_main_deck_air_reservoir_pressure#IOF',
    fieldValue: 14,
    isSwitchValue: false,
    exAlarmType: 'LOW_ALARM',
    analogType: null,
    aiotTypeEnum: 'DOUBLE',
    alarmStatus: 'RELEASED',
    isEnumValue: false,
    valueType: 'Analog',
    enumList: null,
    range: '0,16',
    splitNumber: 5,
    valueAlarmRangeVo: {
      alarmRanges: [
        {
          isInhibit: true,
          alarmRange: [0, '5'],
          alarmType: 'L-A',
          threshold: '5',
          ruleId: '2a2b55efaac8f8d2',
        },
      ],
    },
    deviceCodeFront: 'compressed_air_system_device1',
  },
  no3_main_deck_air_reservoir_pressure: {
    title: 'NO.3 Main Deck Air Reservoir',
    index: 10,
    fieldKey: 'no3_main_deck_air_reservoir_pressure',
    fieldName: 'NO.3 MAIN DECK AIR RESERVOIR PRESSURE',
    unit: 'bar',
    channel: 'A0807',
    itemNo: '20011',
    ioStatus: 'SUCCESS',
    ioAlarmTitleType: 'compressed_air_system_device1#no3_main_deck_air_reservoir_pressure#IOF',
    fieldValue: 6,
    isSwitchValue: false,
    exAlarmType: 'LOW_ALARM',
    analogType: null,
    aiotTypeEnum: 'DOUBLE',
    alarmStatus: 'RELEASED',
    isEnumValue: false,
    valueType: 'Analog',
    enumList: null,
    range: '0,16',
    splitNumber: 5,
    valueAlarmRangeVo: {
      alarmRanges: [
        {
          isInhibit: true,
          alarmRange: [0, '5'],
          alarmType: 'L-A',
          threshold: '5',
          ruleId: '3edceea2d2f21c94',
        },
      ],
    },
    deviceCodeFront: 'compressed_air_system_device1',
  },
  no4_main_deck_air_reservoir_pressure: {
    title: 'NO.4 Main Deck Air Reservoir',
    index: 11,
    fieldKey: 'no4_main_deck_air_reservoir_pressure',
    fieldName: 'NO.4 MAIN DECK AIR RESERVOIR PRESSURE',
    unit: 'bar',
    channel: 'A0808',
    itemNo: '20012',
    ioStatus: 'SUCCESS',
    ioAlarmTitleType: 'compressed_air_system_device1#no4_main_deck_air_reservoir_pressure#IOF',
    fieldValue: 10,
    isSwitchValue: false,
    exAlarmType: 'LOW_ALARM',
    analogType: null,
    aiotTypeEnum: 'DOUBLE',
    alarmStatus: 'RELEASED',
    isEnumValue: false,
    valueType: 'Analog',
    enumList: null,
    range: '0,16',
    splitNumber: 5,
    valueAlarmRangeVo: {
      alarmRanges: [
        {
          isInhibit: true,
          alarmRange: [0, '5'],
          alarmType: 'L-A',
          threshold: '5',
          ruleId: 'fc21ee773844a9e0',
        },
      ],
    },
    deviceCodeFront: 'compressed_air_system_device1',
  },
})

const lvlBarEchartsData = computed(() => {
  return {
    title: '液位-燃油日用罐 || 存储罐',
    fieldKey: 'fuel_oil_store_tank_p_level',
    capacityFieldKey: 'fuel_oil_store_tank_p_capacity',
    percentFieldKey: 'fuel_oil_store_tk_p_percent',
    fieldValue: '125.25',
    value: {
      index: 49,
      fieldKey: 'fuel_oil_store_tk_p_percent',
      fieldName: 'FUEL OIL STORE TK P PERCENT',
      unit: '%',
      channel: 'LG1050',
      itemNo: '16050',
      ioStatus: 'SUCCESS',
      ioAlarmTitleType: 'level_gauging_device1#fuel_oil_store_tk_p_percent#IOF',
      fieldValue: 49,
      isSwitchValue: false,
      exAlarmType: null,
      analogType: null,
      aiotTypeEnum: 'DOUBLE',
      alarmStatus: 'RELEASED',
      isEnumValue: false,
      valueType: 'Analog',
      enumList: null,
      range: '0,100',
      splitNumber: null,
      valueAlarmRangeVo: null,
      deviceCodeFront: 'level_gauging_device1',
    },
    capacity: {
      title: '液位- 燃油日用罐存储罐',
      fieldKey: 'fuel_oil_store_tank_p_level',
      index: 30,
      fieldKey: 'fuel_oil_store_tank_p_capacity',
      fieldName: 'FUEL OIL STORE TANK P CAPACITY',
      unit: 'm³',
      channel: 'LG1031',
      itemNo: '16031',
      ioStatus: 'SUCCESS',
      ioAlarmTitleType: 'level_gauging_device1#fuel_oil_store_tank_p_capacity#IOF',
      fieldValue: 154.51368,
      isSwitchValue: false,
      exAlarmType: null,
      analogType: null,
      aiotTypeEnum: 'DOUBLE',
      alarmStatus: 'RELEASED',
      isEnumValue: false,
      valueType: 'Analog',
      enumList: null,
      range: null,
      splitNumber: null,
      valueAlarmRangeVo: null,
      deviceCodeFront: 'level_gauging_device1',
    },
    index: 15,
    fieldName: 'FUEL OIL STORE TANK P LEVEL',
    unit: 'm',
    channel: 'LG1016',
    itemNo: '16016',
    ioStatus: 'SUCCESS',
    ioAlarmTitleType: 'level_gauging_device1#fuel_oil_store_tank_p_level#IOF',
    isSwitchValue: false,
    exAlarmType: null,
    analogType: null,
    aiotTypeEnum: 'DOUBLE',
    alarmStatus: 'RELEASED',
    isEnumValue: false,
    valueType: 'Analog',
    enumList: null,
    range: "",
    splitNumber: null,
    valueAlarmRangeVo: null,
    deviceCodeFront: 'level_gauging_device1',
  }
})

const cabinchartdata = computed(() => {
  return {
    title: '淡水箱',
    dataKey: 'fresh_water_tk1p_percent',
    col: 2,
    row: 3,
    type: 'cabin',
    extraData: [
      {
        fieldKey: 'fresh_water_tk1p_percent',
        fieldValue: 33.10618542508773,
        range: '0,100',
        unit: '％',
        data: {
          index: 45,
          fieldKey: 'fresh_water_tk1p_percent',
          fieldName: 'FRESH WATER TK 1P PERCENT',
          unit: '％',
          channel: 'LG1046',
          itemNo: '16046',
          ioStatus: 'SUCCESS',
          ioAlarmTitleType: 'level_gauging_device1#fresh_water_tk1p_percent#IOF',
          fieldValue: 33.10618542508773,
          isSwitchValue: false,
          exAlarmType: null,
          analogType: null,
          aiotTypeEnum: 'DOUBLE',
          alarmStatus: 'RELEASED',
          isEnumValue: false,
          valueType: 'Analog',
          enumList: null,
          range: '0,100',
          splitNumber: null,
          valueAlarmRangeVo: null,
          deviceCodeFront: 'level_gauging_device1',
        },
      },
      {
        fieldKey: 'fresh_water_tank1p_level',
        prefix: 'H',
        fieldValue: 15.898710934834027,
        range: null,
        unit: 'm',
        data: {
          index: 11,
          fieldKey: 'fresh_water_tank1p_level',
          fieldName: 'FRESH WATER TANK 1P LEVEL',
          unit: 'm',
          channel: 'LG1012',
          itemNo: '16012',
          ioStatus: 'SUCCESS',
          ioAlarmTitleType: 'level_gauging_device1#fresh_water_tank1p_level#IOF',
          fieldValue: 15.898710934834027,
          isSwitchValue: false,
          exAlarmType: null,
          analogType: null,
          aiotTypeEnum: 'DOUBLE',
          alarmStatus: 'RELEASED',
          isEnumValue: false,
          valueType: 'Analog',
          enumList: null,
          range: null,
          splitNumber: null,
          valueAlarmRangeVo: null,
          deviceCodeFront: 'level_gauging_device1',
        },
      },
      {
        fieldKey: 'fresh_water_tank1p_capacity',
        prefix: 'V',
        fieldValue: 126.78997294529998,
        range: null,
        unit: 'm³',
        data: {
          index: 26,
          fieldKey: 'fresh_water_tank1p_capacity',
          fieldName: 'FRESH WATER TANK 1P CAPACITY',
          unit: 'm³',
          channel: 'LG1027',
          itemNo: '16027',
          ioStatus: 'SUCCESS',
          ioAlarmTitleType: 'level_gauging_device1#fresh_water_tank1p_capacity#IOF',
          fieldValue: 126.78997294529998,
          isSwitchValue: false,
          exAlarmType: null,
          analogType: null,
          aiotTypeEnum: 'DOUBLE',
          alarmStatus: 'RELEASED',
          isEnumValue: false,
          valueType: 'Analog',
          enumList: null,
          range: null,
          splitNumber: null,
          valueAlarmRangeVo: null,
          deviceCodeFront: 'level_gauging_device1',
        },
      },
    ],
    customClass: 'col-start-1 col-span-2 row-span-3 ',
    data: {
      index: 45,
      fieldKey: 'fresh_water_tk1p_percent',
      fieldName: 'FRESH WATER TK 1P PERCENT',
      unit: '％',
      channel: 'LG1046',
      itemNo: '16046',
      ioStatus: 'SUCCESS',
      ioAlarmTitleType: 'level_gauging_device1#fresh_water_tk1p_percent#IOF',
      fieldValue: 33.10618542508773,
      isSwitchValue: false,
      exAlarmType: null,
      analogType: null,
      aiotTypeEnum: 'DOUBLE',
      alarmStatus: 'RELEASED',
      isEnumValue: false,
      valueType: 'Analog',
      enumList: null,
      range: '0,100',
      splitNumber: null,
      valueAlarmRangeVo: null,
      deviceCodeFront: 'level_gauging_device1',
    },
    options: [
      {
        index: 45,
        fieldKey: 'fresh_water_tk1p_percent',
        fieldName: 'FRESH WATER TK 1P PERCENT',
        unit: '％',
        channel: 'LG1046',
        itemNo: '16046',
        ioStatus: 'SUCCESS',
        ioAlarmTitleType: 'level_gauging_device1#fresh_water_tk1p_percent#IOF',
        fieldValue: 33.10618542508773,
        isSwitchValue: false,
        exAlarmType: null,
        analogType: null,
        aiotTypeEnum: 'DOUBLE',
        alarmStatus: 'RELEASED',
        isEnumValue: false,
        valueType: 'Analog',
        enumList: null,
        range: '0,100',
        splitNumber: null,
        valueAlarmRangeVo: null,
        deviceCodeFront: 'level_gauging_device1',
        data: {
          index: 45,
          fieldKey: 'fresh_water_tk1p_percent',
          fieldName: 'FRESH WATER TK 1P PERCENT',
          unit: '％',
          channel: 'LG1046',
          itemNo: '16046',
          ioStatus: 'SUCCESS',
          ioAlarmTitleType: 'level_gauging_device1#fresh_water_tk1p_percent#IOF',
          fieldValue: 33.10618542508773,
          isSwitchValue: false,
          exAlarmType: null,
          analogType: null,
          aiotTypeEnum: 'DOUBLE',
          alarmStatus: 'RELEASED',
          isEnumValue: false,
          valueType: 'Analog',
          enumList: null,
          range: '0,100',
          splitNumber: null,
          valueAlarmRangeVo: null,
          deviceCodeFront: 'level_gauging_device1',
        },
      },
      {
        index: 11,
        fieldKey: 'fresh_water_tank1p_level',
        fieldName: 'FRESH WATER TANK 1P LEVEL',
        unit: 'm',
        channel: 'LG1012',
        itemNo: '16012',
        ioStatus: 'SUCCESS',
        ioAlarmTitleType: 'level_gauging_device1#fresh_water_tank1p_level#IOF',
        fieldValue: 15.898710934834027,
        isSwitchValue: false,
        exAlarmType: null,
        analogType: null,
        aiotTypeEnum: 'DOUBLE',
        alarmStatus: 'RELEASED',
        isEnumValue: false,
        valueType: 'Analog',
        enumList: null,
        range: null,
        splitNumber: null,
        valueAlarmRangeVo: null,
        deviceCodeFront: 'level_gauging_device1',
        prefix: 'H',
        data: {
          index: 11,
          fieldKey: 'fresh_water_tank1p_level',
          fieldName: 'FRESH WATER TANK 1P LEVEL',
          unit: 'm',
          channel: 'LG1012',
          itemNo: '16012',
          ioStatus: 'SUCCESS',
          ioAlarmTitleType: 'level_gauging_device1#fresh_water_tank1p_level#IOF',
          fieldValue: 15.898710934834027,
          isSwitchValue: false,
          exAlarmType: null,
          analogType: null,
          aiotTypeEnum: 'DOUBLE',
          alarmStatus: 'RELEASED',
          isEnumValue: false,
          valueType: 'Analog',
          enumList: null,
          range: null,
          splitNumber: null,
          valueAlarmRangeVo: null,
          deviceCodeFront: 'level_gauging_device1',
        },
      },
      {
        index: 26,
        fieldKey: 'fresh_water_tank1p_capacity',
        fieldName: 'FRESH WATER TANK 1P CAPACITY',
        unit: 'm³',
        channel: 'LG1027',
        itemNo: '16027',
        ioStatus: 'SUCCESS',
        ioAlarmTitleType: 'level_gauging_device1#fresh_water_tank1p_capacity#IOF',
        fieldValue: 126.78997294529998,
        isSwitchValue: false,
        exAlarmType: null,
        analogType: null,
        aiotTypeEnum: 'DOUBLE',
        alarmStatus: 'RELEASED',
        isEnumValue: false,
        valueType: 'Analog',
        enumList: null,
        range: null,
        splitNumber: null,
        valueAlarmRangeVo: null,
        deviceCodeFront: 'level_gauging_device1',
        prefix: 'V',
        data: {
          index: 26,
          fieldKey: 'fresh_water_tank1p_capacity',
          fieldName: 'FRESH WATER TANK 1P CAPACITY',
          unit: 'm³',
          channel: 'LG1027',
          itemNo: '16027',
          ioStatus: 'SUCCESS',
          ioAlarmTitleType: 'level_gauging_device1#fresh_water_tank1p_capacity#IOF',
          fieldValue: 126.78997294529998,
          isSwitchValue: false,
          exAlarmType: null,
          analogType: null,
          aiotTypeEnum: 'DOUBLE',
          alarmStatus: 'RELEASED',
          isEnumValue: false,
          valueType: 'Analog',
          enumList: null,
          range: null,
          splitNumber: null,
          valueAlarmRangeVo: null,
          deviceCodeFront: 'level_gauging_device1',
        },
      },
    ],
  }
})

// 1. Rudder仪表动态刷新
const rudder_range = '-180,180';
const [rudderMin, rudderMax] = rudder_range.split(',').map(Number);
const rudder_fieldValue = ref(0);
onMounted(() => {
  rudder_fieldValue.value = Math.random() * (rudderMax - rudderMin) + rudderMin;
  setInterval(() => {
    rudder_fieldValue.value = Math.random() * (rudderMax - rudderMin) + rudderMin;
  }, 1000);
});
const rendder = computed(() => {
  return {
    title: '舵',
    dataKey: 'main_propulsion_rudder_indication',
    col: 4,
    row: 12,
    type: 'rudder',
    customClass: 'col-start-1 col-span-4 row-span-12 ',
    data: {
      index: 1,
      fieldKey: 'main_propulsion_rudder_indication',
      fieldName: 'MAIN PROPULSION RUDDER INDICATION',
      unit: '°',
      channel: 'MP1002',
      itemNo: '08002',
      ioStatus: 'SUCCESS',
      ioAlarmTitleType: 'main_propulsion_device1#main_propulsion_rudder_indication#IOF',
      fieldValue: rudder_fieldValue.value,
      isSwitchValue: false,
      exAlarmType: null,
      analogType: null,
      aiotTypeEnum: 'DOUBLE',
      alarmStatus: 'RELEASED',
      isEnumValue: false,
      valueType: 'Analog',
      enumList: null,
      range: rudder_range,
      splitNumber: null,
      valueAlarmRangeVo: null,
      deviceCodeFront: 'main_propulsion_device1',
    },
  }
})

const main_propulsion_rudder_indication = computed(() => {
  return {
    index: 1,
    fieldKey: 'main_propulsion_rudder_indication',
    fieldName: 'MAIN PROPULSION RUDDER INDICATION',
    unit: '°',
    channel: 'MP1002',
    itemNo: '08002',
    ioStatus: 'SUCCESS',
    ioAlarmTitleType: 'main_propulsion_device1#main_propulsion_rudder_indication#IOF',
    fieldValue: 12,
    isSwitchValue: false,
    exAlarmType: null,
    analogType: null,
    aiotTypeEnum: 'DOUBLE',
    alarmStatus: 'RELEASED',
    isEnumValue: false,
    valueType: 'Analog',
    enumList: null,
    range: '11,22',
    splitNumber: 5,
    valueAlarmRangeVo: null,
    deviceCodeFront: 'main_propulsion_device1',
  }
})

const main_propulsion_vfd_rpm_fieldValue = ref(0)
const main_propulsion_vfd_rpm_range = '-10,45'
const [vfdMin, vfdMax] = main_propulsion_vfd_rpm_range.split(',').map(Number)

onMounted(() => {
  main_propulsion_vfd_rpm_fieldValue.value = Math.random() * (vfdMax - vfdMin) + vfdMin
  setInterval(() => {
    main_propulsion_vfd_rpm_fieldValue.value = Math.random() * (vfdMax - vfdMin) + vfdMin
  }, 1000)
})

const main_propulsion_vfd_rpm_indication = computed(() => {
  return {
    index: 2,
    fieldKey: 'main_propulsion_vfd_rpm_indication',
    fieldName: 'MAIN PROPULSION VFD RPM INDICATION',
    unit: 'bar',
    channel: 'MP1003',
    itemNo: '08003',
    ioStatus: 'SUCCESS',
    ioAlarmTitleType: 'main_propulsion_device1#main_propulsion_vfd_rpm_indication#IOF',
    fieldValue: main_propulsion_vfd_rpm_fieldValue.value,
    isSwitchValue: false,
    exAlarmType: null,
    analogType: null,
    aiotTypeEnum: 'DOUBLE',
    alarmStatus: 'RELEASED',
    isEnumValue: false,
    valueType: 'Analog',
    enumList: null,
    range: main_propulsion_vfd_rpm_range,
    splitNumber: 5,
    valueAlarmRangeVo: {
      alarmRanges: [
        { isInhibit: true, alarmRange: ['-9', '3'], alarmType: 'L-A', threshold: '3', ruleId: 'b5a218c23037a17a' },
        { isInhibit: true, alarmRange: ['-10', '-9'], alarmType: 'LL-A', threshold: '-9', ruleId: 'fb5eb3688f30d53f' },
      ],
    },
    deviceCodeFront: 'main_propulsion_device1',
  }
})

const main_propulsion_motor_nde_bearing_temperature_fieldValue = ref(0)
const main_propulsion_motor_nde_bearing_temperature_range = '-30,100'
const [ndeMin, ndeMax] = main_propulsion_motor_nde_bearing_temperature_range.split(',').map(Number)

onMounted(() => {
  main_propulsion_motor_nde_bearing_temperature_fieldValue.value = Math.random() * (ndeMax - ndeMin) + ndeMin
  setInterval(() => {
    main_propulsion_motor_nde_bearing_temperature_fieldValue.value = Math.random() * (ndeMax - ndeMin) + ndeMin
  }, 1000)
})

const main_propulsion_motor_nde_bearing_temperature = computed(() => {
  return {
    index: 9,
    fieldKey: 'main_propulsion_vfd_voltage',
    fieldName: 'MAIN PROPULSION VFD VOLTAGE',
    unit: '℃',
    channel: 'MP1010',
    itemNo: '08010',
    ioStatus: 'SUCCESS',
    ioAlarmTitleType: 'main_propulsion_device1#main_propulsion_vfd_voltage#IOF',
    fieldValue: main_propulsion_motor_nde_bearing_temperature_fieldValue.value,
    isSwitchValue: false,
    exAlarmType: null,
    analogType: null,
    aiotTypeEnum: 'DOUBLE',
    alarmStatus: 'RELEASED',
    isEnumValue: false,
    valueType: 'Analog',
    enumList: null,
    range: main_propulsion_motor_nde_bearing_temperature_range,
    splitNumber: 5,
    valueAlarmRangeVo: {
      alarmRanges: [
        { isInhibit: true, alarmRange: [-10, '-4'], alarmType: 'LL-A', threshold: '-4', ruleId: '30225a511e2b238c' },
        { isInhibit: true, alarmRange: ['-4', '0'], alarmType: 'L-A', threshold: '0', ruleId: '2dba24beb5dfad52' },
      ],
    },
    deviceCodeFront: 'main_propulsion_device1',
  }
})






const Rangenull_temperature = computed(() => {
  return {
    index: 9,
    fieldKey: 'main_propulsion_vfd_voltage',
    fieldName: 'MAIN PROPULSION VFD VOLTAGE',
    unit: '℃',
    channel: 'MP1010',
    itemNo: '08010',
    ioStatus: 'SUCCESS',
    ioAlarmTitleType: 'main_propulsion_device1#main_propulsion_vfd_voltage#IOF',
    fieldValue: main_propulsion_motor_nde_bearing_temperature_fieldValue.value,
    isSwitchValue: false,
    exAlarmType: null,
    analogType: null,
    aiotTypeEnum: 'DOUBLE',
    alarmStatus: 'RELEASED',
    isEnumValue: false,
    valueType: 'Analog',
    enumList: null,
    range:"", /// main_propulsion_motor_nde_bearing_temperature_range,
    splitNumber: 5,
    valueAlarmRangeVo: {
      alarmRanges: [
        { isInhibit: true, alarmRange: [-10, '-4'], alarmType: 'LL-A', threshold: '-4', ruleId: '30225a511e2b238c' },
        { isInhibit: true, alarmRange: ['-4', '0'], alarmType: 'L-A', threshold: '0', ruleId: '2dba24beb5dfad52' },
      ],
    },
    deviceCodeFront: 'main_propulsion_device1',
  }
})






const speed_fieldValue = ref(0)
const speed_range = '0,2000'
const [speedMin, speedMax] = speed_range.split(',').map(Number)

onMounted(() => {
  speed_fieldValue.value = Math.random() * (speedMax - speedMin) + speedMin
  setInterval(() => {
    speed_fieldValue.value = Math.random() * (speedMax - speedMin) + speedMin
  }, 1000)
})

const speedcomputed = computed(() => {
  return {
    title: 'SPEED',
    dataKey: 'd_g_engine_speed',
    col: 18,
    row: 12,
    type: 'speed',
    customClass: 'col-start-25 col-span-18 row-span-12 ',
    data: {
      index: 9,
      fieldKey: 'd_g_engine_speed',
      fieldName: 'D/G ENGINE SPEED',
      unit: 'rpm',
      channel: 'DG1010',
      itemNo: '01010',
      ioStatus: 'SUCCESS',
      ioAlarmTitleType: 'main_generator_device1#d_g_engine_speed#IOF',
      fieldValue: speed_fieldValue.value,
      isSwitchValue: false,
      exAlarmType: null,
      analogType: null,
      aiotTypeEnum: 'DOUBLE',
      alarmStatus: 'RELEASED',
      isEnumValue: false,
      valueType: 'Analog',
      enumList: null,
      range: speed_range,
      splitNumber: null,
      valueAlarmRangeVo: {
        alarmRanges: [{ isInhibit: true, alarmRange: ['1980.0', 2200], alarmType: 'H-A', threshold: '1980.0', ruleId: 'bc85dadf1bbf80e9' }],
      },
      deviceCodeFront: 'main_generator_device1',
    },
  }
})

const emit = defineEmits(['handRange'])
const handRange = (data) => {
  emit('handRange', data)
}

const processing = (parmts) => {
  if (parmts != null) {
    return parmts.split(',').map(Number)
  } else {
    return [0, 2000]
  }
}

// 1. 动态生成所有dataMap下有range的fieldValue
const dataMapFieldValues = {};
Object.keys(dataMap.value).forEach(key => {
  const item = dataMap.value[key];
  if (item.range) {
    const [min, max] = item.range.split(',').map(Number);
    dataMapFieldValues[key] = ref(item.fieldValue);
    onMounted(() => {
      dataMapFieldValues[key].value = Math.random() * (max - min) + min;
      setInterval(() => {
        dataMapFieldValues[key].value = Math.random() * (max - min) + min;
      }, 1000);
    });
  }
});
// 重写dataMap为computed，fieldValue取ref
const dataMapComputed = computed(() => {
  const result = {};
  Object.keys(dataMap.value).forEach(key => {
    const item = dataMap.value[key];
    result[key] = { ...item };
    if (item.range && dataMapFieldValues[key]) {
      result[key].fieldValue = dataMapFieldValues[key].value;
    }
  });
  return result;
});

// 2. lvlBarEchartsData.value 动态刷新
const lvlBarValueFieldValue = ref(Number(lvlBarEchartsData.value.value.range ? lvlBarEchartsData.value.value.fieldValue : 0));
if (lvlBarEchartsData.value.value.range) {
  const [min, max] = lvlBarEchartsData.value.value.range.split(',').map(Number);
  onMounted(() => {
    lvlBarValueFieldValue.value = Math.random() * (max - min) + min;
    setInterval(() => {
      lvlBarValueFieldValue.value = Math.random() * (max - min) + min;
    }, 1000);
  });
}
const lvlBarEchartsDataComputed = computed(() => {
  const obj = { ...lvlBarEchartsData.value };
  if (obj.value && obj.value.range) {
    obj.value = { ...obj.value, fieldValue: lvlBarValueFieldValue.value };
  }
  return obj;
});

// 3. cabinchartdata.data 及 options 动态刷新
const cabinDataFieldValue = ref(Number(cabinchartdata.value.data.range ? cabinchartdata.value.data.fieldValue : 0));
if (cabinchartdata.value.data.range) {
  const [min, max] = cabinchartdata.value.data.range.split(',').map(Number);
  onMounted(() => {
    cabinDataFieldValue.value = Math.random() * (max - min) + min;
    setInterval(() => {
      cabinDataFieldValue.value = Math.random() * (max - min) + min;
    }, 1000);
  });
}
const cabinOptionsFieldValues = cabinchartdata.value.options.map(opt => {
  if (opt.range) {
    const [min, max] = opt.range.split(',').map(Number);
    const refVal = ref(Number(opt.fieldValue));
    onMounted(() => {
      refVal.value = Math.random() * (max - min) + min;
      setInterval(() => {
        refVal.value = Math.random() * (max - min) + min;
      }, 1000);
    });
    return refVal;
  }
  return ref(Number(opt.fieldValue));
});
const cabinchartdataComputed = computed(() => {
  const obj = { ...cabinchartdata.value };
  if (obj.data && obj.data.range) {
    obj.data = { ...obj.data, fieldValue: cabinDataFieldValue.value };
  }
  if (obj.options && obj.options.length) {
    obj.options = obj.options.map((opt, idx) => {
      if (opt.range) {
        return { ...opt, fieldValue: cabinOptionsFieldValues[idx].value };
      }
      return opt;
    });
  }
  return obj;
});
</script>
<style lang="scss" scoped>
@import url(./common.scss);

body,
html {
  color: red;
}

.h50 {
  height: 50%;
}

.h33 {
  height: calc(100% / 3);
}
</style>
