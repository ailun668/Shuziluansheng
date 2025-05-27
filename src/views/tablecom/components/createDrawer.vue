<template>
  <el-drawer v-model="drawer" :direction="direction" :before-close="handleClose" :append-to-body="true">
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <template #footer>
      <template v-if="!isADD">
        <el-button @click="handlesave" type="primary">保存</el-button>
        <el-button @click="handleClose"> 重置</el-button>
      </template>
      <template v-else>
        <el-button @click="handleClose">关闭</el-button>
      </template>
    </template>
    <div class="drawer-body">
      <el-form ref="form" :rules="rules" :model="formData" label-width="140px">
        <el-form-item label="状态" prop="publish">
          <el-input v-model="formData.publish" :disabled="isADD"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="foodName">
          <el-input v-model="formData.foodName" :disabled="isADD"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="foodType">
          <el-input v-model="formData.foodType" :disabled="isADD"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>
<script>
import { title } from 'process';

export default {
  props: {
    direction: {
      type: String,
      default: 'rtl'
    }
  },
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      drawer: false,
      formData: {
        publish: "",
        foodName: "",
      },
      title: "CreateVoyage",
      isADD: false,
    };
  },
  methods: {
    async handleClose () {
      this.drawer = false;
    },
    handlesave () {
      this.$refs.form?.validate(async (valid) => {
        // 更新表单验证结果
        if (valid) {
          let params = { ...this.formData };
          console.log(params, "======>>>>");
          this.reset();
          this.drawer = false;
          this.$emit('refreshList');
        }
      });
    },
    open (title, row = {}, type) {
      this.isADD = type || false;
      this.drawer = true;
      this.title = title || "";
      this.drawer = true;
      this.title = title;
      this.$refs.form?.clearValidate();
      this.formData = {}
      //非空时为编辑
      if (Object.keys(row).length > 0) {
        let temp = { ...row };
        this.formData = temp;
      }
    },
    reset () {
      this.drawer = false;
      this.formData = {};
      //   this.$refs.form?.clearValidate();
    },
  },
  computed: {
    title () {
      return this.isADD != true ? "编辑" : "详情";
    },
    rules () {
      return {
        publish: [
          {
            required: true,
            message: this.$t("pleaseenter") + this.$t("VoyageName"),
            trigger: "blur",
          },
        ],
        foodName: [
          {
            required: true,
            message:
              this.$t("pleaseenter") + this.$t("VoyageNumber"),
            trigger: "blur",
          },
        ],
        startTs: [
          {
            required: true,
            message: this.$t("pleaseenter") + this.$t("Starttime"),
            trigger: "change",
          },
        ],
        endTs: [
          {
            required: true,
            message: this.$t("pleaseenter") + this.$t("endttime"),
            trigger: "change",
          },
        ],
      };
    },
  }
}
</script>