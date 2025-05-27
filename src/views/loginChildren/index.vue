<template>
  <div class="AlarmIndexList">
    sdsdfsdfsdf
  </div>
</template>
<script setup>
let alarmList = [
  {
    n1: 'DG1',
    n2: 'ONLINE',
    n3: "Today's Alarm",
    n4: 'Unchecked',
    n5: '31',
    n6: '0',
    color: 'al1',
  },
  {
    n1: 'DG1',
    n2: 'ONLINE',
    n3: "Today's Alarm",
    n4: 'Unchecked',
    n5: '31',
    n6: '0',
    color: 'al4',
  },
  {
    n1: 'DG1',
    n2: 'ONLINE',
    n3: "Today's Alarm",
    n4: 'Unchecked',
    n5: '31',
    n6: '0',
    color: 'al3',
  },
  {
    n1: 'DG1',
    n2: 'ONLINE',
    n3: "Today's Alarm",
    n4: 'Unchecked',
    n5: '31',
    n6: '0',
    color: 'al1',
  },
  {
    n1: 'DG1',
    n2: 'ONLINE',
    n3: "Today's Alarm",
    n4: 'Unchecked',
    n5: '31',
    n6: '0',
    color: 'al4',
  },
  {
    n1: 'DG1',
    n2: 'ONLINE',
    n3: "Today's Alarm",
    n4: 'Unchecked',
    n5: '31',
    n6: '0',
    color: 'al3',
  },
  {
    n1: 'DG1',
    n2: 'ONLINE',
    n3: "Today's Alarm",
    n4: 'Unchecked',
    n5: '31',
    n6: '0',
    color: 'al1',
  },
  {
    n1: 'DG1',
    n2: 'ONLINE',
    n3: "Today's Alarm",
    n4: 'Unchecked',
    n5: '31',
    n6: '0',
    color: 'al4',
  },
  {
    n1: 'DG1',
    n2: 'ONLINE',
    n3: "Today's Alarm",
    n4: 'Unchecked',
    n5: '31',
    n6: '0',
    color: 'al3',
  },
  {
    n1: 'DG1',
    n2: 'ONLINE',
    n3: "Today's Alarm",
    n4: 'Unchecked',
    n5: '31',
    n6: '0',
    color: 'al1',
  },
]
</script>
<style lang="scss" scoped>
.AlarmIndexList {
  span.al1 {
    background: $c1 !important;
  }
  .al1 {
    color: $c1 !important;
  }

  span.al2 {
    background: $c2 !important;
  }
  .al2 {
    color: $c2 !important;
  }

  span.al3 {
    background: $c3 !important;
  }
  .al3 {
    color: $c3 !important;
  }

  .n1 {
    display: flex;
    border-bottom: 1px solid #fff;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #fff;
    font-weight: 600;
    padding: 0 15px;
    .n1_alarm {
      gap: 80px;
      display: flex;
      margin-left: 100px;
      div {
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          width: 20px;
          height: 20px;

          border-radius: 50%;
          margin-right: 10px;
        }
        span.alarm1 {
          background: $c1;
        }
        span.alarm4 {
          background: $c4;
        }
        span.alarm3 {
          background: $c3;
        }
      }
    }
  }
  .n2 {
    height: calc(98% - 82px);
    padding: 10px 15px;
    overflow-y: auto;
    display: flex;
    gap: 20px;
    align-content: flex-start;
    flex-wrap: wrap;
    .n2_list {
      width: calc(100% / 5 - 20px);
      height: 130px;
      background: $bg1;
      line-height: 100px;
      text-align: center;
      border: 1px solid #fff;
      border-radius: 8px;
      display: flex;
      flex-wrap: wrap;
      box-shadow: 6px 6px 7px 1px rgb(0 0 0 / 50%);
      div {
        width: calc(100% / 2);
        height: calc(100% / 3);
        line-height: 250%;
        color: #fff;
        font-weight: 600;
        span {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: #45a643;
          border-radius: 50%;
          margin-right: 10px;
          vertical-align: -10px;
        }
      }
    }
  }
}
</style>
