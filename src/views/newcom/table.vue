<template>
  <comtable :columns="columns" :data="tableData">
    <template #options="{ column, index, row }">
      <el-button size="small" type="danger" @click="deleteRow(column, index, row)">{{ $t('delete') }}</el-button>
      <el-button type="primary" size="small" @click="getDetail(column, index, row)">{{ $t('CerDes') }}</el-button>
    </template>
    <template #email="{ column, index, row }">
      我在测试
      <el-tag type="primary"> {{ fomartPaystage(Number(row.tenantId)) }}</el-tag>
    </template>
    <template #email2="{ column, index, row }">
      {{ row.phone }}
    </template>
  </comtable>
  <Drawer ref="drawer" v-model="vmodle" @confirm="confirm" :porseForm="porseForm">
    <el-form :model="ruleForm" :rules="rules" style="width: 600px" ref="ruleFormRef">
      <el-form-item label="邮箱" prop="pass">
        <el-input v-model="ruleForm.pass" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm.age" type="text" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #box="parmts">第一个组件测试 {{ parmts }} </template>
  </Drawer>
</template>

<script setup>
import { reactive, provide, toRefs, ref } from 'vue'
import comtable from '../../components/basetabel.vue'
import { ElMessageBox } from 'element-plus'
import { getData } from '@/axios/login.ts'
import { fomartPaystage } from '../router.js'
let ruleFormRef = ref()
let drawer = ref(null)
/* from 表单*/
let ruleForm = reactive({
  pass: '',
  age: '',
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

let vmodle = ref(false)
let columns = [
  {
    prop: 'id',
    label: 'id',
    align: 'center',
  },
  {
    prop: 'name',
    label: '姓名',
    align: 'center',
  },
  {
    prop: 'phone',
    label: '电话',
    align: 'center',
  },
  {
    prop: 'email',
    label: '邮箱',
    align: 'center',
  },
  {
    prop: 'email',
    label: '插槽',
    align: 'center',
    type: 'email',
    slots: 'email',
  },
  {
    prop: 'phone',
    label: '插槽2',
    align: 'center',
    type: 'email2',
    slots: 'email2',
  },
  {
    prop: 'options',
    label: '操作',
    width: 250,
    fixed: 'right',
    align: 'center',
    slots: 'options',
  },
]
let porseForm = {
  pass: '1222',
  age: '3333',
}
let tableData = reactive([])
// getData({}).then((res) => {
//   Object.assign(tableData, {
//     res,
//   });
// });
Object.assign(tableData, [
  {
    id: '1770005924094676992',
    name: '电灯泡船队46',
    phone: '电灯泡船队65',
    email: 10,
    boatList: null,
    description: '最强救援910队',
    createTime: 1710837272081,
    updateTime: 1710837272081,
    tenantId: '1',
  },
  {
    id: '1770005924094676992',
    name: '电灯泡船队46',
    phone: '电灯泡船队65',
    email: 10,
    boatList: null,
    description: '最强救援910队',
    createTime: 1710837272081,
    updateTime: 1710837272081,
    tenantId: '2',
  },
  {
    id: '1770005924094676992',
    name: '电灯泡船队46',
    phone: '电灯泡船队65',
    email: 10,
    boatList: null,
    description: '最强救援910队',
    createTime: 1710837272081,
    updateTime: 1710837272081,
    tenantId: '3',
  },
])

function deleteRow(index) {
  ElMessageBox.confirm('确认删除?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    customClass: 'messageBox',
    type: 'warning',
  }).then(async () => {
    // await tableData.splice(index, 1);
    // tableData.res.splice(index, 1);
  })
}

const getDetail = () => {
  vmodle.value = !vmodle.value
}
const confirm = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      let { pass, age } = toRefs(ruleForm)
      let parmts = {
        pass: pass.value,
        age: age.value,
      }
      Object.assign(ruleForm, parmts)
      console.log(ruleForm, '=====1')
      vmodle.value = false
    } else {
      //父亲调取儿子方法
      drawer.value.alertTitle()
      console.log(fields)
    }
  })
}
</script>

<style lang="scss" scoped></style>
