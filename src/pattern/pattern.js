
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'


//类模式 **************

const name3 = ref(9999);

const userName = ref("");
const password = ref("");
const code = ref("");
const sendNum = ref(0);
const sendInterval = ref(null);
const loading = ref(false);
const showActiveBox = ref(false);
const activeCode = ref("");
const isAgree = ref(false);
const isShowAgreeDialog = ref(false);
const isShowAgreeError = ref(false);

const route = useRoute();
const router = useRouter();

const form = {
    userName: userName.value,
    password: password.value,
    code: code.value,
};

const exportObject = {
    userName,
    password,
    code,
    form

};

function showname (path) {
    const { userName, password, code } = path;
    let path2 = { username: userName.value, password: password.value }
    console.log(path2);
}
class Employee2 {
    constructor(name, age) {
        this.name = name || "aaa";
        this.age = age || 222;
        this.name2 = ref(8888);
    }
    sayShow () {
        console.log(this.name, "=====2222");
    }
}

//构造器模式，这个有弊端 *************
function Employee (name, age) {
    this.name = name;
    this.age = age;
    this.sayName = () => {
        console.log(form, "=====from")
        console.log(this.name + ",===," + this.age);
    }
}
Employee.prototype.sayAage = function () {
    console.log("构造器模式--显示");
}


export default {
    exportObject,
    name: 'pattern',
    data: function () {
        return {
            shuju2: '测试数据99999999',
        }
    },
}

export {
    showname,
    form,
    name3,
    Employee,
    Employee2,

}
