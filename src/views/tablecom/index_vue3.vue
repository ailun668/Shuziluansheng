<template>
  <div style="width: 100%; height: 100%">
    <h1>表格组件 **********</h1>
    <div id="weather">
      <Table
        :data="data"
        :column="column"
        :formData="formData"
        :showIndex="true"
        :selection="false"
        :loading="loading"
        :border="true"
        :total="total"
        page,
        @search="search"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
        @reset="reset"
        size="small"
        ref="baseTable"
      >
        <template #weekDatePick>
          <el-date-picker
            v-model="selectDate"
            type="daterange"
            :placeholder="$t('selectPlease')"
            :start-placeholder="$t('startDate')"
            :end-placeholder="$t('endDate')"
            format="YYYY-MM-DD"
            :disabledDate="disabledDateFn"
            :clearable="false"
          />
        </template>
        <template #toolbar>
          <el-button @click="toggleGraph" type="primary">{{
            isGraph ? $t('datalist') : $t('graph')
          }}</el-button>
        </template>
        <template #tableBody v-if="isGraph">
          <div style="height: calc(100% - 100px); overflow: scroll">
            <p>数据表格页面</p>
            <p>数据表格页面</p>
            <p>数据表格页面</p>
            <p>数据表格页面</p>
            <p>数据表格页面</p>
            <p>数据表格页面</p>
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { column, data, formData } from './data.js';
import {
  utcDateToTimestamp,
  convertToUtcTimestamp,
  timestampToUtcFormat,
} from '@/utils/comment.js';
import dayjs from 'dayjs';
import Table from '@/components/table.vue';
const loading = ref(false);
const isGraph = ref(false);
const pageNo = ref(1);
const pageSize = ref(10);
const total = ref(0);
const startTime = ref('');
const endTime = ref('');
// let column = reactive(column);
// let data = reactive(data);

const selectDate = ref([]);
const search = () => {
  pageNo.value = 1;
  getList();
};
const getList = () => {
  loading.value = true;
  const params = {
    params: {
      page: pageNo.value,
      pageSize: pageSize.value,
    },
  };
  if (selectDate.value && selectDate.value.length) {
    params.params.startTime = timestampToUtcFormat(dayjs(selectDate.value[0]));
    params.params.endTime = timestampToUtcFormat(dayjs(selectDate.value[1]), true);
  }
  console.log(selectDate.value, '==');
};
const pageChange = (page) => {};
const pageSizeChange = (pageSize) => {};
const reset = () => {};
const toggleGraph = () => {
  isGraph.value = !isGraph.value;
};
const $t = (key) => {
  return key;
};
const disabledDateFn = (time) => {
  if (startTime.value && endTime.value) {
    return (
      utcDateToTimestamp(dayjs(time).format('YYYY-MM-DD')) <
        utcDateToTimestamp(dayjs(startTime.value).format('YYYY-MM-DD')) ||
      utcDateToTimestamp(dayjs(time).format('YYYY-MM-DD')) >
        utcDateToTimestamp(dayjs(endTime.value).format('YYYY-MM-DD'), true)
    );
  }
  //当没有传入特点的时间区间时,即为本周记录
  if (!startTime.value && !endTime.value) {
    const endTs = utcDateToTimestamp(dayjs(new Date()).format('YYYY-MM-DD'));
    const startTs = endTs - 6 * 24 * 60 * 60 * 1000;
    return (
      utcDateToTimestamp(dayjs(time).format('YYYY-MM-DD')) < startTs ||
      utcDateToTimestamp(dayjs(time).format('YYYY-MM-DD')) > endTs
    );
  }
};
</script>
<style  scss scoped>
</style>