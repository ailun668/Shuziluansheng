<template>
  <el-dialog v-model="isShow" :title="getTitle('ChangePassword')" width="480px" :append-to-body="true"
    @close="onDialogClose">
    <!-- <div style="border:1px solid red;">
      <p> pinai1:== {{ username }} =={{ doubleCount }}
        <el-button @click="countfun()"> 点击</el-button>
      </p>
      <p>
        pinai2: <el-button @click="addCounter()">点击二 {{ age }}</el-button>
      </p>
    </div> -->
    <el-form ref="ruleFormRef" :model="form" :rules="rules" :validate-on-rule-change="false" label-width="180px"
      label-position="left">
      <el-form-item :label="getTitle('Account')" prop="username">

        <!-- <el-input v-model="username"></el-input> -->
        <el-input v-model="form.username" :placeholder="getTitle('pleaseenter') + getTitle('Account')" clearable
          :disabled="!!username" />
      </el-form-item>

      <el-form-item :label="getTitle('OldPassword')" prop="oldPassword">
        <el-input v-model="form.oldPassword" :placeholder="getTitle('pleaseenter') + getTitle('OldPassword')
          " type="password" show-password clearable />
      </el-form-item>

      <el-form-item :label="getTitle('NewPassword')" prop="newPassword">
        <el-input v-model="form.newPassword" :placeholder="getTitle('pleaseenter') + getTitle('NewPassword')
          " type="password" show-password clearable @blur="validateNewPassword" />
      </el-form-item>

      <el-form-item :label="getTitle('ConfirmNewPassword')" prop="checkPassword">
        <el-input v-model="form.checkPassword" :placeholder="getTitle('PleaseEnterNewPasswordAgain')" type="password"
          show-password clearable @blur="validateNewPassword" />
      </el-form-item>
      <!-- <el-form-item :label="getTitle('VerCode')" prop="code">
        <div class="code-box">
          <el-input v-model="form.code" :placeholder="getTitle('VerCode')" clearable class="code-input" />
          <el-button :disabled="sendNum > 0" class="code-but" type="primary" @click="validateAndSendCode">{{
            getTitle("SendCode") }}

            <div v-if="sendNum > 0">({{ sendNum }})</div>
          </el-button>
        </div>
      </el-form-item> -->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">{{
          getTitle("Cancel")
        }}</el-button>
        <el-button type="primary" @click="confirm">{{
          getTitle("Confirm")
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
// import LoginApi from "@/api/login.js";
import { userCounterStore, useAgeStore } from "../store/count.js";
import { ElMessage } from "element-plus";
import { ref, unref, reactive, defineProps, computed, getCurrentInstance, watch } from "vue";
import { storeToRefs } from "pinia";
import { getTitle } from "../utils/lang/index.js";
const { proxy } = getCurrentInstance();
const authStore = userCounterStore();
//方法直接解构
const { countfun } = authStore;
const { username, doubleCount } = storeToRefs(authStore);



const AgeStore = useAgeStore();
const { age } = storeToRefs(AgeStore);
const { addCounter } = AgeStore;


const mValue = ref(false);
const ruleFormRef = ref(null);

const form = reactive({
  username: username.value,
  oldPassword: "",
  newPassword: "",
  checkPassword: "",
  code: "",
});

const props = defineProps({
  modelValue: {
    type: String,
    default: () => { },
  },
});
let sendNum = ref(0);
let sendInterval = null;

/**
 * 新密码自定义校验
 * 判断两次新密码是否一致
 */
const validateNewPass = (rule, value, callback) => {
  if (value && form.newPassword && value !== form.newPassword) {
    callback(new Error(getTitle("NewPasswordMismatch")));
  } else {
    callback();
  }
}

const rules = {
  username: [
    {
      required: true,
      message: getTitle("pleaseenter") + getTitle("Account"),
    },
  ],
  oldPassword: [
    {
      required: true,
      message: getTitle("pleaseenter") + getTitle("OldPassword"),
    },
  ],
  newPassword: [
    {
      required: true,
      message: getTitle("pleaseenter") + getTitle("NewPassword"),
    },
  ],
  checkPassword: [
    {
      required: true,
      message: getTitle("PleaseEnterNewPasswordAgain"),
    },
    { validator: validateNewPass, trigger: 'blur' }
  ],
  code: [
    {
      required: true,
      message: getTitle("EnterCode"),
    },
  ],
};

const isShow = computed(() => {
  return props.modelValue;
});

watch(isShow, (newVal) => {
  if (newVal) {
    if (!ruleFormRef.value) return;
    ruleFormRef.value.resetFields();
    if (username.value) {
      form.username = username.value;
    }
  }
});

/**
 * 当新密码或确认新密码失去焦点时，验证两个字段是否一致
 */
const validateNewPassword = () => {
  ruleFormRef.value.validateField('newPassword');
  ruleFormRef.value.validateField('checkPassword');
};

/**
 * 发送验证码手动触发 oldPassword、newPassword 和 checkPassword 的校验
 */
const validateAndSendCode = () => {
  ruleFormRef.value.validateField('oldPassword', (oldPasswordValid) => {
    if (!oldPasswordValid) return;
    ruleFormRef.value.validateField('newPassword', (newPasswordValid) => {
      if (!newPasswordValid) return;
      ruleFormRef.value.validateField('checkPassword', (checkPasswordValid) => {
        if (checkPasswordValid) {
          sendCode();
        }
      });
    });
  });
};

const sendCode = () => {
  if (sendNum.value > 0) return;
  if (!form.username || !form.oldPassword) {
    ElMessage({
      message: getTitle("pleaseenter") + getTitle("OldPassword"),
      type: "warning",
    });
    return;
  }
  sendNum.value = 60;
  clearInterval(sendInterval);
  sendInterval = setInterval(() => {
    sendNum.value--;
    if (sendNum.value <= 0) {
      clearInterval(sendInterval);
    }
  }, 1000);
  // LoginApi.sendCode({
  //   username: form.username,
  //   password: form.oldPassword,
  // }).then((res) => { });
};

const confirm = async () => {
  try {
    await unref(ruleFormRef).validate();
    // let resData = await LoginApi.modifyPassword(form);
    // if (resData.code !== 200) {
    //   return;
    // }
    proxy.$emit("update:modelValue", false);
    ElMessage.success(getTitle("OperationSuccessful"));
  } catch (err) {
    console.error(err);
  }
};

function resetForm (formEl) {
  proxy.$emit("update:modelValue", false);
  if (!formEl) return;
  formEl.resetFields();
}
const onDialogClose = () => {
  clearInterval(sendInterval);
  sendNum.value = 0;
  sendInterval = null;
  proxy.$emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped>
.code-box {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .code-but {
    padding-right: 5px;
    padding-left: 5px;
    margin-left: 10px;
  }
}
</style>
