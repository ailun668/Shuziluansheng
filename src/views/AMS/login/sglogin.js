import { ref, computed, onMounted, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import Api from "@/api/login.js";

export const isMobileLogin = localStorage.getItem("MobileFlag") ||
    window.vm.$route.query.flag === "mobile";
export default function () {
    const sendNum = ref(0);
    const sendInterval = ref(null);
    const loading = ref(false);
    const showActiveBox = ref(false);
    const isAgree = ref(false);
    const isShowAgreeDialog = ref(false);
    const isShowAgreeError = ref(false);
    const userName = ref("");
    const password = ref("");
    const code = ref("");
    const sgform = ref(null);
    const activeCode = ref("");
    const rules = {
        userName: [
            {
                required: true,
                message: "Please enter account",
                trigger: "blur",
            },
        ],
        password: [
            {
                required: true,
                message: "Please enter password",
                trigger: "blur",
            },
        ],
        code: [
            {
                required: true,
                message: "Please enter verification code",
                trigger: "blur",
            },
        ],
    };
    onMounted(() => {
        userName.value = "";
        password.value = "";
        code.value = "";
        sendNum.value = 0;
        isAgree.value = false;
        isShowAgreeError.value = false;
        showActiveBox.value = false;

        const instance = getCurrentInstance();
        if (instance) {
            const proxy = instance.proxy;
            proxy.sguserinfo();
        }
    });
    const form = computed(() => {
        return {
            userName: userName.value,
            password: password.value,
            code: code.value,
        }
    });
    const MSG = (txt, typ) => {
        ElMessage({
            message: txt,
            type: typ || "warning"
        });
    }
    const sendCode = () => {
        // 防止重复发送验证码
        if (sendNum.value > 0) return;
        // 检查用户名和密码是否已填写
        if (!userName.value || !password.value) {
            MSG("Please enter account and password");
            return;
        }
        sendNum.value = 60;
        sendInterval.value = setInterval(() => {
            sendNum.value--;
            if (sendNum.value <= 0) {
                clearInterval(sendInterval.value);
            }
        }, 1000);

        Api.sendCode({ username: userName.value, password: password.value });
    }
    const activating = async () => {
        try {
            const res = await Api.activateAccount({
                serialNumber: activeCode.value,
            });
            if (res.code === 200) {
                showActiveBox.value = false;
                MSG("Activation successful.", "success");

            } else {
                MSG("Activation failed.", "success");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return { rules, sendCode, MSG, sgform, form, sendNum, loading, showActiveBox, isAgree, isShowAgreeDialog, isShowAgreeError, userName, password, code, activating, activeCode };
}
