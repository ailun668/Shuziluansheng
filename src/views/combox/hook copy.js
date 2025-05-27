import { ref, onMounted, computed } from "vue";

export default function () {
  let hooks = ref(12);
  let hookval = computed(() => {
    return hooks.value += 3;
  })
  const chekcout = () => {
    hooks.value += 23;
  }
  onMounted(() => {
    console.log('hooks 方法');
  });

  return {
    hooks,
    chekcout,
    hooksval
  }
}