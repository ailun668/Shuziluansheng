<template>
  <div class="monitor">
    <!-- 图表 start  -->
    <div class="chartbox">
      <chartbox />
    </div>
    <!-- 图表 end  -->

    <!-- 表格 -->
    <div class="tabbox">
      <el-table
        ref="table"
        class="table-alarm"
        :data="ConpressorDeviceData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        size="small"
        border
        :max-height="tableheight"
        :height="tableheight"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <!-- :header-cell-style="{ 'text-transform': 'uppercase' }" -->
        <el-table-column type="index" label="Index" align="center" width="60" />
        <el-table-column label="Alarm Name" align="center">
          <template #default="scope">{{ scope.row.alarmname }}</template>
        </el-table-column>
        <el-table-column prop="Value" width="110" align="center" label="Value" />
        <el-table-column prop="Unit" width="110" align="center" label="Unit" />
        <el-table-column prop="IO" width="110" align="center" label="I/O" />
        <el-table-column prop="Channel" width="110" align="center" label="Channel" />
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
    <!-- 表格 end -->
  </div>
</template>
<script>
let timer = null
import chartbox from './chartbox.vue'
export default {
  name: 'monitor',
  data() {
    return {
      height: 0,
      currentPage: '1', //当前页 刷新后默认显示第一页
      pageSize: '10', //每一页显示的数据量 此处每页显示6条数据
      ConpressorDeviceData: [
        {
          alarmname: 'NO.1 DG LUBRICATING OiL PRESSURE',
          Value: '0.1',
          Unit: 'Bar',
          IO: 'FAIL',
          Channel: 'DG1_1',
        },
        {
          alarmname: 'NO.1 DG LUBRICATING OiL PRESSURE',
          Value: '0.1',
          Unit: 'Bar',
          IO: 'FAIL',
          Channel: 'DG1_1',
        },
        {
          alarmname: 'NO.1 DG LUBRICATING OiL PRESSURE',
          Value: '0.1',
          Unit: 'Bar',
          IO: 'FAIL',
          Channel: 'DG1_1',
        },
        {
          alarmname: 'NO.1 DG LUBRICATING OiL PRESSURE',
          Value: '0.1',
          Unit: 'Bar',
          IO: 'FAIL',
          Channel: 'DG1_1',
        },
        {
          alarmname: 'NO.1 DG LUBRICATING OiL PRESSURE',
          Value: '0.1',
          Unit: 'Bar',
          IO: 'FAIL',
          Channel: 'DG1_1',
        },
        {
          alarmname: 'NO.1 DG LUBRICATING OiL PRESSURE',
          Value: '0.1',
          Unit: 'Bar',
          IO: 'FAIL',
          Channel: 'DG1_1',
        },
        {
          alarmname: 'NO.1 DG LUBRICATING OiL PRESSURE',
          Value: '0.1',
          Unit: 'Bar',
          IO: 'FAIL',
          Channel: 'DG1_1',
        },
        {
          alarmname: 'NO.1 DG LUBRICATING OiL PRESSURE',
          Value: '0.1',
          Unit: 'Bar',
          IO: 'FAIL',
          Channel: 'DG1_1',
        },
        {
          alarmname: 'NO.1 DG LUBRICATING OiL PRESSURE',
          Value: '0.1',
          Unit: 'Bar',
          IO: 'FAIL',
          Channel: 'DG1_1',
        },
        {
          alarmname: 'NO.1 DG LUBRICATING OiL PRESSURE',
          Value: '0.1',
          Unit: 'Bar',
          IO: 'FAIL',
          Channel: 'DG1_1',
        },
      ],
    }
  },
  components: {
    chartbox,
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
}
</script>
<style lang="scss" scoped>
.monitor {
  display: flex;
  gap: 8px;
  .chartbox {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }
  .chartbox,
  .tabbox {
    width: calc(100% / 2);
    border-radius: 4px;
    overflow: hidden;
    box-sizing: border-box;
    box-shadow: inset;
  }
  div.tabbox {
    width: 60%;
  }
}
</style>
