<template>
  <div class="content">
    <div id="weather">
      <Table
        :data="data"
        :column="column"
        :formData="formData"
        :showIndex="true"
        :selection="false"
        :border="true"
        :total="total"
        :isShowFilter="false"
        page,
        @search="search"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
        @reset="reset"
        size="default"
        background
        ref="baseTable"
        :formSpan="6"
        :exportBtnShow="exportBtnShow"
      >
        <template #equipmentName>
          <el-select
            filterable
            v-model="deviceCode"
            placeholder="Select DeviceCode"
            style="width: 100%"
            @change="changeEquipement"
            :clearable="!isGraph"
          >
            <el-option v-for="(item, inx) in Equipmentsurvival" :key="item.deviceName + inx" :label="item.deviceName" :value="item.deviceCode" />
          </el-select>
        </template>
        <template #daterange>
          <el-date-picker
            v-model="selectDate"
            :shortcuts="shortcuts"
            type="datetimerange"
            range-separator="-"
            start-placeholder="StartDate"
            end-placeholder="EndDate"
            :disabledDate="disabledDateFn"
            :clearable="false"
          />
        </template>
        <template #toolbar2>
          <SGbutton btnbg class="graph" :title="isGraph ? $t('datalist') : $t('graph')" @handleClick="toggleGraph">
            <svg-icon iconName="iconfontgraph"></svg-icon>
          </SGbutton>
        </template>
        <template #toolbar3>
          <SGbutton btnbg iconName="iconfontexport" :title="$t('export')" @handleClick="exportAsXLSX"> </SGbutton>
        </template>
        <template #options="{ row }"> <el-link :icon="Tickets" type="primary" @click="handleDetail(row)">View</el-link>&nbsp; </template>

        <template #tableBody v-if="isGraph">
          <div style="height: 100%; width: 100%; overflow: scroll; background-color: #fff">
            <alarmChart :params="drawerFormData2" ref="alarmChart" />
          </div>
        </template>
      </Table>
    </div>
    <createDrawer ref="createVoyage" />
  </div>
</template>

<script>
import { Edit, CloseBold, Tickets } from '@element-plus/icons-vue'
import { column, data, formData } from './data.js'
import { utcDateToTimestamp } from '@/utils/comment.js'
import createDrawer from './components/createDrawer.vue'
import alarmChart from './components/alarmChart.vue'
import { indextemp } from '@/utils/sangoai.ts'
import menuCollapse from '@/store/module/menu.js'
// import Api from '@/axios/monitor.js'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import $bus, { mittEventName } from '@/utils/mitt'
import { method } from 'lodash'

export default {
  name: 'alarm',
  data() {
    return {
      drawerFormData2: {
        chart: [
          [
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG1 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG1 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG4 VFD5 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742817600000,
              alarmTitle: 'LEG4 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742817600000,
              alarmTitle: 'LEG4 VFD2 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742817600000,
              alarmTitle: 'LEG2 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG2 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG3 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG3 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742817600000,
              alarmTitle: 'LEG3 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG2 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG2 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG3 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG4 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG1 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG1 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742817600000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742817600000,
              alarmTitle: 'LEG3 VFD2 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742817600000,
              alarmTitle: 'LEG1 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG3 VFD3 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742817600000,
              alarmTitle: 'LEG3 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG4 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG2 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742817600000,
              alarmTitle: 'LEG1 VFD9 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 2,
              ts: 1742824800000,
              alarmTitle: 'LEG1 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742824800000,
              alarmTitle: 'LEG1 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742824800000,
              alarmTitle: 'LEG3 VFD8 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742824800000,
              alarmTitle: 'LEG4 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742824800000,
              alarmTitle: 'LEG4 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742824800000,
              alarmTitle: 'LEG3 VFD1 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742824800000,
              alarmTitle: 'LEG2 VFD6 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742824800000,
              alarmTitle: 'LEG2 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742824800000,
              alarmTitle: 'LEG3 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742824800000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 4,
              ts: 1742824800000,
              alarmTitle: 'LEG3 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742824800000,
              alarmTitle: 'LEG2 VFD8 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742824800000,
              alarmTitle: 'LEG2 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742824800000,
              alarmTitle: 'LEG3 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742824800000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742824800000,
              alarmTitle: 'LEG3 VFD5 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742824800000,
              alarmTitle: 'LEG4 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742824800000,
              alarmTitle: 'LEG1 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742824800000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742824800000,
              alarmTitle: 'LEG2 VFD3 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742824800000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742824800000,
              alarmTitle: 'LEG3 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742824800000,
              alarmTitle: 'LEG4 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742824800000,
              alarmTitle: 'LEG1 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742824800000,
              alarmTitle: 'LEG4 VFD3 SPEED IO ERROR',
            },
            {
              total: 4,
              ts: 1742824800000,
              alarmTitle: 'LEG1 VFD1 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742824800000,
              alarmTitle: 'LEG4 VFD4 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742824800000,
              alarmTitle: 'LEG4 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742824800000,
              alarmTitle: 'LEG1 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742824800000,
              alarmTitle: 'LEG2 LOAD TOTAL IO ERROR',
            },
            {
              total: 3,
              ts: 1742824800000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 2,
              ts: 1742806800000,
              alarmTitle: 'LEG3 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742806800000,
              alarmTitle: 'LEG4 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742806800000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742806800000,
              alarmTitle: 'LEG3 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742806800000,
              alarmTitle: 'LEG2 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742806800000,
              alarmTitle: 'LEG1 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742806800000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742806800000,
              alarmTitle: 'LEG4 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742806800000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742806800000,
              alarmTitle: 'LEG3 VFD2 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742806800000,
              alarmTitle: 'LEG4 VFD3 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742806800000,
              alarmTitle: 'LEG4 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742806800000,
              alarmTitle: 'LEG3 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742806800000,
              alarmTitle: 'LEG4 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742806800000,
              alarmTitle: 'LEG1 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742806800000,
              alarmTitle: 'LEG2 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742806800000,
              alarmTitle: 'LEG4 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742806800000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742806800000,
              alarmTitle: 'LEG2 VFD5 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742806800000,
              alarmTitle: 'LEG2 VFD11 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG1 VFD11 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742828400000,
              alarmTitle: 'LEG1 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742828400000,
              alarmTitle: 'LEG2 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG4 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG4 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG4 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG3 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG2 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG2 VFD6 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742828400000,
              alarmTitle: 'LEG3 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG3 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG3 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG2 VFD8 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742828400000,
              alarmTitle: 'LEG2 VFD7 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742828400000,
              alarmTitle: 'LEG2 VFD2 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742828400000,
              alarmTitle: 'LEG3 VFD9 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742828400000,
              alarmTitle: 'LEG3 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG1 VFD7 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742828400000,
              alarmTitle: 'LEG1 VFD4 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742828400000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG4 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG2 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG4 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742828400000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG4 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG1 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG4 VFD1 SPEED IO ERROR',
            },
            {
              total: 6,
              ts: 1742828400000,
              alarmTitle: 'LEG3 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG3 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG4 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG1 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG4 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG2 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742828400000,
              alarmTitle: 'LEG1 VFD9 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742828400000,
              alarmTitle: 'LEG2 VFD11 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 1,
              ts: 1742878800000,
              alarmTitle: 'LEG3 VFD8 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742878800000,
              alarmTitle: 'LEG3 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742878800000,
              alarmTitle: 'LEG1 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742878800000,
              alarmTitle: 'LEG2 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742878800000,
              alarmTitle: 'LEG2 VFD9 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742878800000,
              alarmTitle: 'LEG1 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742878800000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742878800000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742878800000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742878800000,
              alarmTitle: 'LEG4 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742878800000,
              alarmTitle: 'LEG1 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742878800000,
              alarmTitle: 'LEG4 VFD1 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 3,
              ts: 1742889600000,
              alarmTitle: 'LEG1 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742889600000,
              alarmTitle: 'LEG1 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742889600000,
              alarmTitle: 'LEG1 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742889600000,
              alarmTitle: 'LEG2 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742889600000,
              alarmTitle: 'LEG4 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742889600000,
              alarmTitle: 'LEG4 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742889600000,
              alarmTitle: 'LEG3 VFD1 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742889600000,
              alarmTitle: 'LEG2 VFD6 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742889600000,
              alarmTitle: 'LEG2 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742889600000,
              alarmTitle: 'LEG3 VFD11 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742889600000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742889600000,
              alarmTitle: 'LEG3 VFD10 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742889600000,
              alarmTitle: 'LEG1 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742889600000,
              alarmTitle: 'LEG2 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742889600000,
              alarmTitle: 'LEG2 VFD2 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742889600000,
              alarmTitle: 'LEG3 VFD9 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742889600000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742889600000,
              alarmTitle: 'LEG4 VFD8 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742889600000,
              alarmTitle: 'LEG1 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742889600000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742889600000,
              alarmTitle: 'LEG4 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742889600000,
              alarmTitle: 'LEG2 VFD3 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742889600000,
              alarmTitle: 'LEG4 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742889600000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742889600000,
              alarmTitle: 'LEG4 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742889600000,
              alarmTitle: 'LEG1 VFD8 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742889600000,
              alarmTitle: 'LEG4 VFD3 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742889600000,
              alarmTitle: 'LEG4 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742889600000,
              alarmTitle: 'LEG4 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742889600000,
              alarmTitle: 'LEG1 VFD6 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742889600000,
              alarmTitle: 'LEG2 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742889600000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742889600000,
              alarmTitle: 'LEG1 VFD9 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG1 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG1 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG2 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG3 VFD8 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742842800000,
              alarmTitle: 'LEG4 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG4 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG3 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG2 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG1 VFD2 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742842800000,
              alarmTitle: 'LEG2 VFD6 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742842800000,
              alarmTitle: 'LEG2 VFD9 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742842800000,
              alarmTitle: 'LEG3 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742842800000,
              alarmTitle: 'LEG2 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'HULL LOAD IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG2 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG2 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG3 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG1 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG4 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742842800000,
              alarmTitle: 'LEG4 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742842800000,
              alarmTitle: 'LEG4 VFD9 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742842800000,
              alarmTitle: 'LEG1 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG4 VFD3 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742842800000,
              alarmTitle: 'LEG1 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG4 VFD1 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742842800000,
              alarmTitle: 'LEG4 VFD4 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742842800000,
              alarmTitle: 'LEG4 VFD11 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742842800000,
              alarmTitle: 'LEG2 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG4 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742842800000,
              alarmTitle: 'LEG2 VFD5 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742842800000,
              alarmTitle: 'LEG1 VFD9 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG1 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG1 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG2 VFD1 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742832000000,
              alarmTitle: 'LEG3 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG4 VFD5 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742832000000,
              alarmTitle: 'LEG4 VFD7 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742832000000,
              alarmTitle: 'LEG4 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG2 VFD4 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742832000000,
              alarmTitle: 'LEG2 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG3 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG3 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742832000000,
              alarmTitle: 'LEG3 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG2 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG1 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG1 VFD7 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742832000000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG2 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG4 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742832000000,
              alarmTitle: 'LEG4 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG1 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG4 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG4 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG3 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG4 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742832000000,
              alarmTitle: 'LEG2 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742832000000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742832000000,
              alarmTitle: 'LEG2 VFD5 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742832000000,
              alarmTitle: 'LEG2 VFD11 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG1 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG3 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG3 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG2 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG3 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG3 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG3 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'HULL LOAD IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG2 VFD7 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742886000000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742886000000,
              alarmTitle: 'LEG4 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG1 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG2 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG4 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG4 VFD9 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742886000000,
              alarmTitle: 'LEG4 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG1 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG4 VFD1 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742886000000,
              alarmTitle: 'LEG3 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG3 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG4 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG2 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742886000000,
              alarmTitle: 'LEG4 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742886000000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742886000000,
              alarmTitle: 'LEG2 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742886000000,
              alarmTitle: 'LEG2 VFD11 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG2 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG4 VFD5 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742853600000,
              alarmTitle: 'LEG3 VFD4 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742853600000,
              alarmTitle: 'LEG4 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742853600000,
              alarmTitle: 'LEG2 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG2 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG3 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG3 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG2 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG1 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG2 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG2 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG3 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG4 VFD8 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742853600000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742853600000,
              alarmTitle: 'LEG4 VFD10 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742853600000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG4 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG1 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG1 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG3 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG3 LOAD TOTAL IO ERROR',
            },
            {
              total: 3,
              ts: 1742853600000,
              alarmTitle: 'LEG4 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG1 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742853600000,
              alarmTitle: 'LEG2 LOAD TOTAL IO ERROR',
            },
          ],
          [
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG1 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG2 VFD1 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742821200000,
              alarmTitle: 'LEG3 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG4 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG3 VFD4 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742821200000,
              alarmTitle: 'LEG3 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG2 VFD4 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742821200000,
              alarmTitle: 'LEG2 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG3 VFD11 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742821200000,
              alarmTitle: 'LEG3 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG2 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'HULL LOAD IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG2 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG3 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG3 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG4 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG4 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG4 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742821200000,
              alarmTitle: 'LEG3 VFD2 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742821200000,
              alarmTitle: 'LEG1 VFD8 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742821200000,
              alarmTitle: 'LEG4 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG1 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG4 VFD1 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742821200000,
              alarmTitle: 'LEG3 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG3 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG4 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG1 VFD6 SPEED IO ERROR',
            },
            {
              total: 4,
              ts: 1742821200000,
              alarmTitle: 'LEG2 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742821200000,
              alarmTitle: 'LEG2 VFD5 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG1 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742810400000,
              alarmTitle: 'LEG1 VFD11 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742810400000,
              alarmTitle: 'LEG3 VFD8 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742810400000,
              alarmTitle: 'LEG3 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG4 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG4 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG3 VFD1 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742810400000,
              alarmTitle: 'LEG2 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG1 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG2 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG3 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG3 VFD6 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742810400000,
              alarmTitle: 'LEG3 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742810400000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742810400000,
              alarmTitle: 'LEG2 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG1 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG3 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG1 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG2 VFD3 SPEED IO ERROR',
            },
            {
              total: 4,
              ts: 1742810400000,
              alarmTitle: 'LEG4 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG1 VFD8 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742810400000,
              alarmTitle: 'LEG4 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG1 VFD1 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742810400000,
              alarmTitle: 'LEG4 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG3 VFD3 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742810400000,
              alarmTitle: 'LEG1 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742810400000,
              alarmTitle: 'LEG2 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742810400000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742810400000,
              alarmTitle: 'LEG1 VFD9 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 4,
              ts: 1742857200000,
              alarmTitle: 'LEG1 VFD11 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742857200000,
              alarmTitle: 'LEG1 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742857200000,
              alarmTitle: 'LEG3 VFD8 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742857200000,
              alarmTitle: 'LEG3 VFD4 SPEED IO ERROR',
            },
            {
              total: 4,
              ts: 1742857200000,
              alarmTitle: 'LEG4 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG3 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG2 VFD4 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742857200000,
              alarmTitle: 'LEG2 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG2 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG3 VFD11 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742857200000,
              alarmTitle: 'LEG3 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742857200000,
              alarmTitle: 'LEG3 VFD12 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742857200000,
              alarmTitle: 'LEG3 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG2 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG2 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742857200000,
              alarmTitle: 'LEG3 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG3 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG4 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG4 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742857200000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742857200000,
              alarmTitle: 'LEG3 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG1 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG4 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG4 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG3 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG1 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG4 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742857200000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 5,
              ts: 1742857200000,
              alarmTitle: 'LEG2 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742857200000,
              alarmTitle: 'LEG2 VFD11 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG1 VFD11 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742864400000,
              alarmTitle: 'LEG1 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG2 VFD1 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742864400000,
              alarmTitle: 'LEG3 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG4 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742864400000,
              alarmTitle: 'LEG3 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG1 VFD2 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742864400000,
              alarmTitle: 'LEG2 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG2 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG3 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG3 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742864400000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG3 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG2 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG1 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG2 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG2 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG3 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG1 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742864400000,
              alarmTitle: 'LEG1 VFD4 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742864400000,
              alarmTitle: 'LEG4 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742864400000,
              alarmTitle: 'LEG2 VFD3 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742864400000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742864400000,
              alarmTitle: 'LEG3 VFD2 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742864400000,
              alarmTitle: 'LEG4 VFD9 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742864400000,
              alarmTitle: 'LEG1 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG4 VFD1 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742864400000,
              alarmTitle: 'LEG3 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG4 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG4 VFD11 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742864400000,
              alarmTitle: 'LEG1 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG2 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742864400000,
              alarmTitle: 'LEG1 VFD9 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 1,
              ts: 1742814000000,
              alarmTitle: 'LEG1 VFD11 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742814000000,
              alarmTitle: 'LEG4 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742814000000,
              alarmTitle: 'LEG4 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742814000000,
              alarmTitle: 'LEG3 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742814000000,
              alarmTitle: 'LEG2 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742814000000,
              alarmTitle: 'LEG3 VFD11 SPEED IO ERROR',
            },
            {
              total: 4,
              ts: 1742814000000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742814000000,
              alarmTitle: 'LEG3 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742814000000,
              alarmTitle: 'LEG3 VFD10 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742814000000,
              alarmTitle: 'LEG2 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742814000000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742814000000,
              alarmTitle: 'LEG3 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742814000000,
              alarmTitle: 'LEG1 VFD4 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742814000000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742814000000,
              alarmTitle: 'LEG4 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742814000000,
              alarmTitle: 'LEG3 VFD2 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742814000000,
              alarmTitle: 'LEG1 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742814000000,
              alarmTitle: 'LEG4 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742814000000,
              alarmTitle: 'LEG1 VFD1 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742814000000,
              alarmTitle: 'LEG4 VFD1 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742814000000,
              alarmTitle: 'LEG4 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742814000000,
              alarmTitle: 'LEG3 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742814000000,
              alarmTitle: 'LEG4 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742814000000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG1 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG1 VFD11 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742868000000,
              alarmTitle: 'LEG1 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG2 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG3 VFD8 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742868000000,
              alarmTitle: 'LEG3 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG4 VFD7 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742868000000,
              alarmTitle: 'LEG4 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG3 VFD1 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742868000000,
              alarmTitle: 'LEG1 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG2 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG2 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG3 VFD11 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742868000000,
              alarmTitle: 'LEG3 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742868000000,
              alarmTitle: 'LEG3 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742868000000,
              alarmTitle: 'LEG3 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742868000000,
              alarmTitle: 'LEG2 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG2 VFD2 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742868000000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG4 VFD8 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742868000000,
              alarmTitle: 'LEG1 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG4 LOAD TOTAL IO ERROR',
            },
            {
              total: 3,
              ts: 1742868000000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 4,
              ts: 1742868000000,
              alarmTitle: 'LEG3 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG1 VFD1 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742868000000,
              alarmTitle: 'LEG3 VFD3 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742868000000,
              alarmTitle: 'LEG1 VFD6 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742868000000,
              alarmTitle: 'LEG2 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742868000000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG2 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742868000000,
              alarmTitle: 'LEG1 VFD9 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742868000000,
              alarmTitle: 'LEG2 VFD11 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG1 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG1 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG4 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742839200000,
              alarmTitle: 'LEG2 VFD4 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742839200000,
              alarmTitle: 'LEG1 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG3 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG3 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742839200000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG3 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG3 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742839200000,
              alarmTitle: 'LEG2 VFD8 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742839200000,
              alarmTitle: 'LEG1 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742839200000,
              alarmTitle: 'LEG2 VFD7 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742839200000,
              alarmTitle: 'LEG3 VFD9 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742839200000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742839200000,
              alarmTitle: 'LEG3 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG1 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742839200000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742839200000,
              alarmTitle: 'LEG2 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG4 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG4 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG1 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG1 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG4 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG4 VFD11 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742839200000,
              alarmTitle: 'LEG1 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG2 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742839200000,
              alarmTitle: 'LEG4 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742839200000,
              alarmTitle: 'LEG2 VFD5 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742839200000,
              alarmTitle: 'LEG1 VFD9 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742839200000,
              alarmTitle: 'LEG2 VFD11 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 4,
              ts: 1742882400000,
              alarmTitle: 'LEG1 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742882400000,
              alarmTitle: 'LEG2 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG4 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG3 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG4 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG1 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG2 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG3 VFD6 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742882400000,
              alarmTitle: 'LEG3 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742882400000,
              alarmTitle: 'LEG3 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG3 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG2 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'HULL LOAD IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG2 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742882400000,
              alarmTitle: 'LEG2 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG3 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742882400000,
              alarmTitle: 'LEG4 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742882400000,
              alarmTitle: 'LEG2 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG3 VFD2 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742882400000,
              alarmTitle: 'LEG4 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG1 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG4 VFD3 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742882400000,
              alarmTitle: 'LEG4 VFD1 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742882400000,
              alarmTitle: 'LEG1 VFD6 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742882400000,
              alarmTitle: 'LEG4 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742882400000,
              alarmTitle: 'LEG2 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG1 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742882400000,
              alarmTitle: 'LEG2 VFD11 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 1,
              ts: 1742846400000,
              alarmTitle: 'LEG3 VFD8 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742846400000,
              alarmTitle: 'LEG4 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742846400000,
              alarmTitle: 'LEG2 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742846400000,
              alarmTitle: 'LEG1 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742846400000,
              alarmTitle: 'LEG2 VFD6 SPEED IO ERROR',
            },
            {
              total: 4,
              ts: 1742846400000,
              alarmTitle: 'LEG3 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742846400000,
              alarmTitle: 'LEG3 VFD6 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742846400000,
              alarmTitle: 'LEG3 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742846400000,
              alarmTitle: 'LEG1 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742846400000,
              alarmTitle: 'LEG2 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742846400000,
              alarmTitle: 'LEG3 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742846400000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 4,
              ts: 1742846400000,
              alarmTitle: 'LEG3 VFD5 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742846400000,
              alarmTitle: 'LEG1 VFD4 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742846400000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742846400000,
              alarmTitle: 'LEG4 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742846400000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742846400000,
              alarmTitle: 'LEG3 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742846400000,
              alarmTitle: 'LEG4 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742846400000,
              alarmTitle: 'LEG3 VFD3 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742846400000,
              alarmTitle: 'LEG3 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742846400000,
              alarmTitle: 'LEG4 VFD11 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742846400000,
              alarmTitle: 'LEG1 VFD6 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742846400000,
              alarmTitle: 'LEG2 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742846400000,
              alarmTitle: 'LEG4 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742846400000,
              alarmTitle: 'LEG2 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742846400000,
              alarmTitle: 'LEG1 VFD9 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG1 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG4 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG3 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG4 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG3 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG2 VFD4 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742835600000,
              alarmTitle: 'LEG1 VFD2 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742835600000,
              alarmTitle: 'LEG2 VFD6 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742835600000,
              alarmTitle: 'LEG3 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG3 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742835600000,
              alarmTitle: 'LEG3 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG2 VFD8 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742835600000,
              alarmTitle: 'HULL LOAD IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG1 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG2 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG3 VFD9 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742835600000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG3 VFD5 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742835600000,
              alarmTitle: 'LEG4 VFD8 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742835600000,
              alarmTitle: 'LEG1 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742835600000,
              alarmTitle: 'LEG1 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742835600000,
              alarmTitle: 'LEG4 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG2 VFD3 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742835600000,
              alarmTitle: 'LEG4 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742835600000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742835600000,
              alarmTitle: 'LEG3 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG4 VFD9 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742835600000,
              alarmTitle: 'LEG4 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG1 VFD1 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742835600000,
              alarmTitle: 'LEG4 VFD1 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742835600000,
              alarmTitle: 'LEG4 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG2 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742835600000,
              alarmTitle: 'LEG4 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742835600000,
              alarmTitle: 'LEG2 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742835600000,
              alarmTitle: 'LEG2 VFD11 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 1,
              ts: 1742893200000,
              alarmTitle: 'LEG3 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742893200000,
              alarmTitle: 'LEG3 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742893200000,
              alarmTitle: 'LEG1 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742893200000,
              alarmTitle: 'LEG4 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742893200000,
              alarmTitle: 'LEG1 VFD8 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 1,
              ts: 1742871600000,
              alarmTitle: 'LEG1 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742871600000,
              alarmTitle: 'LEG1 VFD11 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742871600000,
              alarmTitle: 'LEG3 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742871600000,
              alarmTitle: 'LEG4 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742871600000,
              alarmTitle: 'LEG4 VFD2 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742871600000,
              alarmTitle: 'LEG3 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742871600000,
              alarmTitle: 'LEG2 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742871600000,
              alarmTitle: 'LEG1 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742871600000,
              alarmTitle: 'LEG3 VFD11 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742871600000,
              alarmTitle: 'LEG3 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742871600000,
              alarmTitle: 'LEG3 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742871600000,
              alarmTitle: 'HULL LOAD IO ERROR',
            },
            {
              total: 1,
              ts: 1742871600000,
              alarmTitle: 'LEG1 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742871600000,
              alarmTitle: 'LEG3 VFD9 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742871600000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742871600000,
              alarmTitle: 'LEG4 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742871600000,
              alarmTitle: 'LEG4 VFD9 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742871600000,
              alarmTitle: 'LEG4 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742871600000,
              alarmTitle: 'LEG3 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742871600000,
              alarmTitle: 'LEG4 VFD4 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742871600000,
              alarmTitle: 'LEG3 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742871600000,
              alarmTitle: 'LEG4 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742871600000,
              alarmTitle: 'LEG1 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742871600000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742871600000,
              alarmTitle: 'LEG2 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742871600000,
              alarmTitle: 'LEG1 VFD9 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 2,
              ts: 1742860800000,
              alarmTitle: 'LEG1 VFD12 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742860800000,
              alarmTitle: 'LEG1 VFD11 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742860800000,
              alarmTitle: 'LEG1 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG2 VFD1 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742860800000,
              alarmTitle: 'LEG3 VFD4 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742860800000,
              alarmTitle: 'LEG4 VFD7 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742860800000,
              alarmTitle: 'LEG4 VFD2 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742860800000,
              alarmTitle: 'LEG3 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG2 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG2 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG2 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG3 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG3 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG2 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG2 VFD2 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742860800000,
              alarmTitle: 'LEG3 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG1 VFD7 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742860800000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG4 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742860800000,
              alarmTitle: 'LEG4 VFD10 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742860800000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG4 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG1 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG4 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG1 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG4 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG4 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG3 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG1 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG2 LOAD TOTAL IO ERROR',
            },
            {
              total: 2,
              ts: 1742860800000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742860800000,
              alarmTitle: 'LEG2 VFD5 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742860800000,
              alarmTitle: 'LEG1 VFD9 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742860800000,
              alarmTitle: 'LEG2 VFD11 SPEED IO ERROR',
            },
          ],
          [
            {
              total: 2,
              ts: 1742850000000,
              alarmTitle: 'LEG1 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG1 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742850000000,
              alarmTitle: 'LEG3 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG3 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG4 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG2 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG1 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG3 VFD11 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG3 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG3 VFD7 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG1 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG3 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG3 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG2 VFD2 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG3 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG1 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG3 VFD5 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG4 VFD8 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742850000000,
              alarmTitle: 'LEG2 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG4 LOAD TOTAL IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG2 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG4 VFD10 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742850000000,
              alarmTitle: 'LEG2 VFD10 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG1 VFD8 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG1 VFD1 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG4 VFD1 SPEED IO ERROR',
            },
            {
              total: 3,
              ts: 1742850000000,
              alarmTitle: 'LEG3 VFD3 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG4 VFD4 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG4 VFD11 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742850000000,
              alarmTitle: 'LEG4 VFD12 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG4 VFD6 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG2 VFD5 SPEED IO ERROR',
            },
            {
              total: 2,
              ts: 1742850000000,
              alarmTitle: 'LEG1 VFD9 SPEED IO ERROR',
            },
            {
              total: 1,
              ts: 1742850000000,
              alarmTitle: 'LEG2 VFD11 SPEED IO ERROR',
            },
          ],
        ],
        titleTypeList: [
          'LEG4 VFD7 SPEED IO ERROR',
          'LEG1 VFD12 SPEED IO ERROR',
          'LEG2 VFD1 SPEED IO ERROR',
          'LEG3 VFD8 SPEED IO ERROR',
          'LEG2 VFD8 SPEED IO ERROR',
          'LEG1 VFD11 SPEED IO ERROR',
          'LEG4 VFD5 SPEED IO ERROR',
          'LEG4 VFD2 SPEED IO ERROR',
          'LEG2 VFD6 SPEED IO ERROR',
          'LEG1 VFD10 SPEED IO ERROR',
          'LEG2 VFD4 SPEED IO ERROR',
          'LEG3 VFD4 SPEED IO ERROR',
          'LEG2 VFD9 SPEED IO ERROR',
          'LEG3 VFD1 SPEED IO ERROR',
          'LEG3 VFD6 SPEED IO ERROR',
          'LEG1 VFD5 SPEED IO ERROR',
          'LEG1 VFD2 SPEED IO ERROR',
          'LEG3 VFD7 SPEED IO ERROR',
          'LEG3 VFD12 SPEED IO ERROR',
          'LEG3 VFD10 SPEED IO ERROR',
          'HULL LOAD IO ERROR',
          'LEG1 LOAD TOTAL IO ERROR',
          'LEG2 VFD2 SPEED IO ERROR',
          'LEG3 VFD11 SPEED IO ERROR',
          'LEG2 VFD7 SPEED IO ERROR',
          'LEG3 VFD5 SPEED IO ERROR',
          'LEG3 VFD9 SPEED IO ERROR',
          'LEG1 VFD4 SPEED IO ERROR',
          'LEG1 VFD3 SPEED IO ERROR',
          'LEG4 VFD8 SPEED IO ERROR',
          'LEG1 VFD7 SPEED IO ERROR',
          'LEG2 VFD12 SPEED IO ERROR',
          'LEG3 VFD3 SPEED IO ERROR',
          'LEG3 VFD2 SPEED IO ERROR',
          'LEG4 LOAD TOTAL IO ERROR',
          'LEG4 VFD9 SPEED IO ERROR',
          'LEG4 VFD3 SPEED IO ERROR',
          'LEG2 VFD10 SPEED IO ERROR',
          'LEG2 VFD3 SPEED IO ERROR',
          'LEG4 VFD10 SPEED IO ERROR',
          'LEG1 VFD8 SPEED IO ERROR',
          'LEG1 VFD1 SPEED IO ERROR',
          'LEG4 VFD4 SPEED IO ERROR',
          'LEG4 VFD1 SPEED IO ERROR',
          'LEG2 VFD5 SPEED IO ERROR',
          'LEG3 LOAD TOTAL IO ERROR',
          'LEG4 VFD11 SPEED IO ERROR',
          'LEG1 VFD9 SPEED IO ERROR',
          'LEG4 VFD12 SPEED IO ERROR',
          'LEG1 VFD6 SPEED IO ERROR',
          'LEG4 VFD6 SPEED IO ERROR',
          'LEG2 LOAD TOTAL IO ERROR',
          'LEG2 VFD11 SPEED IO ERROR',
        ],
      },
      selectDataexport: null,
      dialogVisible: false,
      exportBtnShow: true,
      //下拉选项
      Equipmentsurvival: [
        {
          deviceName: 'AIR CONDITIONER & REFRIGERATION SYSTEM',
          deviceCode: 'air_conditioner_refrigeration_system_device1',
          productCode: 'air_conditioner_refrigeration_system',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.561+00:00',
          activeTime: '2025-03-25T05:32:52.561+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'AMS-PC AFT-PC4',
          deviceCode: 'ams_pc_device4',
          productCode: 'ams_pc',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:51.565+00:00',
          activeTime: '2025-03-25T05:32:51.565+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'AFT-PC4',
        },
        {
          deviceName: 'AMS-PC AUX-PC2',
          deviceCode: 'ams_pc_device2',
          productCode: 'ams_pc',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:51.892+00:00',
          activeTime: '2025-03-25T05:32:51.892+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'AUX-PC2',
        },
        {
          deviceName: 'AMS-PC FWD-PC3',
          deviceCode: 'ams_pc_device3',
          productCode: 'ams_pc',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:51.565+00:00',
          activeTime: '2025-03-25T05:32:51.565+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'FWD-PC3',
        },
        {
          deviceName: 'AMS-PC MAIN-PC1',
          deviceCode: 'ams_pc_device1',
          productCode: 'ams_pc',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:51.891+00:00',
          activeTime: '2025-03-25T05:32:51.891+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'MAIN-PC1',
        },
        {
          deviceName: 'AMS-SAU 1',
          deviceCode: 'ams_sau_device1',
          productCode: 'ams_sau',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.887+00:00',
          activeTime: '2025-03-25T05:32:52.887+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'AMS-SAU 2',
          deviceCode: 'ams_sau_device2',
          productCode: 'ams_sau',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.887+00:00',
          activeTime: '2025-03-25T05:32:52.887+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'BUZZER AFT-WHC',
          deviceCode: 'buzzer_device3',
          productCode: 'buzzer',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:53.237+00:00',
          activeTime: '2025-03-25T05:32:53.237+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'AFT-WHC',
        },
        {
          deviceName: 'BUZZER ECC',
          deviceCode: 'buzzer_device1',
          productCode: 'buzzer',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.888+00:00',
          activeTime: '2025-03-25T05:32:52.888+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'ECC',
        },
        {
          deviceName: 'BUZZER FWD-WHC',
          deviceCode: 'buzzer_device2',
          productCode: 'buzzer',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.889+00:00',
          activeTime: '2025-03-25T05:32:52.889+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'FWD-WHC',
        },
        {
          deviceName: 'CO2 RELEASE ALARM SYSTEM',
          deviceCode: 'co2_release_alarm_system_device1',
          productCode: 'co2_release_alarm_system',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.887+00:00',
          activeTime: '2025-03-25T05:32:52.887+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'COMPRESSED AIR SYSTEM',
          deviceCode: 'compressed_air_system_device1',
          productCode: 'compressed_air_system',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.561+00:00',
          activeTime: '2025-03-25T05:32:52.561+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'COOLING WATER SYSTEM',
          deviceCode: 'cooling_water_system_device1',
          productCode: 'cooling_water_system',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:53.237+00:00',
          activeTime: '2025-03-25T05:32:53.237+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'E/R UPS',
          deviceCode: 'e_r_ups_device1',
          productCode: 'e_r_ups',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.560+00:00',
          activeTime: '2025-03-25T05:32:52.560+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'EMERGENCY GENERATOR',
          deviceCode: 'emergency_generator_device1',
          productCode: 'emergency_generator',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:53.574+00:00',
          activeTime: '2025-03-25T05:32:53.574+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'EXTENDED ALARM PANEL C/E OFFICE',
          deviceCode: 'extended_alarm_panel_device2',
          productCode: 'extended_alarm_panel',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.223+00:00',
          activeTime: '2025-03-25T05:32:52.223+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'C/E OFFICE',
        },
        {
          deviceName: 'EXTENDED ALARM PANEL C/E ROOM',
          deviceCode: 'extended_alarm_panel_device1',
          productCode: 'extended_alarm_panel',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.223+00:00',
          activeTime: '2025-03-25T05:32:52.223+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'C/E ROOM',
        },
        {
          deviceName: 'EXTENDED ALARM PANEL LOUNGE ROOM',
          deviceCode: 'extended_alarm_panel_device3',
          productCode: 'extended_alarm_panel',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.223+00:00',
          activeTime: '2025-03-25T05:32:52.223+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'LOUNGE ROOM',
        },
        {
          deviceName: 'EXTENDED ALARM PANEL MEETING ROOM',
          deviceCode: 'extended_alarm_panel_device4',
          productCode: 'extended_alarm_panel',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.223+00:00',
          activeTime: '2025-03-25T05:32:52.223+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'MEETING ROOM',
        },
        {
          deviceName: 'EXTENDED ALARM PANEL MESS ROOM',
          deviceCode: 'extended_alarm_panel_device5',
          productCode: 'extended_alarm_panel',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.223+00:00',
          activeTime: '2025-03-25T05:32:52.223+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'MESS ROOM',
        },
        {
          deviceName: 'FLOWMETER',
          deviceCode: 'flowmeter_device1',
          productCode: 'flowmeter',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.887+00:00',
          activeTime: '2025-03-25T05:32:52.887+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'GAS DETECTION SYSTEM',
          deviceCode: 'gas_detection_system_device1',
          productCode: 'gas_detection_system',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.561+00:00',
          activeTime: '2025-03-25T05:32:52.561+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'GENERAL CHARGER AND DISCHARGER PANEL',
          deviceCode: 'general_charger_and_discharger_panel_device1',
          productCode: 'general_charger_and_discharger_panel',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.223+00:00',
          activeTime: '2025-03-25T05:32:52.223+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'LEVEL GAUGING',
          deviceCode: 'level_gauging_device1',
          productCode: 'level_gauging',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:52.560+00:00',
          activeTime: '2025-03-25T05:32:52.560+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'MAIN GENERATOR 1',
          deviceCode: 'baudouin_main_generator_device1',
          productCode: 'baudouin_main_generator',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:51.896+00:00',
          activeTime: '2025-03-25T05:32:51.896+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'MAIN GENERATOR 2',
          deviceCode: 'main_generator_device1',
          productCode: 'main_generator',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:51.564+00:00',
          activeTime: '2025-03-25T05:32:51.564+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'MAIN GENERATOR 3',
          deviceCode: 'main_generator_device2',
          productCode: 'main_generator',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:51.564+00:00',
          activeTime: '2025-03-25T05:32:51.564+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'MAIN GENERATOR 4',
          deviceCode: 'main_generator_device3',
          productCode: 'main_generator',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:51.565+00:00',
          activeTime: '2025-03-25T05:32:51.565+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'MAIN GENERATOR 5',
          deviceCode: 'main_generator_device4',
          productCode: 'main_generator',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:51.564+00:00',
          activeTime: '2025-03-25T05:32:51.564+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
        {
          deviceName: 'MAIN GENERATOR 6',
          deviceCode: 'baudouin_main_generator_device2',
          productCode: 'baudouin_main_generator',
          deviceStatus: 2,
          latestOnlineTime: '2025-03-25T05:32:51.896+00:00',
          activeTime: '2025-03-25T05:32:51.896+00:00',
          deviceIp: '192.168.100.202',
          remarks: 'UNKNOWN',
        },
      ],

      //RESDATA
      res: {
        data: {
          results: [
            {
              itemNo: null,
              alarmName: 'LEG1 VFD6 SPEED IO ERROR',
              group: 'PLATFORM JACKING SYSTEM',
              alarmType: 'IOF',
              alarmTs: 1742893191019,
              ackTime: null,
              endTime: 1742893192024,
              sessionId: '1904458194871173121',
              deviceCode: 'platform_jacking_system_device1',
              alarmTitleType: 'platform_jacking_system_device1#leg1_vfd6_speed#IOF',
            },
            {
              itemNo: null,
              alarmName: 'LEG3 VFD10 SPEED IO ERROR',
              group: 'PLATFORM JACKING SYSTEM',
              alarmType: 'IOF',
              alarmTs: 1742893179012,
              ackTime: null,
              endTime: 1742893180036,
              sessionId: '1904458144166232066',
              deviceCode: 'platform_jacking_system_device1',
              alarmTitleType: 'platform_jacking_system_device1#leg3_vfd10_speed#IOF',
            },
            {
              itemNo: null,
              alarmName: 'LEG2 VFD1 SPEED IO ERROR',
              group: 'PLATFORM JACKING SYSTEM',
              alarmType: 'IOF',
              alarmTs: 1742893102004,
              ackTime: null,
              endTime: 1742893103026,
              sessionId: '1904457821812998146',
              deviceCode: 'platform_jacking_system_device1',
              alarmTitleType: 'platform_jacking_system_device1#leg2_vfd1_speed#IOF',
            },
            {
              itemNo: null,
              alarmName: 'LEG1 LOAD TOTAL IO ERROR',
              group: 'PLATFORM JACKING SYSTEM',
              alarmType: 'IOF',
              alarmTs: 1742892971051,
              ackTime: null,
              endTime: 1742892972092,
              sessionId: '1904457271847469058',
              deviceCode: 'platform_jacking_system_device1',
              alarmTitleType: 'platform_jacking_system_device1#leg1_load_total#IOF',
            },
            {
              itemNo: null,
              alarmName: 'LEG3 VFD9 SPEED IO ERROR',
              group: 'PLATFORM JACKING SYSTEM',
              alarmType: 'IOF',
              alarmTs: 1742892908052,
              ackTime: null,
              endTime: 1742892909056,
              sessionId: '1904457007983804417',
              deviceCode: 'platform_jacking_system_device1',
              alarmTitleType: 'platform_jacking_system_device1#leg3_vfd9_speed#IOF',
            },
            {
              itemNo: null,
              alarmName: 'LEG2 VFD3 SPEED IO ERROR',
              group: 'PLATFORM JACKING SYSTEM',
              alarmType: 'IOF',
              alarmTs: 1742892880020,
              ackTime: null,
              endTime: 1742892881034,
              sessionId: '1904456890027393025',
              deviceCode: 'platform_jacking_system_device1',
              alarmTitleType: 'platform_jacking_system_device1#leg2_vfd3_speed#IOF',
            },
            {
              itemNo: null,
              alarmName: 'LEG2 VFD6 SPEED IO ERROR',
              group: 'PLATFORM JACKING SYSTEM',
              alarmType: 'IOF',
              alarmTs: 1742892871022,
              ackTime: null,
              endTime: 1742892872061,
              sessionId: '1904456851662094338',
              deviceCode: 'platform_jacking_system_device1',
              alarmTitleType: 'platform_jacking_system_device1#leg2_vfd6_speed#IOF',
            },
            {
              itemNo: null,
              alarmName: 'LEG2 VFD7 SPEED IO ERROR',
              group: 'PLATFORM JACKING SYSTEM',
              alarmType: 'IOF',
              alarmTs: 1742892853019,
              ackTime: null,
              endTime: 1742892854011,
              sessionId: '1904456777171255297',
              deviceCode: 'platform_jacking_system_device1',
              alarmTitleType: 'platform_jacking_system_device1#leg2_vfd7_speed#IOF',
            },
            {
              itemNo: null,
              alarmName: 'LEG4 VFD1 SPEED IO ERROR',
              group: 'PLATFORM JACKING SYSTEM',
              alarmType: 'IOF',
              alarmTs: 1742892827049,
              ackTime: null,
              endTime: 1742892828009,
              sessionId: '1904456667691532290',
              deviceCode: 'platform_jacking_system_device1',
              alarmTitleType: 'platform_jacking_system_device1#leg4_vfd1_speed#IOF',
            },
            {
              itemNo: null,
              alarmName: 'LEG1 VFD5 SPEED IO ERROR',
              group: 'PLATFORM JACKING SYSTEM',
              alarmType: 'IOF',
              alarmTs: 1742892757021,
              ackTime: null,
              endTime: 1742892758014,
              sessionId: '1904456374111223809',
              deviceCode: 'platform_jacking_system_device1',
              alarmTitleType: 'platform_jacking_system_device1#leg1_vfd5_speed#IOF',
            },
          ],
          total: 1037,
          hasMore: true,
        },
      },

      deviceCode: 'AIR CONDITIONER & REFRIGERATION SYSTEM',
      total: 0,
      pageNo: 1,
      pageSize: 10,
      // 数据开发记录 *******

      Edit,
      CloseBold,
      Tickets,
      formData,
      column: column,
      data,

      isGraph: false,
      loading: true,
      selectDate: ['', ''],

      drawerFormData: {},
      params: { pageNo: 1, pageSize: 10, startTs: 1742806502437, endTs: 1742892902437, deviceCodeList: [''] },
      showNoData: false,

      totalAlarm: 0,
      shortcuts: [
        {
          text: 'LAST 1 HOUR',
          value: () => {
            const end = dayjs().utcOffset(0).format('YYYY-MM-DD HH:mm:ss')
            const start = dayjs().utcOffset(0).subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss')
            return [start, end]
          },
        },
        {
          text: 'LAST 1 DAY',
          value: () => {
            const end = dayjs().utcOffset(0).format('YYYY-MM-DD HH:mm:ss')
            const start = dayjs().utcOffset(0).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')
            return [start, end]
          },
        },
      ],
    }
  },
  components: {
    createDrawer,
    alarmChart,
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs?.baseTable?.search()
    })
  },
  methods: {
    //详情
    handleDetail(row) {
      this.$refs.createVoyage.open(row)
    },

    //图表数据
    toggleGraph() {
      this.isGraph = !this.isGraph
      this.exportBtnShow = !this.exportBtnShow
      if (this.isGraph == true) {
        this.post_alarm_chart()
      }
    },
    changeEquipement() {
      this.search()
    },
    search(from) {
      this.loading = true
      this.pageNo = 1
      const parmts = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }
      // parmts.startTs = utcDateToTimestamp(dayjs(this.selectDate[0]).format('YYYY-MM-DD HH:mm:ss'))
      // parmts.endTs = utcDateToTimestamp(dayjs(this.selectDate[1]).format('YYYY-MM-DD HH:mm:ss'))

      if (this.selectDate.length == 2) {
        if (this.selectDate[0] != '') {
          parmts.startTs = utcDateToTimestamp(dayjs(this.selectDate[0]).format('YYYY-MM-DD'))
          parmts.endTs = utcDateToTimestamp(dayjs(this.selectDate[1]).format('YYYY-MM-DD'), true)
          // parmts.startTs = utcDateToTimestamp(dayjs(this.selectDate[0]).format('YYYY-MM-DD'))
          // parmts.endTs = utcDateToTimestamp(dayjs(this.selectDate[1]).format('YYYY-MM-DD'), true)
        } else {
          // parmts.startTs = utcDateToTimestamp(dayjs(dayjs.utc().toDate()).format('YYYY-MM-DD'))
          // parmts.endTs = utcDateToTimestamp(dayjs(dayjs.utc().toDate()).format('YYYY-MM-DD'), true)
          parmts.startTs = dayjs.utc().subtract(1, 'day').valueOf()
          parmts.endTs = dayjs.utc().valueOf()
        }
      }
      parmts.deviceCodeList = [this.deviceCode]
      if (from?.itemName) {
        parmts.itemName = from.itemName
      }
      this.params = parmts
      if (this.isGraph == true) {
        this.post_alarm_chart()
      } else {
        this.postalarm_list_page()
      }
    },

    post_alarm_chart() {
      let { endTs, startTs, itemName } = this.params
      let deviceCode = this.params['deviceCodeList'][0]
      this.drawerFormData = this.res.data || []
      this.totalAlarm = 0 //初始化求和值
      this.drawerFormData?.chart?.forEach((item) => {
        item.forEach((childItem) => {
          this.totalAlarm += childItem.total
        })
      })
    },
    postalarm_list_page() {
      const parmts = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }
      // parmts.startTs = utcDateToTimestamp(dayjs(this.selectDate[0]).format('YYYY-MM-DD HH:mm:ss'))
      // parmts.endTs = utcDateToTimestamp(dayjs(this.selectDate[1]).format('YYYY-MM-DD HH:mm:ss'))

      if (this.selectDate.length == 2) {
        if (this.selectDate[0] != '') {
          parmts.startTs = utcDateToTimestamp(dayjs(this.selectDate[0]).format('YYYY-MM-DD HH:mm:ss'))
          parmts.endTs = utcDateToTimestamp(dayjs(this.selectDate[1]).format('YYYY-MM-DD HH:mm:ss'))
        } else {
          parmts.startTs = dayjs.utc().subtract(1, 'day').valueOf()
          parmts.endTs = dayjs.utc().valueOf()
        }
      }
      parmts.deviceCodeList = this.deviceCode ? [this.deviceCode] : []
      if (this.params.itemName) {
        parmts.itemName = this.params.itemName
      }
      this.data = this.res.data.results || []
      this.total = this.res.data?.total ?? 0
    },
  },
}
</script>
<style lang="scss" scoped>
@import url('../common.scss');
</style>
