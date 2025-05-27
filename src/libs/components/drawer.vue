<template>
  <el-drawer
      :title="title"
      v-model="drawer"
      ref="elDrawer"
      :direction="direction"
      :show-close="showClose"
      :size="drawerWidth"
      v-loading="loading"
      v-bind="$attrs"
      :before-close="beforeClose"
      :destroy-on-close="destroyOnClose"
  >
      <template #header>
          <h4>{{ $t(this.title) }}</h4>
      </template>
      <template #default>
          <!-- 自定义内容 -->
          <slot name="custom"></slot>
          <el-form
              ref="form"
              :size="size"
              :model="form"
              :rules="rules"
              :label-width="formWidth"
              style="padding: 0 16px"
              :disabled="isDetail"
          >
              <el-form-item
                  v-for="item in formData"
                  v-show="item.isShow ? item.isShow(form) : true"
                  :key="item.label"
                  :label="item.tLabel || $t(item.label)"
                  :prop="item.field"
              >
                  <slot :name="item.slot" :form="form" :isDetail="isDetail">
                  </slot>
                  <slot :name="item.slots" :form="form" :isDetail="isDetail">
                      <el-input
                          style="width: 100%"
                          v-if="item.type === 'input'"
                          :disabled="item.disabled"
                          :placeholder="
                              isDetail ? '' :
                              item.placeholder
                                  ? $t(item.placeholder)
                                  : $t('inputPlease')
                          "
                          :clearable="item.clearable"
                          v-model.trim="form[item.field]"
                          v-bind="item.props || {}"
                      />
                      <el-select
                          style="width: 100%"
                          v-if="item.type === 'select'"
                          v-model="form[item.field]"
                          :placeholder="
                              isDetail ? '' :
                              item.placeholder
                                  ? $t(item.placeholder)
                                  : $t('selectPlease')
                          "
                          :clearable="item.clearable"
                          :disabled="item.disabled"
                      >
                          <el-option
                              v-for="s in item.options"
                              :disabled="s.disabled"
                              :key="s.label"
                              :label="$t(s.label)"
                              :value="s.value"
                          />
                      </el-select>
                      <el-date-picker
                          :size="size"
                          v-if="
                              item.type === 'datetimerange' ||
                              item.type === 'daterange' ||
                              item.type === 'month' ||
                              item.type === 'date'
                          "
                          v-model="form[item.field]"
                          :disabled="item.disabled"
                          :type="item.type"
                          :start-placeholder="
                              item.startData
                                  ? $t(item.startData)
                                  : $t('startDate')
                          "
                          :end-placeholder="
                              item.endDate
                                  ? $t(item.endDate)
                                  : $t('endDate')
                          "
                          :placeholder="
                              isDetail ? '' :
                              item.placeholder
                                  ? $t(item.placeholder)
                                  : $t('selectPlease')
                          "
                          :format="item.format || 'YYYY/MM/DD'"
                          :value-format="item.valueFormat || 'YYYY-MM-DD'"
                          v-bind="item.props || {}"
                      />
                  </slot>
              </el-form-item>
          </el-form>
          <slot name="custom-after" :form="form" :isDetail="isDetail"></slot>
      </template>

      <template #footer v-if="isFooter">
          <el-button @click="cancel" v-if="!isDetail" class="js-draw-btn-cancel">{{
              this.cancelText || $t("cancel")
          }}</el-button>
          <el-button type="primary" v-show="confirmisshow"  @click="confirm" class="js-draw-btn-confirm" :loading="loading">{{
              this.confirmText || $t("confirm")
          }}</el-button>
      </template>
  </el-drawer>
</template>
<script>
import { isFunction } from "lodash";

export default {
  props: {
    confirmisshow:{
      type: Boolean,
      default: false,
    },
      drawerWidth: {
          type: String,
          default: "30%",
      },
      direction: {
          type: String,
          direction: "rtl",
      },
      title: {
          type: String,
          default: "defaultTitle",
      },
      cancelText: {
          type: String,
          default: "",
      },
      confirmText: {
          type: String,
          default: "",
      },
      size: {
          type: String,
          default: "default",
      },
      formData: {
          type: Array,
          default: [],
      },
      formWidth: {
          type: String,
          default: "",
      },
      isFooter: {
          type: Boolean,
          default: true,
      },
      // 关闭前是否弹出确认保存的提示
      saveConfirm: {
          type: Boolean,
          default: false,
      },
      // 是否显示右上角×号
      showClose: {
          type: Boolean,
          default: false,
      },
      destroyOnClose: {
          type: Boolean,
          default: false,
      },
      loading: {
          type: Boolean,
          default: false,
      },
      // 校验规则，会被合并
      formRules: {
          type: Object,
          default: () => ({}),
      },
  },
  data() {
      return {
          drawer: false,
          form: {},
          // rules: {},
          // 是否是查看详情，如果为true
          // 表单将会被禁用
          // 底部按钮也会变为确认
          isDetail: false,
          isLoading: false,
          // isCloseFromConfirm: false,
      };
  },

  computed: {
      rules() {
          let rules = {};

          this.formData.forEach((item) => {
              // this.form[item.field] = "";
              let rule = this.formRules[item.field] || [];

              let message = this.$t('selectPlease')

              if ('input' === item.type) {
                  message = this.$t('inputPlease')
              }

              rules[item.field] = [
                  {
                      required: item.required,
                      message: item.message || message,
                      trigger: item.trigger || "change",
                  },
                  ...rule,
              ];
          });

          return rules;
      },
  },

  methods: {
      async open(data, isDetail = false) {
         
          this.drawer = true;
          this.isDetail = isDetail;
          // this.isCloseFromConfirm = false;

          if (isFunction(data)) {
              let getData = data;
              try {
                  data = await getData();
              } catch (err) {
                  console.error(err);
                  this.close();
                  return;
              } finally {
                  this.isLoading = false;
              }
          } else {
              this.isLoading = false;
          }

          if (data) {
              this.setFormData(data);
          } else {
              this.reSetForm();
          }

          // this.$nextTick(() => {
          //   this.$nextTick(() => {
          //     console.log('___clearValidate')
          //     this.$refs?.form?.clearValidate();
          //   });
          // });

          let timmer = setTimeout(() => {
              this.$refs?.form?.clearValidate();
              clearTimeout(timmer);
          }, 50);
      },
      close() {
          this.drawer = false;
      },
      reSetForm() {
          this.formData.forEach((item) => {
              this.form[item.field] = "";
              // this.rules[item.field] = [
              //   {
              //     required: item.required,
              //     message: item.message || `Please ${item.type}...`,
              //     trigger: item.trigger || "change",
              //   },
              // ];
          });
          this.$nextTick(() => {
              // console.log('___resetFields', this.form)
              this.$refs.form.resetFields();
          });
      },
      setFormData(data) {
          let newForm = {};
          Object.keys(data).forEach((v) => {
              console.log(v, data[v]);
              newForm[v] = data[v];
          });
          this.form = newForm;
          // console.log('___setFormData', this.form)
      },
      cancel() {
          // 在取消时判断是否出现确定弹窗，调用before-close
          this.$refs.elDrawer.handleClose();
          this.$emit("cancel", this.form);
          // this.drawer = false;
      },
      async confirm() {
          if (this.isDetail) {
              // this.isCloseFromConfirm = true;
              this.cancel();
              return;
          }

          await this.$refs.form.validate((valid, fields) => {
              if (valid) {
                  // this.isCloseFromConfirm = true;
                  this.$emit("confirm", this.form);
              } else {
                  console.log("error submit!", fields);
              }
          });
      },
      // handleClose() {
      //   this.drawer = false;
      // },

      async beforeClose(done) {
          if (!this.saveConfirm || this.isDetail) {
              done();
              return;
          }

          // let hasData = false;

          // // form不存在或为空对象
          // if(!(this.form&&Object.keys(this.form).length)){
          //     hasData = true;
          // }

          // for (let i in this.form) {
          //     if (
          //         undefined !== this.form[i] &&
          //         "" !== this.form[i] &&
          //         null !== this.form[i]
          //     ) {
          //         hasData = true;
          //     }
          // }

          // if (!hasData) {
          //     done();
          //     return;
          // }

          await this.$confirm(
              this.$t("confirmCloseNoSave"),
              this.$t("confirmCloseTitle"),
              {
                  type: "warning",
              }
          );

          done();
      },
  },
};
</script>
<style>
.el-drawer__header {
  border-bottom: 1px solid #d1d1d1;
  padding: 20px 16px;
  margin-bottom: 10px;
}
.el-drawer__footer {
  border-top: 1px solid #d1d1d1;
  padding: 10px;
}
</style>
