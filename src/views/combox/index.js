import { ref, watch } from "vue";

export let refdata = ref({
  name: "ceee",
  target: "测试数据",
});

export let tagname = {
  name: 12,
  cab: () => {
    return {
      name2: tagname.name,
      age: 990,
    };
  },
};

export default {
  name: "ceee",
  target: ref(34),
};
