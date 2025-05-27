<template>
  <div>表单校验</div>
  <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules" label-width="auto" class="demo-ruleForm">
    <el-form-item label="邮箱" prop="pass">
      <el-input v-model="ruleForm.pass" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="ruleForm.age" type="text" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitorm(ruleFormRef)">提交</el-button>
      <el-button type="success" @click="resetForm(ruleFormRef)">重置</el-button>
      <el-button type="success" @click="openDrawer()">打开弹窗 =={{ vmodle }}</el-button>
    </el-form-item>
  </el-form>
  <Drawer v-model="vmodle" :porseForm="porseForm" @confirm="confirm"></Drawer>
</template>
<script setup>
import { provide, reactive, ref, toRefs, unref } from 'vue'

const ruleFormRef = ref()
let vmodle = ref(false)
let ruleForm = reactive({
  pass: '111@qq.com',
  age: 'eeee',
})

const rules = reactive({
  pass: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: '请输入正确邮箱',
      trigger: ['blur', 'change'],
    },
  ],
  age: [
    {
      required: true,
      message: '请输入年龄',
      trigger: 'blur',
    },
  ],
})
let porseForm = reactive({})
const submitorm = () => {
  ruleFormRef.value.resetFields()

  ruleFormRef.value.validate((valid) => {
    if (valid) {
      let { pass, age } = toRefs(ruleForm)

      let parmts = {
        pass: pass.value,
        age: age.value,
      }
      Object.assign(porseForm, parmts)
      provide('persondata', porseForm)
      openDrawer()
    } else {
      console.log('error submit!')
      return false
    }
  })
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
