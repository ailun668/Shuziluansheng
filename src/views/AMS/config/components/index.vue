<template>
  <div>
    <el-drawer
      v-model="drawer"
      :direction="direction"
      :before-close="handleClose"
      :append-to-body="true"
      :size="drawerWidth"
      class="detail-per-day-drawer"
    >
      <template #header>
        <h4>Edit Channel</h4>
      </template>
      <template #footer>
        <el-button @click="handleClose(ruleFormRef)">{{ 'Cancel' }}</el-button>
        <el-button type="primary" @click="handleClose">{{ 'Confirm' }}</el-button>
      </template>

      <div class="alarmtxt">
        <el-form ref="ruleFormRef" size="default" :model="form" :rules="rules" :validate-on-rule-change="false" label-width="120px" label-position="left">
          <el-form-item label="Channel" prop="oldPassword">
            <el-input v-model="form.oldPassword"   clearable disabled="true" />
          </el-form-item>
          <el-form-item label="Description" prop="Description">
            <el-input v-model="form.Description"  placeholder="Please enter."  clearable  />
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { timestampToUtcFormat, utcDateToTimestamp } from '@/utils/comment.js'

export default {
  props: {
    direction: {
      type: String,
      default: 'rtl',
    },
    drawerWidth: {
      type: String,
      default: '30%',
    },
  },

  data() {
    return {
      form: {
        oldPassword: "DG1",
        Description:"",
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: 'Please enter.',
          },
        ],
        Description:[
          {
            required: true,
            message: 'Please enter.',
          },
        ]
      },

      drawer: false,
      title: '',
      tableData: [],
      loading: false,
      formData: {},
      total: 0,
      pageSize: 10,
      pageNo: 1,
    }
  },
  methods: {
    timestampToUtcFormat,
    async getlist() {
      try {
        const params = {
          timeUnit: 'DAYS',
          page: true,
          pageIndex: this.pageNo,
          pageSize: this.pageSize,
        }
        this.loading = true
        if (Object.keys(this.formData).length) {
          params.startTs = this.formData.startTs
          params.endTs = this.formData.endTs
          this.loading = true
          const res = await Api.fuelConsumptionDetail(params)
          this.tableData = res.data.results || []
          this.total = res.data.total ?? 0
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    open(title, row = {}) {
      this.drawer = true
      this.title = title
      // if (Object.keys(row).length > 0) {
      //     this.formData = row;
      //     this.getlist();
      // }
    },
    handleClose() {
      this.drawer = false
    },

    handleSizeChange() {
      this.PageNo = 1
      this.getlist()
    },
    handleCurrentChange() {
      this.getlist()
    },
  },
}
</script>

<style scoped lang="scss">
.alarmtxt {
  .el-row {
    margin-bottom: 10px;
  }
}
.detail-per-day-drawer .drawer-body {
  height: 100%;
}
.detail-per-day-drawer .el-drawer__header {
  border-bottom: 1px solid #d1d1d1;
  padding: 20px 16px;
  margin-bottom: 10px;
}
.detail-per-day-drawer .el-drawer__header {
  border-bottom: 1px solid #d1d1d1;
  padding: 20px 16px;
  margin-bottom: 10px;
}
.detail-per-day-drawer .el-drawer__footer {
  border-top: 1px solid #d1d1d1;
  padding: 10px;
}
</style>
