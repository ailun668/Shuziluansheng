import { ref, onMounted, computed } from 'vue'

export default function () {
  let sum = ref(0)
  let text2 = ref('测试一个例子')
  let sumfun = () => {
    sum.value += 1
  }
  onMounted(() => {
    setInterval(() => {
      sum.value += 1
    }, 2000)
  })
  let qqb = {
    sum2: sum.value * 3,
  }

  const comPut = computed(() => {
    return {
      sum2: sum.value * 3,
    }
  })

  return { sum, text2, sumfun, comPut }
}
