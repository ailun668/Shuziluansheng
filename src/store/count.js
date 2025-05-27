import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useAgeStore = defineStore('dinding', {
  state: () => {
    return {
      age: 30,
    }
  },
  getters: {
    gettersAge(stage) {
      return this.age + 5
    },
  },
  actions: {
    addCounter() {
      this.age++
    },
  },
})

export const userCounterStore = defineStore('counter', () => {
  const username = ref("Admin")
  let count = ref(0)
  let age = ref(20)
  const countfun = () => {
    count.value++
    age.value++
    username.value += 'pp'
  }
  const doubleCount = computed(() => count.value * 2)
  const countage = computed(() => {
    return age.value + count.value
  })

  return {
    count,
    username,
    age,
    doubleCount,
    countage,
    countfun,
  }
})
