export const Config = {
  formItem: [
    {
      field: "",
      label: "活动名称",
      type: "input",
      placeholder: "请输入名称",
    },
    {
      field: "",
      label: "活动地址",
      type: "input",
      placeholder: "请输入活动地址",
    },
    {
      field: "",
      label: "姓名",
      type: "input",
      placeholder: "请输入姓名",
      slot: "slots",
    },
  ],
  labelWidth: "100px",
};
import { ref } from "vue";
let acList = ref([
  { name: "张三", age: 18, sex: "男", active: false },
  { name: "李四", age: 19, sex: "女", active: false },
  { name: "王五", age: 20, sex: "男", active: false },
]);
const acClass = (item, path) => {
  if (item.active) {
    item.active = false;
  } else {
    path.forEach((item) => (item.active = false));
    item.active = true;
  }
};
export { acClass, acList };
