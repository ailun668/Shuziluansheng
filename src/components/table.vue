<template>
  <div v-if="isShowTableForm" class="table-form hide-in-print" ref="tableForm">
    <el-form ref="form" :size="size" :inline="true" :model="form" :rules="rules" :label-width="formWidth">
      <el-row :gutter="24">
        <el-col :span="formSpan" v-for="(item, index) in formData" :key="item.label">
          <el-form-item
            :style="{
              'margin-bottom': isLastRow(index, formData.length, 24 / formSpan) ? '0' : '18px',
            }"
            :label="$t(item.label)"
            :prop="item.field"
          >
            <slot :name="item.slot"></slot>
            <el-input
              v-if="item.type === 'input'"
              :placeholder="item.placeholder ? $t(item.placeholder) : $t('inputPlease')"
              :clearable="item.clearable"
              v-model="form[item.field]"
              :disabled="item.disabled"
            />
            <el-select
              v-if="item.type === 'select'"
              v-model="form[item.field]"
              :placeholder="item.placeholder ? $t(item.placeholder) : $t('selectPlease')"
              :clearable="item.clearable"
              :disabled="item.disabled"
              :filterable="item.filterable"
              :options="transSelectOptions(item.options)"
            >
              <el-option v-for="s in item.options" :disabled="s.disabled" :key="s.value" :label="s.tLabel || $t(s.label)" :value="s.value" />
            </el-select>
            <el-date-picker
              :size="size"
              :disabled-date="item.disabledDate"
              v-if="
                item.type === 'datetimerange' ||
                item.type === 'daterange' ||
                item.type === 'month' ||
                item.type === 'date' ||
                item.type === 'year' ||
                item.type === 'monthrange'
              "
              v-model="form[item.field]"
              :disabled="item.disabled"
              :type="item.type"
              :start-placeholder="item.startData ? $t(item.startData) : $t('startDate')"
              :end-placeholder="item.endDate ? $t(item.endDate) : $t('endDate')"
              :placeholder="item.placeholder ? $t(item.placeholder) : $t('selectPlease')"
              :format="item.format || 'YYYY/MM/DD'"
              :value-format="item.valueFormat || 'YYYY-MM-DD'"
            />
          </el-form-item>
        </el-col>
        <el-col :span="(24 / formSpan - (formData.length % (24 / formSpan))) * formSpan">
          <div class="flex flex-justify-start">
            <el-button v-if="addBtnShow" :loading="loading" :size="size" type="default" @click="add">
              {{ $t('Creat') }}
            </el-button>

            <el-button :size="size" :loading="loading" type="primary" @click="search">{{ $t('search') }}</el-button>
            <el-button :loading="loading" :size="size" type="info" @click="reset">
              {{ $t('reset') }}
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <div v-if="$slots.header" class="table-header">
    <slot name="header" />
  </div>
  <div ref="toolbar" class="table-toolbar-wrapper flex flex-align-center flex-justify-between hide-in-print" v-if="isShowToolbar && $slots.toolbar">
    <div>
      <slot name="toolbar" />
    </div>
    <div class="flex flex-align-center">
      <!-- 有bug筛选临时去掉 -->
      <el-popover v-if="!$slots.tableBody && isShowFilter" placement="bottom-end" trigger="click" width="220">
        <template #reference>
          <!-- Setting这个图标不能是18的尺寸，不然会导致页面卡顿 -->
          <el-icon class="cursor" size="17">
            <Setting />
          </el-icon>
        </template>

        <div class="setting-wrapper flex">
          <div class="flex flex-align-center flex-justify-between" v-for="item in sColumn" :key="item.label">
            <div class="flex flex-align-center" style="gap: 8px">
              <el-icon style="cursor: move">
                <Rank />
              </el-icon>
              <el-checkbox @change="columnShowHide(item)" v-model="item.show" :label="$t(item.label)" />
            </div>
            <div class="flex flex-align-center" style="gap: 10px">
              <el-icon class="cursor column-to-left" :color="item.fixed === 'left' ? 'var(--el-color-primary)' : ''" @click="columnToLeft(item)">
                <DArrowLeft />
              </el-icon>
              <el-icon class="cursor column-to-right" :color="item.fixed === 'right' ? 'var(--el-color-primary)' : ''" @click="columnToRight(item)">
                <DArrowRight />
              </el-icon>
            </div>
          </div>
        </div>
      </el-popover>
    </div>
  </div>

  <el-table
    v-if="!$slots.tableBody"
    ref="table"
    :data="data"
    style="width: 100%"
    :height="tableHeight || height"
    :max-height="tableHeight || height"
    :border="border"
    :size="size"
    @selection-change="selectionChange"
    :row-class-name="tableRowClassName"
    class="js-el-table"
    v-loading="loading"
    :header-cell-style="{ 'text-transform': 'uppercase' }"
    :header-cell-class-name="headerBg"
  >
    <template #empty>
      <el-empty></el-empty>
    </template>

    <el-table-column v-if="selection" type="selection" align="center" width="55"></el-table-column>
    <el-table-column v-if="showIndex" type="index" :label="$t('Index')" align="center" fixed="left" width="80"></el-table-column>

    <el-table-column
      v-for="item in column"
      :fixed="item.fixed"
      :prop="item.prop"
      :label="$t(item.label) + (item.utcTime ? $t('UTCTime') : '')"
      :width="item.width"
      :key="item.prop"
      :type="item.type"
      :align="item.align"
      v-bind="item.props"
    >
      <template v-if="item.slots" #default="{ column, $index, row }">
        <slot :name="item.slots" :column="column" :index="$index" :row="row" />
      </template>
      <!-- 通过 value 函数去自定义内容 -->
      <template v-else-if="item.value" #default="scoped">{{ item.value(scoped.row[item.prop], scoped) }}</template>
      <!-- utc时间转本地时间 -->
      <template v-else-if="item.utcToLocal" #default="scoped">{{ utcToLocal(scoped.row[item.prop]) }}</template>

      <!-- 以utc时间显示 -->
      <template v-else-if="item.utcTime" #default="scoped">{{ displayByUtc(scoped.row[item.prop]) }}</template>

      <!-- 添加自定义表头 -->
      <template #header="{ column, $index, row }" v-if="item.columnHeader">
        <slot name="columnHeader" :column="column" :index="$index" :row="row" />
      </template>
    </el-table-column>
  </el-table>

  <div v-if="!$slots.tableBody" ref="pagination" style="background: #fff" class="flex flex-align-center flex-justify-end pagination-wrap">
    <el-pagination
      v-show="isShowPagination"
      style="padding: 10px"
      :small="size === 'small'"
      :layout="paginationItemList"
      :total="total"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
  <div v-if="$slots.tableBody" class="table-body">
    <slot name="tableBody" />
  </div>
</template>
<script>
import { get, isString, toNumber, each, map } from 'lodash'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
let timer
let resizeEvent
export default {
  props: {
    size: {
      type: String,
      default: 'default',
    },
    border: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Array,
      default: [],
    },
    column: {
      type: Array,
      default: [],
    },
    data: {
      type: Array,
      default: [],
    },
    total: {
      type: Number,
      default: 10,
    },
    formSpan: {
      type: Number,
      default: 6,
    },
    formWidth: {
      type: String,
      default: '',
    },
    showForm: {
      type: Boolean,
      default: true,
    },
    showIndex: {
      type: Boolean,
      default: false,
    },
    addBtnShow: {
      type: Boolean,
      default: false,
    },
    selection: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    // 是否显示搜索条件
    isShowTableForm: {
      type: Boolean,
      default: () => true,
    },
    isShowToolbar: {
      type: Boolean,
      default: true,
    },

    // 是否显示筛选框
    isShowFilter: {
      type: Boolean,
      default: () => false,
    },
    isShowPagination: {
      type: Boolean,
      default: () => true,
    },
    // 指定表格的高度
    tableHeight: {
      type: Number,
    },
    tableRowClassName: {
      type: Function,
    },
    //自定义分页项
    paginationItemList: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    //3s后请求
    Btn3s: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isLastRow() {
      return (index, totalDivs, maxDivsPerRow) => {
        const totalRows = Math.ceil(totalDivs / maxDivsPerRow)
        const currentRow = Math.ceil((index + 1) / maxDivsPerRow)
        const isLastRow = currentRow === totalRows
        const isFullLastRow = totalDivs % maxDivsPerRow === 0 && isLastRow
        return isLastRow && !isFullLastRow
      }
    },
  },
  data() {
    return {
      form: {},
      rules: {},
      sColumn: [],
      height: 0,
      currentPage: 1,
      pageSize: 10,
      setTime: null,
    }
  },
  methods: {
    headerBg({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'handerBgClass'
      }
    },

    getHeight() {
      const parent = get(this.$refs.table, '$el.parentElement')
      if (!parent) {
        return
      }
      // const parent = this.$refs.table.$el.parentElement;
      const ph = parent.getBoundingClientRect().height
      const pah = this.$refs?.pagination?.getBoundingClientRect().height || 0
      const fh = this.$refs?.tableForm?.getBoundingClientRect().height || 0
      const th = this.$refs?.toolbar?.getBoundingClientRect().height || 0
      this.height = parseInt(ph - pah - fh - th - 10)
    },

    /**
     * @public
     * @param {object} [defaultConditions] - 设置搜索框的值
     */
    setForm(defaultConditions = {}) {
      this.formData.forEach((item) => {
        if (this.form[item.field] === undefined) {
          this.form[item.field] = ''
          this.rules[item.field] = [
            {
              required: item.required,
              message: item.message || `Please ${item.type}...`,
              trigger: item.trigger || 'change',
            },
          ]
        }
      })

      let form = { ...this.form }

      each(defaultConditions, (value, key) => {
        form[key] = value
      })

      this.form = form

      this.$refs?.form?.resetFields()
    },
    settingColumn() {
      this.sColumn = JSON.parse(JSON.stringify(this.column))
      this.sColumn.forEach((item) => {
        item.show = true
      })
    },
    add() {
      this.$emit('add', this.form)
    },
    reset() {
      this.currentPage = 1
      this.$refs?.form?.resetFields()
      this.$emit('reset', this.form)
    },
    async search() {
      await this.$refs.form.validate((valid, fields) => {
        if (valid) {
          if (this.Btn3s) {
            if (this.setTime) return
            this.setTime = setTimeout(() => {
              this.setTime = null
              this.currentPage = 1
              this.$emit('search', this.form)
            }, 3000)
          } else {
            this.currentPage = 1

            this.$emit('search', this.form)
          }
        } else {
          console.log('error submit!', fields)
        }
      })
    },
    selectionChange(selection) {
      this.$emit('selectionChange', selection)
    },
    handleCurrentChange() {
      this.$emit('pageChange', this.currentPage)
    },
    handleSizeChange() {
      this.currentPage = 1
      this.$emit('pageSizeChange', {
        currentPage: 1,
        pageSize: this.pageSize,
      })
    },
    columnToLeft(item) {
      const index = this.column.findIndex((i) => i.prop === item.prop)
      const c = this.column[index]
      if (item.fixed === 'left') {
        item.fixed = c.fixed = false
      } else {
        item.fixed = c.fixed = 'left'
      }
      console.log(this.sColumn)
    },
    columnToRight(item) {
      const index = this.column.findIndex((i) => i.prop === item.prop)
      const c = this.column[index]
      if (item.fixed === 'right') {
        item.fixed = c.fixed = false
      } else {
        item.fixed = c.fixed = 'right'
      }
    },
    columnShowHide(item) {
      const index = this.column.findIndex((i) => i.prop === item.prop)
      if (item.show) {
        this.column.splice(item.index, 0, item.column)
      } else {
        item.column = JSON.parse(JSON.stringify(this.column[index]))
        item.index = index
        this.column.splice(index, 1)
      }
    },

    // utc时间转本地时间
    utcToLocal(time) {
      if (!time) {
        return ''
      }

      if (isString(time)) {
        time = toNumber(time)
      }

      return dayjs.utc(time).local().format('YYYY-MM-DD HH:mm:ss')
    },

    // 以utc时间显示
    displayByUtc(time) {
      if (!time) {
        return ''
      }

      return dayjs.utc(time).format('YYYY-MM-DD HH:mm:ss')
    },

    // 计算下拉菜单的选项
    transSelectOptions(options) {
      return map(options, (e) => {
        return {
          disabled: e.disabled,
          key: e.value,
          label: e.tLabel || this.$t(e.label),
          value: e.value,
        }
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setForm()
      this.settingColumn()
      this.getHeight()
    })
    window.addEventListener(
      'resize',
      (resizeEvent = () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          this.getHeight()
        }, 40)
      }),
    )
  },
  beforeUnmount() {
    window.removeEventListener('resize', resizeEvent)
  },
}
</script>
<style scoped lang="scss">
.table-form {
  padding: 10px;
  background: #fff;
  margin-bottom: 10px;

  :deep(.el-form--inline .el-form-item) {
    margin-right: 0;
    width: 100%;
  }
}

.table-header {
  padding: 10px;
  background: #fff;
}

.table-toolbar-wrapper {
  padding: 10px 16px 10px 10px;
  background: #fff;
}

.setting-wrapper {
  flex-direction: column;
  font-size: 12px;
  gap: 4px;
  overflow: hidden;
}

.column-to-left :hover {
  color: var(--el-color-primary);
}

.column-to-right :hover {
  color: var(--el-color-primary);
}

.table-body {
  height: 100%;
  width: 100%;
}
</style>
