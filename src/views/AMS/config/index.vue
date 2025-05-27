<template>
  <div class="alarmsbox" style="background: #fff; height: 85%">
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
          <el-select size="default" v-model="form.region" placeholder="please select your zone" style="width: 400px">
            <el-option label="DG1" value="DG1" />
            <el-option label="DG2" value="DG2" />
          </el-select>
          &nbsp;
          <el-input v-model="form.alarmkey" size="default" style="width: 340px" placeholder="Description or channel" />&nbsp;
          <el-button :loading="loading" size="default" @click="search" style="width: 340px"> search</el-button>
          <el-button :loading="loading" size="default" type="info" @click="reset"> reset </el-button>
          &nbsp; &nbsp;
          <el-button :loading="loading" size="default" @click="search"> Set Group</el-button>
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
        <el-table-column type="selection" width="110" align="center" />
        <el-table-column type="index" label="INDEX" align="center" width="120" />
        <el-table-column label="CHANNEL" align="left">
          <template #default="scope">{{ scope.row.n1 }}</template>
        </el-table-column>
        <el-table-column prop="n2" align="center" label="DESCRIPTION" />
        <el-table-column prop="n3" align="center" label="UNIT" />
        <el-table-column prop="n4" align="center" label="THRESHOLD(L.L.)" />
        <el-table-column prop="n5" align="center" label="THRESHOLD(L.)" />
        <el-table-column prop="n6" align="center" label="THRESHOLD(H.)" />
        <el-table-column prop="n7" align="center" label="THRESHOLD (H.H.)" />
        <el-table-column prop="n7" align="center" label="GROUP" />
        <el-table-column label="OPERATION" width="210" align="center">
          <template #default="scope"> <el-button type="success" @click="handview(scope)" class="elButton">Edit</el-button> </template>
        </el-table-column>
      </el-table>
      <div style="padding: 5px 10px" ref="pagination">
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
      form: {
        region: 'DG1',
        alarmkey: '',
      },
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
          n4: 1.3,
          // n5: '2020-05-12 12:00:00',
          n5: 2.3,
          n6: 'FAIL',
          n7: 'DG1_2',
          n8: 'data',
        },
        {
          n1: 'NO.1 DG LUBRICATING OiL PRESSURE',
          n2: '0.1',
          n3: 'Bar',
          n4: 1.3,
          // n5: '2020-05-12 12:00:00',
          n5: 2.3,
          n6: 'FAIL',
          n7: 'DG1_2',
          n8: 'data',
        },
        {
          n1: 'NO.1 DG LUBRICATING OiL PRESSURE',
          n2: '0.1',
          n3: 'Bar',
          n4: 1.3,
          // n5: '2020-05-12 12:00:00',
          n5: 2.3,
          n6: 'FAIL',
          n7: 'DG1_2',
          n8: 'data',
        },
        {
          n1: 'NO.1 DG LUBRICATING OiL PRESSURE',
          n2: '0.1',
          n3: 'Bar',
          n4: 1.3,
          // n5: '2020-05-12 12:00:00',
          n5: 2.3,
          n6: 'FAIL',
          n7: 'DG1_2',
          n8: 'data',
        },
        {
          n1: 'NO.1 DG LUBRICATING OiL PRESSURE',
          n2: '0.1',
          n3: 'Bar',
          n4: 1.3,
          // n5: '2020-05-12 12:00:00',
          n5: 2.3,
          n6: 'FAIL',
          n7: 'DG1_2',
          n8: 'data',
        },
        {
          n1: 'NO.1 DG LUBRICATING OiL PRESSURE',
          n2: '0.1',
          n3: 'Bar',
          n4: 1.3,
          // n5: '2020-05-12 12:00:00',
          n5: 2.3,
          n6: 'FAIL',
          n7: 'DG1_2',
          n8: 'data',
        },
        {
          n1: 'NO.1 DG LUBRICATING OiL PRESSURE',
          n2: '0.1',
          n3: 'Bar',
          n4: 1.3,
          // n5: '2020-05-12 12:00:00',
          n5: 2.3,
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
.el-pagination__goto {
  color: #fff !important;
}

::v-deep .el-pagination__goto,
::v-deep .el-pagination__total {
  color: #fff !important;
}

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
  }
}

.el-table {
  --el-table-border-color: #015841;
}
</style>
