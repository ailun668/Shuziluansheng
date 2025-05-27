import { ref, onMounted, computed } from "vue";

export default function () {
  let hooks = ref(12);
  let hooksVal = computed(() => {
    return hooks.value + 2;
  });
  function checkHooks () {
    hooks.value += 23;
  }
  onMounted(() => {
    console.log("Hooks 方法======");
    hooks.value *= 3;
  });
  return {
    hooks,
    checkHooks,
    hooksVal,
  };
}
