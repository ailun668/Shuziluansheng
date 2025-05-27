<template>
  <div style="width: 100%; height: 100%">
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
        :isShowFilter="false"
        page,
        @search="search"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
        @reset="reset"
        size="default"
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
          {{ size }} ===
          <el-button :size="size" @click="toggleGraph" type="primary">{{ isGraph ? $t('datalist') : $t('graph') }}</el-button>
          <el-button :size="size" type="primary" @click="handleAdd()">新增</el-button>
          <el-button :size="size" type="success">修改</el-button>
          <el-button :size="size" type="danger">删除</el-button>
        </template>
        <template #publish="{ row }">
          <el-tag :type="Number(row.publish) == 1 ? 'primary' : 'danger'">{{ fomartPaystage2(Number(row.publish)) }}</el-tag>
        </template>
        <template #options="{ row }">
          <el-link :icon="Edit" type="primary" @click="handleDetail(row, true)">详情</el-link>&nbsp;
          <el-link :icon="Tickets" type="primary" @click="handleDetail(row)">编辑</el-link>&nbsp;
          <el-link :icon="CloseBold" type="danger" @click="handleDelete1(row)">删除</el-link>&nbsp;
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="确定是否删除?"
            @confirm="handleDelete(row)"
            @cancel="cancelEvent"
          >
            <template #reference>
              <el-link :icon="CloseBold" type="danger">删除1</el-link>
            </template>
          </el-popconfirm>
        </template>
        <template #imgPath="{ row }">
          <img :src="row.imgPath" width="20" height="20" />
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
    <createDrawer ref="createVoyage" @refreshList="getList" />
  </div>
</template>
<script>
import { Edit, CloseBold, Tickets } from '@element-plus/icons-vue'
import { column, data, formData } from './data.js'
import { fomartPaystage } from '@/utils/status.js'
import { utcDateToTimestamp } from '@/utils/comment.js'
import dayjs from 'dayjs'
// import Table from '@/components/table.vue'
import { getAJAX, getData, postAJAX, postDelete } from '@/axios/login.ts'
import createDrawer from './components/createDrawer.vue'
import modal from '@/utils/plugins/modal.js'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  components: {
    // Table,
    createDrawer,
  },
  props: {
    startTime: {
      type: String,
      default: '',
    },
    endTime: {
      type: String,
      default: '',
    },
    filter: {
      type: Boolean,
      defautl: false,
    },
  },
  data() {
    return {
      Edit,
      CloseBold,
      Tickets,
      formData,
      column: column,
      data,
      total: 0,
      pageSize: 4,
      pageNo: 1,
      isGraph: false,
      loading: false,
      selectDate: [],
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.filter && (this.selectDate = [dayjs.utc().toDate(), dayjs.utc().toDate()])
      if (!this.startTime && !this.endTime) {
        this.initSearch()
      }
      this.getList()
    })
  },
  methods: {
    handleAdd() {
      this.$refs.createVoyage.open('CreateVoyage')
    },
    //详情
    handleDetail(row, type) {
      this.$refs.createVoyage.open('edit', row, type)
    },
    fomartPaystage2(val) {
      return fomartPaystage(val) || '-未知'
    },
    //获取数据
    async getList() {
      try {
        this.loading = true
        const params = {
          params: {
            page: this.pageNo,
            pageSize: this.pageSize,
          },
        }
        //展示图表时默认获取最新一周的7 * 24条数据
        if (this.isGraph) {
          params.params.page = 1
          params.params.pageSize = 168
        }

        if (this.selectDate[0]) {
          params.startTime = utcDateToTimestamp(dayjs(this.selectDate[0]).format('YYYY-MM-DD'))
        } else if (this.startTime) {
          params.startTime = this.startTime
        }
        if (this.selectDate[1]) {
          params.endTime = utcDateToTimestamp(dayjs(this.selectDate[1]).format('YYYY-MM-DD'), true)
        } else if (this.endTime) {
          params.endTime = this.endTime
        }
        if (params.startTime < this.startTime) {
          params.startTime = this.startTime ? this.startTime : params.startTime
        }
        if (params.endTime > this.endTime) {
          params.endTime = this.endTime ? this.endTime : params.endTime
        }
        // 每页显示3条记录，查询第2页内容：
        postAJAX({
          _page: this.pageNo,
          _limit: this.pageSize,
        }).then((res) => {
          this.total = res.length
          this.data = res
        })
      } finally {
        this.loading = false
      }
    },
    //删除
    handleDelete(params) {
      postDelete(params.id).then((res) => {
        if (res) {
          this.ElMessage('删除成功', 'success')
          this.getList()
        }
      })
    },
    //删除
    handleDelete1(params) {
      let _self = this
      modal
        .confirm('是否确认删除公告编号为"' + params.id + '"的数据项？')
        .then(function () {
          postDelete(params.id).then((res) => {
            if (res) {
              _self.ElMessage('删除成功', 'success')
              _self.getList()
            }
          })
        })
        .then(() => {
          return delNotice(params.id)
        })
        .catch(() => {})
    },

    disabledDateFn(time) {
      //控制表在一周以内
      if (this.startTime && this.endTime) {
        return (
          utcDateToTimestamp(dayjs(time).format('YYYY-MM-DD')) < utcDateToTimestamp(dayjs(this.startTime).format('YYYY-MM-DD')) ||
          utcDateToTimestamp(dayjs(time).format('YYYY-MM-DD')) > utcDateToTimestamp(dayjs(this.endTime).format('YYYY-MM-DD'), true)
        )
      }
      //当没有传入特点的时间区间时,即为本周记录
      if (!this.startTime && !this.endTime) {
        const endTs = utcDateToTimestamp(dayjs(new Date()).format('YYYY-MM-DD'))
        const startTs = endTs - 6 * 24 * 60 * 60 * 1000
        return utcDateToTimestamp(dayjs(time).format('YYYY-MM-DD')) < startTs || utcDateToTimestamp(dayjs(time).format('YYYY-MM-DD')) > endTs
      }
    },
    toggleGraph() {
      this.isGraph = !this.isGraph
      this.getList()
    },

    pageChange(pageNo) {
      this.pageNo = pageNo
      this.getList()
    },
    pageSizeChange({ pageSize, currentPage }) {
      this.pageSize = pageSize
      this.pageNo = currentPage
      this.getList()
    },
    search() {
      this.pageNo = 1
      this.getList()
    },
    //初始化成最新一周时间
    initSearch() {
      this.selectDate[0] = dayjs.utc().subtract(6, 'day').toDate()
      this.selectDate[1] = dayjs.utc().toDate()
    },
    reset() {
      this.pageNo = 1
      this.pageSize = 4
      if (this.startTime && this.endTime) {
        this.selectDate[0] = this.startTime
        this.selectDate[1] = this.endTime
      } else {
        this.initSearch()
      }
      this.$refs.baseTable.search()
    },
  },
  watch: {
    startTime: {
      handler(newVal, oldVal) {
        //日期选择器绑定的是一个数组 selectDate
        this.selectDate[0] = newVal
      },
      deep: true,
      immediate: true,
    },
    endTime: {
      handler(newVal, oldVal) {
        this.selectDate[1] = newVal
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>
<style scss scoped></style>
