<template>
  <div class="systembox">
    <div class="left"></div>
    <div class="right">
      <ol>
        <li class="active">
          <span>&nbsp;</span>ECC
          <el-badge class="item">
            <el-button>Check</el-button>
          </el-badge>
        </li>
        <li>
          <span>&nbsp;</span>FWD-WHC
          <el-badge class="item">
            <el-button>Check</el-button>
          </el-badge>
        </li>
        <li>
          <span>&nbsp;</span>AFT-WHC
          <el-badge class="item">
            <el-button>Check</el-button>
          </el-badge>
        </li>
        <li>
          <span>&nbsp;</span>CHIEF
          <el-badge class="item">
            <el-button>Check</el-button>
          </el-badge>
        </li>
        <li>
          <span>&nbsp;</span>CHIEF OFFICE
          <el-badge class="item">
            <el-button>Check</el-button>
          </el-badge>
        </li>
        <li>
          <span>&nbsp;</span>LOUNGE
          <el-badge class="item">
            <el-button>Check</el-button>
          </el-badge>
        </li>

        <li>
          <span>&nbsp;</span>MEETING
          <el-badge class="item">
            <el-button>Check</el-button>
          </el-badge>
        </li>

        <li>
          <span>&nbsp;</span>MESS
          <el-badge class="item">
            <el-button>Check</el-button>
          </el-badge>
        </li>
      </ol>
    </div>
  </div>
</template>
<style scoped lang="scss">
::v-deep .el-badge {
  float: right;

  .el-button--small {
    padding: 4px;
    font-size: 18px;
    padding: 13px 14px;
  }
}

.systembox {
  display: flex;
  gap: 15px;

  .left {
    flex: 1;
    background: url("@/assets/images/clipboard.png") no-repeat center;
    background-size: contain;
  }

  .right {
    background: #003366;
    width: 270px;
    border: 1px solid #d5d5d5;
    border-radius: 4px;

    ol {
      padding: 10px;
      color: #fff;

      li {
        margin-bottom: 26px;
        cursor: pointer;

        span {
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 10px;
          background: #797979;
        }
      }

      li.active {
        span {
          background: #e33e3e;
        }
      }
    }
  }
}
</style>
