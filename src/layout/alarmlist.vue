<template>
  <div class="tabs hide-in-print">
    <div class="flex" style="height: 100%">
      <div class="tabs_01 flex">
        <div class="n1">Unchecked</div>
        <div class="n2" style="color: #e33e3e">3</div>
        <div class="n1">Today's Alarm</div>
        <div class="n2">163</div>
      </div>
      <div class="tabs_ce">
        <div class="flex">
          Last Alarm &nbsp;&nbsp;
          <div class="n1"><span>12:00:43</span> &nbsp;&nbsp; NO.1 DG MAIN POWER FALURE</div>
        </div>

        <div class="n2 bg">
          <!-- <div class="headerTitle">
            <div v-for="(item, index) in thList" :key="index">{{ item.name }}</div>
          </div> -->
          <table>
            <thead>
              <tr>
                <th v-for="(item, index) in thList" :key="index">{{ item.name }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(v, i) in 8" :key="i" @click="alarmfun(v, i)" :class="{ active: index == i }">
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 5</td>
              </tr>
            </tbody>
          </table>
          <!-- <table class="table table-hover">
            <thead>
              <tr>
                <th class="bgcolor">Alarm Code</th>
                <th class="bgcolor">Alarm Name</th>
                <th class="bgcolor">Alarm Type</th>
                <th class="bgcolor">Alarm Time</th>
                <th class="bgcolor">Checked Time</th>
                <th class="bgcolor" style="width: 22%">Signal Source</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(v, i) in 8" :key="i">
                <td>DG1_23</td>
                <td>NO.1 DG MAIN PORWE FAILURE</td>
                <td>DEVICE Error</td>
                <td>12:00:52</td>
                <td>...</td>
                <td>DG1</td>
              </tr>
            </tbody>
          </table> -->
        </div>
      </div>
      <div class="tabs_01 flex res">
        <div class="n2">
          <el-icon><SuccessFilled /></el-icon>Ack
        </div>
        <div class="n2" @click="playAudio">
          <el-icon v-if="isplay != false"><Bell /> </el-icon>
          <el-icon v-else><MuteNotification /></el-icon>
          {{ isplay != false ? ' Play' : 'Mute' }}
        </div>
        <div class="n2" @click="sgrouterlink('/alarm')">
          <el-icon
            ><el-icon><Document /></el-icon></el-icon
          >List
        </div>
        <audio ref="audioEl" src="./ding.mp3"></audio>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { alarms } from '@/store/module/user.js'
import { storeToRefs } from 'pinia'
const amsalarms = alarms()
let { playAudio, stopAudio } = amsalarms
let { audioEl, isplay } = storeToRefs(amsalarms)
let index = ref(0)
let thList = [
  {
    name: 'Alarm Code',
  },
  {
    name: 'Alarm Name',
  },
  {
    name: 'Alarm Type',
  },
  {
    name: 'Alarm Time',
  },
  {
    name: 'Checked Time',
  },
  {
    name: 'Signal Source',
  },
]
const alarmfun = (v, i) => {
  index.value = i
  console.log(v, i)
}
</script>
<style lang="scss" scoped>
.tabs {
  user-select: none;
  margin: 6px;
  height: 150px;
  padding: 8px 0px 0 0;
  background: $bgcolor;
  font-weight: 600;
  color: #fff;
  // border: 1px solid #848484;
  border-radius: 6px;
  .tabs_ce {
    flex: 1;
    gap: 10px;
    margin: 0 20px;
    .flex {
      align-items: center;
      margin-bottom: 6px;
    }
    .n2 {
      font-size: 12px;
      font-weight: 200;
      .headerTitle {
        display: flex;
        div {
          width: 20%;
        }
      }
      table {
        width: 100%;
        max-height: 200px;
        overflow-y: auto;
        position: relative;
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
      }
      th,
      td {
        border: 1px solid #ccc;
        text-align: left;
        width: 16.6%;
      }
      thead th {
        background-color: #777 !important;
        position: sticky;
        border: none;
        background: none;
        top: 0;
        z-index: 10;
        td {
          background-color: #777;
        }
      }
      tbody {
        display: block;
        height: 90px;
        overflow-y: auto;
        overflow-x: hidden;
        tr {
          td {
            padding: 6px 8px;
            cursor: pointer;
          }
          &:hover {
            background: #175a18;
          }
        }
      }

      tr {
        display: table;
        width: 100%;
      }
      tr.active {
        td {
          background: $c1;
        }
      }
    }
    .n1 {
      background: $bg1;
      border: 1px solid #fff;
      color: $c1;
      flex: 1;
      padding: 4px;
      border-radius: 3px;
    }
  }
  .tabs_01 {
    text-align: center;
    width: 170px;
    flex-direction: column;
    font-size: 16px;
    gap: 9px;
    align-self: center;
    .n2 {
      margin: 0px auto;
      width: 118px;
      height: 32px;
      line-height: 32px;
      border: 1px solid #e9ede9;
      text-align: center;
      border-radius: 6px;
      font-size: 22px;
    }
  }
  .tabs_01.res {
    align-self: center;
    gap: 15px;
    .n2 {
      width: 130px;
      cursor: pointer;
      .el-icon {
        margin-right: 6px;
        vertical-align: 3px;
        vertical-align: -3px;
      }
    }
  }
}
</style>
