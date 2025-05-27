<template>
  <div class="alarmsbox" style="background: #fff; height: 83%">
    <!-- 表格 -->
    <div class="search">
      <!-- <div class="alarmsbox-title">
        Today’s Alarm
        <span>163</span>
        UnAcked
        <span class="active">163</span>
        Last Alarm
        <span class="flex1 active"> 12:00:43 NO.1 DG MAIN POWER FAILURE </span>
      </div> -->
      <div class="alarmsbox-search">
        <div class="left">
          <el-input v-model="alarmkey" size="default" style="width: 240px" placeholder="Description or channel" />&nbsp;
          <el-button :loading="loading" size="default" @click="search"> search</el-button>
          <el-button :loading="loading" size="default" type="info" @click="reset"> reset </el-button>
        </div>
        <div class="right">
          <div class="n2">
            <svg
              t="1718095187212"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1778"
              width="18"
              height="18"
            >
              <path
                d="M256 256V138.666667a53.393333 53.393333 0 0 1 53.333333-53.333334h405.333334a53.393333 53.393333 0 0 1 53.333333 53.333334v117.333333z m512 672a53.393333 53.393333 0 0 1-53.333333 53.333333H309.333333a53.393333 53.393333 0 0 1-53.333333-53.333333V640h512z m-213.333333-96a21.333333 21.333333 0 0 0-21.333334-21.333333H362.666667a21.333333 21.333333 0 0 0 0 42.666666h170.666666a21.333333 21.333333 0 0 0 21.333334-21.333333z m128 0a21.333333 21.333333 0 0 0-21.333334-21.333333h-42.666666a21.333333 21.333333 0 0 0 0 42.666666h42.666666a21.333333 21.333333 0 0 0 21.333334-21.333333z m0-128a21.333333 21.333333 0 0 0-21.333334-21.333333H362.666667a21.333333 21.333333 0 0 0 0 42.666666h298.666666a21.333333 21.333333 0 0 0 21.333334-21.333333z m298.666666-352v362.666667a53.393333 53.393333 0 0 1-53.333333 53.333333h-117.333333V640h21.333333a21.333333 21.333333 0 0 0 0-42.666667H192a21.333333 21.333333 0 0 0 0 42.666667h21.333333v128H96a53.393333 53.393333 0 0 1-53.333333-53.333333V352a53.393333 53.393333 0 0 1 53.333333-53.333333h832a53.393333 53.393333 0 0 1 53.333333 53.333333z m-85.333333 53.333333a21.333333 21.333333 0 1 0-21.333333 21.333334 21.333333 21.333333 0 0 0 21.333333-21.333334z"
                fill="#ffffff"
                p-id="1779"
              ></path>
            </svg>
            Printer STOP
          </div>
          <div class="n2">
            <el-icon v-if="isplay != false"><Bell /> </el-icon>
            <el-icon v-else><MuteNotification /></el-icon>
            {{ isplay != false ? ' Play' : 'Mute' }}
          </div>
          <div class="n2">
            <el-icon><CircleCheck /></el-icon>Ack
          </div>
          <div class="n2">
            <el-icon><CircleCheck /></el-icon>Ack All
          </div>
          <div class="n2">
            <el-icon><Remove /></el-icon>Clear
          </div>
          <div class="n2">
            <el-icon><Remove /></el-icon>Clear All
          </div>
        </div>
      </div>
    </div>
    <div class="tabbox" style="height: 100%">
      <el-table
        ref="table"
        class="table-alarm"
        :data="ConpressorDeviceData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        size="small"
        border
        :row-class-name="tableRowClassName"
        :max-height="tableheight"
        :height="tableheight"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column type="index" label="Index" align="center" width="70" />
        <el-table-column label="Alarm Name" width="400" align="left">
          <template #default="scope">{{ scope.row.n1 }}</template>
        </el-table-column>
        <el-table-column prop="n2" align="center" label="Value" />
        <el-table-column prop="n3" align="center" label="Unit" />
        <el-table-column prop="n4" align="center" label="Alarm Time" />
        <el-table-column prop="n5" align="center" label="Act Time" />
        <el-table-column prop="n6" align="center" label="I/O" />
        <el-table-column prop="n7" align="center" label="Channel" />
        <el-table-column label="Detail" align="center">
          <template #default="scope"> <el-button type="success" @click="handview(scope)" class="elButton">View</el-button> </template>
        </el-table-column>
      </el-table>
      <div style="padding: 5px 10px; display: none" ref="pagination">
        <el-pagination
          background
          layout="prev, pager, next,jumper, ->, total"
          :total="ConpressorDeviceData.length"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          style="text-align: center"
        >
        </el-pagination>
      </div>
    </div>
    <AlarmIndex ref="detailDrawer" />
  </div>
</template>
<script>
import { timestampToUtcFormat } from '@/utils/comment.js'
import dayjs from 'dayjs'
import AlarmIndex from './components/index.vue'
let timer = null
export default {
  name: 'alarmsbox',
  data() {
    return {
      isplay: false,
      alarmkey: '',
      loading: false,
      title: 'Electricdischarge',
      tableheight: 0,
      currentPage: '1', //当前页 刷新后默认显示第一页
      pageSize: '10', //每一页显示的数据量 此处每页显示6条数据
      ConpressorDeviceData: [
        {
          n1: 'NO.1 DG LUBRICATING OiL PRESSURE',
          n2: '0.1',
          n3: 'Bar',
          n4: timestampToUtcFormat('2020-05-12 16:22:00', 'HH:mm'),
          // n5: '2020-05-12 12:00:00',
          n5: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          n6: 'FAIL',
          n7: 'DG1_2',
          n8: 'data',
        },
        {
          n1: 'NO.1 DG LUBRICATING OiL PRESSURE',
          n2: '0.1',
          n3: 'Bar',
          n4: timestampToUtcFormat('2020-05-12 16:22:00', 'HH:mm'),
          // n5: '2020-05-12 12:00:00',
          n5: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          n6: 'FAIL',
          n7: 'DG1_2',
          n8: 'data',
        },
        {
          n1: 'NO.1 DG LUBRICATING OiL PRESSURE',
          n2: '0.1',
          n3: 'Bar',
          n4: timestampToUtcFormat('2020-05-12 16:22:00', 'HH:mm'),
          // n5: '2020-05-12 12:00:00',
          n5: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          n6: 'FAIL',
          n7: 'DG1_2',
          n8: 'data',
        },
        {
          n1: 'NO.1 DG LUBRICATING OiL PRESSURE',
          n2: '0.1',
          n3: 'Bar',
          n4: timestampToUtcFormat('2020-05-12 16:22:00', 'HH:mm'),
          // n5: '2020-05-12 12:00:00',
          n5: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          n6: 'FAIL',
          n7: 'DG1_2',
          n8: 'data',
        },
        {
          n1: 'NO.1 DG LUBRICATING OiL PRESSURE',
          n2: '0.1',
          n3: 'Bar',
          n4: timestampToUtcFormat('2020-05-12 16:22:00', 'HH:mm'),
          // n5: '2020-05-12 12:00:00',
          n5: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          n6: 'FAIL',
          n7: 'DG1_2',
          n8: 'data',
        },
        {
          n1: 'NO.1 DG LUBRICATING OiL PRESSURE',
          n2: '0.1',
          n3: 'Bar',
          n4: timestampToUtcFormat('2020-05-12 16:22:00', 'HH:mm'),
          // n5: '2020-05-12 12:00:00',
          n5: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          n6: 'FAIL',
          n7: 'DG1_2',
          n8: 'data',
        },
        {
          n1: 'NO.1 DG LUBRICATING OiL PRESSURE',
          n2: '0.1',
          n3: 'Bar',
          n4: timestampToUtcFormat('2020-05-12 16:22:00', 'HH:mm'),
          // n5: '2020-05-12 12:00:00',
          n5: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          n6: 'FAIL',
          n7: 'DG1_2',
          n8: 'data',
        },
      ],
    }
  },
  components: {
    AlarmIndex,
  },
  mounted() {
    this.$nextTick(() => {
      this.getHeight()
    })
    let resizeEvent = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.getHeight()
      }, 50)
    }
    window.addEventListener('resize', resizeEvent)
  },
  methods: {
    search() {},
    reset() {
      this.alarmkey = ''
    },

    handview(path) {
      // this.currentRow = row;
      this.$refs.detailDrawer.open('DetailsPerDay', path)
      // this.$refs.drawer.open()
      // this.sgtestStore.alerttext('等待产品原型中...', 'error')
    },
    handleSelectionChange(val) {
      // console.log(val, '=======>>>>')
    },
  },
}
</script>
<style lang="scss" scoped>
.search {
  padding: 10px;
  background: var(--main-page-bg);
  align-items: center;
  .alarmsbox-title {
    margin-bottom: 20px;
    font-weight: 600;
    color: #fff;
    font-size: 16px;
    display: flex;
    align-items: center;
    span {
      border: 1px solid #fff;
      border-radius: 4px;
      padding: 8px 6px;
      margin: 0 8px;
    }
    .flex1 {
      flex: 1;
    }
    span.active {
      color: #fff;
      margin-right: 0px;
      background-color: #e33e3e;
    }
  }
  .alarmsbox-search {
    display: flex;
    justify-content: space-between;
    .right {
      display: flex;
      gap: 18px;
      .n2 {
        cursor: pointer;
        margin: 0px auto;
        padding: 2px 8px;
        height: 32px;
        line-height: 32px;
        border: 1px solid #e9ede9;
        text-align: center;
        border-radius: 6px;
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        .el-icon {
          margin-right: 6px;
          vertical-align: -3px;
        }
      }
    }
  }
}
.el-table {
  --el-table-border-color: #015841;
}
</style>
