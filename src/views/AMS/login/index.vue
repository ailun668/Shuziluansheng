<template>
  <div class="title">SANGO AI</div>
  <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules" label-width="auto" class="demo-ruleForm">
    <el-form-item label="账户" prop="pass">
      <el-input v-model.trim="ruleForm.pass" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="age">
      <el-input v-model.trim="ruleForm.age" type="text" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button style="width: 100%" type="primary" @click="submitorm(ruleFormRef)">登录</el-button>

      <!-- <el-button type="success" @click="resetForm(ruleFormRef)">重置</el-button>
      <el-button type="success" @click="openDrawer()">打开弹窗 =={{ vmodle }}</el-button> -->
    </el-form-item>
  </el-form>
  <!-- <Drawer v-model="vmodle" :porseForm="porseForm" @confirm="confirm"></Drawer> -->
</template>
<script setup>
import { provide, reactive, ref, toRefs, unref, getCurrentInstance } from 'vue'
import Api from '@/axios/sglogin.js'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const { proxy } = getCurrentInstance()

const ruleFormRef = ref()
let vmodle = ref(false)
let ruleForm = reactive({
  pass: '',
  age: '',
})

const rules = reactive({
  pass: [
    {
      required: true,
      message: '请输入账户',
      trigger: 'blur',
    },
  ],
  age: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
})
let porseForm = reactive({})
const submitorm = async () => {
  // ruleFormRef.value.resetFields()
  const valid = await unref(ruleFormRef).validate()
  if (!valid) return
  // 验证通过
  // 验证通过后，可以发送请求
  Object.assign(porseForm, ruleForm)
  // {foodName: "葱炒蟹"
  // foodType: "生猛海鲜"}
  const parms = {
    foodName: porseForm.pass,
    foodType: porseForm.age,
  }
  const resdata = await Api.sglogin(parms)

  if (resdata !== true) {
    proxy.ElMessage('登录成功333', 'success')
    // proxy.$router.push('/home')
    router.push(`/demo`)
  }

  // ElMessage('success', '登录成功')

  // ruleFormRef.value.validate((valid) => {
  //   if (valid) {
  //     let { pass, age } = toRefs(ruleForm)

  //     let parmts = {
  //       pass: pass.value,
  //       age: age.value,
  //     }
  //     Object.assign(porseForm, parmts)
  //     // const resdata=await Api.sgaxios();
  //     console.log(parmts, '=====KKKK')
  //   } else {
  //     return false
  //   }
  // })
}
const openDrawer = () => {
  vmodle.value = !vmodle.value
}
const resetForm = () => {
  ruleFormRef.value.resetFields()
}
//事件返回处理
const confirm = async (parmts) => {
  vmodle.value = parmts[0]
  console.log(await parmts[1]['pass'], '======')
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
}
.demo-ruleForm {
  width: 80%;
  margin: 0px auto;
}
</style>
