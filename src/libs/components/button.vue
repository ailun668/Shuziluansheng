<template>
  <div :class="['btn', typeClass, btnbg ? 'btn-full' : 'btn-line']" @click="handfun">
    <i class="el-icon is-loading" v-show="loading"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
        <path fill="currentColor"
          d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z">
        </path>
      </svg></i>
    <i class="iconfont" :class="iconName">
      <slot></slot>
    </i>
    <div>{{ title }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  title: {
    type: String,
    required: 'primary',
  },
  btnbg: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  iconName: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'primary',
  },
})

const emit = defineEmits(['handleClick'])
const handfun = () => {
  if (props.loading) return
  emit('handleClick')
}
const typeClass = computed(() => {
  return `btn-${props.type}`
})
</script>
<style lang="scss" scoped>
.btn {
  padding: 0 10px;
  min-width: 94px;
  height: 32px;
  box-sizing: border-box;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 15px;

  .iconfont {
    margin-right: 3px;
    font-size: 16px;
  }
}

.btn-primary {
  &.btn {
    border: 1px solid var(--main-color);

    &.btn-line {
      color: var(--main-color);
    }

    &.btn-full {
      color: #fff;
      background: linear-gradient(39deg, var(--btn-linear-start) -40.63%, var(--btn-linear-end) 107.65%);

      &:hover {
        background: linear-gradient(0deg, var(--btn-linear-hover) 0%, var(--btn-linear-hover) 100%),
          linear-gradient(39deg, var(--btn-linear-start) -40.63%, var(--btn-linear-end) 107.65%);
      }
    }
  }

}

.btn-info,
.btn-disabled {
  &.btn {
    border: 1px solid var(--btn-info-color);

    &.btn-line {
      color: var(--btn-info-color);
    }

    &.btn-full {
      color: #fff;
      background: var(--btn-info-color);
    }
  }

}
</style>
