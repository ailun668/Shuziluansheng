<template>
  <div>
    <el-table :data="data" style="width: 100%">
      <el-table-column v-for="(item, index) in columns" :key="index" :prop="item.prop" :label="item.label"
        :align="item.align" :width="item?.width">
        <template v-if="item.slots" #default="{ column, $index, row }">
          <slot :name="item.slots" :column="column" :index="$index" :row="row" />
        </template>
        <!-- <template v-else-if="item.type" #default="{ column, $index, row }">
          <slot
            :name="item.slots"
            :column="column"
            :index="$index"
            :row="row"
          />
        </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { reactive, defineProps, inject } from "vue";
// import { getData } from "@/axios/login.ts";

defineProps(["columns", "data"]);

const deleteRow = inject("deleteRow");

let tabledata = reactive({});
// getData({}).then((res) => {
//   Object.assign(tabledata, { res });
// });

function handleClick (params) {
  onsole.log(params);
}
function update (params) {
  console.log(params);
}
</script>

<style lang="scss" scoped></style>
