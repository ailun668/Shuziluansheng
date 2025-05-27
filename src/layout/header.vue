<template>
  <header class="header">
    <div class="flex flex-align-center" style="gap: 10px">
      <div class="collapse-btn flex flex-align-center">
        <img src="@/assets/images/logo3.png" alt="" /> &nbsp; | &nbsp; 
        <img src="@/assets/images/sango.png" alt="sango.png" />
      </div>
      <div class="routerlinks">
        <a href="javascript:void(0);" :class="item.url === $route.path ? 'active' : ''" v-for="item in routerlinks"
          :key="item.label" @click="sgrouterlink(item.url)" type="success">
          {{ item.label }}
        </a>
      </div>
    </div>
    <!-- 右侧 start -->
    <div class="right-tools">
      <div class="GMTTime" style="margin: 0 8px">
        <div style="margin-bottom: 8px">{{ LocaTime }}&nbsp;&nbsp;</div>
      </div>
      <!-- 翻译  start-->
      <!-- <div class="icon-wrap" style="margin: 0 8px">
        <span v-if="locale == 'zh'" class="language-icon" @click="checklangfun">
          <svg class="language" viewBox="0 0 1070 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2723">
            <path
              d="M232.58156522 358.13286957C244.86956522 394.4626087 265.17147826 425.984 293.48730435 453.76556522c24.04173913-26.17878261 42.2066087-58.23443478 53.96034782-95.63269565H232.58156522z"
              p-id="2724" />
            <path
              d="M981.61530435 143.36h-448.77913044L507.19165217 6.05495652h-416.72347826c-45.94643478 0-83.34469565 37.39826087-83.34469565 83.34469565v708.42991305c0 45.94643478 37.39826087 83.34469565 83.34469565 83.34469565h379.85947826l-30.45286956 137.30504348h541.74052174c45.94643478 0 83.34469565-37.39826087 83.34469565-83.34469565V226.70469565c0-45.94643478-37.39826087-83.34469565-83.34469565-83.34469565zM415.83304348 564.35756522c-49.152-18.16486957-89.75582609-41.13808696-122.34573913-67.85113044-34.19269565 30.45286957-76.93356522 52.89182609-126.61982609 66.7826087l-17.09634783-28.31582609c48.61773913-12.82226087 89.22156522-32.05565217 121.2772174-59.30295652-33.12417391-33.65843478-56.0973913-72.65947826-68.91965218-117.00313044h-46.48069565v-32.05565217H276.92521739c-7.47965217-13.89078261-17.09634783-27.24730435-28.31582609-40.06956522l32.05565218-11.75373913c11.21947826 14.42504348 21.37043478 31.5213913 30.45286956 51.28904348h115.9346087v32.05565218h-46.48069565c-14.95930435 45.94643478-36.32973913 84.41321739-64.64556522 115.40034782 31.5213913 25.11026087 71.05669565 45.94643478 117.5373913 63.04278261l-17.63060869 27.78156522z m607.45460869 370.24278261c0 22.97321739-18.69913043 41.67234783-41.67234782 41.67234782H492.23234783l20.83617391-95.63269565h156.53843478l-89.22156522-497.39686957-0.53426087 2.67130435-3.73982608-19.76765217 1.06852174 0.53426087-32.58991305-181.64869565H982.14956522c22.97321739 0 41.67234783 18.69913043 41.67234782 41.67234782v707.89565218z"
              p-id="2725" />
            <path
              d="M684.56626087 541.38434783h114.86608696v-30.45286957h-114.86608696V450.02573913h122.34573913v-30.45286956h-158.14121739v219.04695652h162.94956522V608.16695652h-127.15408696v-66.78260869z m239.88313043-65.71408696c-9.61669565 0-18.16486957 1.60278261-26.1787826 5.87686956-7.47965217 3.73982609-14.95930435 9.61669565-20.83617392 17.09634783V479.94434783h-34.72695652v158.67547826h34.72695652v-95.63269566c1.06852174-12.82226087 5.3426087-22.43895652 12.82226087-29.38434782 6.41113043-5.87686957 13.89078261-9.08243478 22.43895652-9.08243478 24.04173913 0 35.79547826 12.82226087 35.79547826 39.00104347v94.56417392h34.72695653v-97.76973913c1.06852174-43.27513043-19.2333913-64.64556522-58.76869566-64.64556522z"
              p-id="2726" />
          </svg>
        </span>

        <span v-else-if="locale == 'en'" class="language-icon" @click="checklangfun">
          <svg class="language" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1500">
            <path
              d="M580.1 477.7h-9.8L608 687.2c24.8-8.8 47.5-22.2 67.6-39.7-20.6-24.8-37.2-52.6-50.1-82.1l39.7-5.2c10.8 22.2 23.2 42.3 37.7 59.4 29.4-35.6 51.6-83.1 67.6-142.5l-190.4 0.6z m150.2 169.8c22.7 19.6 48.5 34.1 77.4 42.8l18.1 5.7-10.8 38.7-18.1-5.7c-34.6-10.8-66.6-28.9-93.9-53.2-25.3 22.7-55.2 40.3-87.7 51.1l25.3 141.4H489.8l-20.1 92.4H943c22.2 0 40.3-18.1 40.3-40.3V236.1c0-22.2-18.1-40.3-40.3-40.3H520.3l31.5 175.5-1-0.5 3.6 19.1 0.5-2.6 8.8 50.1h97.6v-40.3h75.4v40.3h125.9v40.3H810c-17.7 70.7-44.6 127.5-79.7 169.8zM448.5 867.9h-367C37.1 867.9 1 831.8 1 787.4V103.5C1 58.6 37.1 23 81.5 23h402.6l24.8 132.7h433.6c44.4 0 80.5 36.1 80.5 80.5v684.4c0 44.4-36.1 80.5-80.5 80.5H419.6l28.9-133.2zM258.6 558.2v-42.3h-79.5v-62.5h73.8v-41.8h-73.8v-53.2h79.5v-41.8h-126v241.6h126z m194 0V437.4c0-21.7-5.2-38.7-15-50.6-9.8-11.9-24.8-17.5-44.4-17.5-11.4 0-21.7 2.1-30.5 6.7s-16 11.9-20.6 20.6h-2.6l-6.2-23.7h-35.1v185.3h45.4V471c0-21.7 3.1-37.2 8.8-47 5.7-9.3 15-13.9 27.9-13.9 9.3 0 16 3.1 20.6 9.8 4.1 6.7 6.7 16.5 6.7 29.9v108.4h45z"
              p-id="1501" />
          </svg>
        </span>
      </div> -->
      <!-- 翻译 end -->
    </div>

    <changepwddialog v-model="isShowChangePwdDialog"></changepwddialog>
  </header>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
const route = useRoute()
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
import menuCollapse from '@/store/module/menu'
import tinycolor from 'tinycolor2'
import changepwddialog from './change-pwd-dialog.vue'
import sangoai from '@/store/module/user.js'
let amsuser = sangoai()


let { handleCommand, handStatus } = amsuser
let { Duty, Status, routerlinks } = storeToRefs(amsuser)

const { proxy } = getCurrentInstance()
const menuStore = menuCollapse()
let themeColor = ref('#0c151e')
let GMTTime = ref('')
let LocaTime = ref('')
let TimeZone = ref(0)
let timer = null

timer = window.setInterval(() => {
  LocaTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  GMTTime.value = dayjs().utcOffset(TimeZone.value).format('YYYY-MM-DD HH:mm:ss')
}, 1000)

let isShowChangePwdDialog = ref(false)
const locale = computed(() => {
  return proxy.$i18n.locale
})

const goPage = (path) => {
  proxy.$router.push({ path })
}
const logout = () => {
  localStorage.clear()
  sessionStorage.clear()
  proxy.$router.replace('/')
}
const collapseToggle = () => {
  menuStore.toggle()
}
const calculateColorVariants = (baseColor) => {
  const light3Color = tinycolor(baseColor).lighten(10).toString()
  const light5Color = tinycolor(baseColor).lighten(40).toString()
  const light7Color = tinycolor(baseColor).lighten(50).toString()
  const light8Color = tinycolor(baseColor).lighten(60).toString()
  const light9Color = tinycolor(baseColor).lighten(70).toString()
  const dark2Color = tinycolor(baseColor).darken(2).toString()
  return {
    '--el-color-primary': baseColor,
    '--el-color-primary-light-3': light3Color,
    '--el-color-primary-light-5': light5Color,
    '--el-color-primary-light-7': light7Color,
    '--el-color-primary-light-8': light8Color,
    '--el-color-primary-light-9': light9Color,
    '--el-color-primary-dark-2': dark2Color,
  }
}
const changeThemeColor = () => {
  const el = document.documentElement
  const totals = calculateColorVariants(themeColor.value)
  Object.keys(totals).forEach((color) => {
    getComputedStyle(el).getPropertyValue(color)
    el.style.setProperty(color, totals[color])
  })
}
/*onMounted(() => {
  window.innerWidth < 750 && collapseToggle()
  changeThemeColor()
})*/
</script>
<style scoped lang="scss">
.header {
  width: 100%;
  height: 80px;
  font-weight: 600;
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 21px;
  color: #fff;
  background: #091019;

  .curusr {
    background: #0c151e;
    padding: 3px 8px;
    border-radius: 2px;
    display: inline-block;
    width: 110px;
    text-align: center;
  }

  .routerlinks {
    display: flex;
    margin-left: 60px;

    a {
      display: block;
      color: #fff;
      font-weight: 600;
      font-size: 20px;
      margin-right: 45px;
      border-bottom: none;
      position: relative;
      height: 56px;
      line-height: 56px;

      &:hover {
        color: #fff;

        &:after {
          width: 90%;
          background: #fff;
        }
      }

      &:after {
        width: 0%;
        z-index: 3;
        content: '';
        position: absolute;
        height: 3px;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        transition: all 0.2s;
        border-radius: 4px;
      }
    }

    a.active {
      &:after {
        width: 90%;
        background: #fff;
      }
    }
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
      width: 100px;
      height: 50px;
    }
  }
}

.routerlinks .sguserInfo {
  margin: 8px 2px;
  padding: 4px;
}

.dropdown {
  outline: none;
  color: #333333;
}

.el-dropdown .el-avatar--circle {
  cursor: pointer;
}

.el-icon--right svg {
  width: 12px;
  height: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.log-out:hover {
  opacity: 0.85;
}

.log-out:active {
  opacity: 0.85;
  box-shadow: 0 2px 4px #535353;
}

.collapse-btn {
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.32s;
  user-select: none;

  img {
    height: 52px;
  }
}

:deep(.el-breadcrumb) {
  margin-bottom: 3px;
}

.icon-wrap {
  cursor: pointer;
  width: 40px;
  margin: 0 10px;
}

.language-icon {
  fill: #ed8000;
  position: relative;
  top: 2px;
  animation-delay: 0.2s;
}

.icon-wrap:hover .language-icon,
.message-box:hover .el-badge .message-icon {
  fill: var(--el-color-primary);
  color: var(--el-color-primary);
}

.right-tools {
  padding-right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;

  .message-box {
    margin-right: 20px;
    cursor: pointer;

    .message-icon {
      font-size: 24px;
    }
  }
}

.GMTTime {
  font-weight: 400;
  font-size: 20px;
  color: #cecfd3;

  div {
    font-size: 25px;
  }
}

.time-popover {
  .title {
    margin-bottom: 10px;
    font-size: 14px;
  }

  .time-zone-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .time-item {
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin-bottom: 10px;
      border: 1px solid #d4d7de;
      margin: 0 5px 10px;
      border-radius: 2px;
      cursor: pointer;
    }

    .time-item:hover {
      background: var(--el-color-primary);
      color: #fff;
      opacity: 0.5;
    }

    .time-item-active {
      background: var(--el-color-primary);
      color: #fff;
    }
  }

  .but-bottom {
    text-align: right;
    margin: 15px 0 0 0;
  }
}

.user-info {
  width: 100%;
}

.user-info>h2 {
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  text-align: center;
}

.tag-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100%;
  padding: 0 10px;
}
</style>
