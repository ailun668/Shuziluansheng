<template>
    <div>
        <el-drawer
            v-model="drawer"
            :direction="direction"
            :before-close="handleClose"
            :append-to-body="true"
        >
            <template #header>
                <h4>{{ getTitle(title) }}</h4>
            </template>
            <template #footer>
                <el-button @click="handleClose">{{
                    getTitle("Close")
                }}</el-button>
            </template>
            <div class="drawer-body">
                <el-table
                    ref="table"
                    :data="tableData"
                    style="width: 100%"
                    height="calc(100% - 70px)"
                    :border="border"
                    :size="size"
                    :loading="loading"
                    :header-cell-style="{ 'text-transform': 'uppercase' }"
                >
                    <el-table-column
                        type="index"
                        :label="getTitle('Index')"
                        align="center"
                        width="70"
                    />
                    <el-table-column
                        prop="ts"
                        :label="getTitle('Permintues')"
                        align="center"
                    >
                        <template #default="{ column, index, row }">
                            {{ timestampToUtcFormat(row.ts, "HH:mm") }}-{{
                                timestampToUtcFormat(row.ts + 60000, "HH:mm")
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        :label="getTitle('FuelConsumption')"
                        align="center"
                        width="150"
                    >
                        <template #default="{ column, index, row }">
                            {{ row.value }}m³
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import dayjs from "dayjs";
import { timestampToUtcFormat, utcDateToTimestamp } from "@/utils/comment.js";
import Api from "@/api/owl.js";
export default {
    props: {
        direction: {
            type: String,
            default: "rtl",
        },
    },
    data() {
        return {
            drawer: false,
            title: "",
            tableData: [],
            loading: false,
            formData: {},
        };
    },
    methods: {
        timestampToUtcFormat,
        async getlist() {
            //根据type 控制时间单位 0日 1小时 2分 3月 4季度 5周 6年。
            try {
                const params = {
                    type: 2,
                };
                if (Object.keys(this.formData).length) {
                    params.startTs = this.formData.ts;
                    params.endTs = params.startTs + 3600000 - 1;
                    this.loading = true;
                    const res = await Api.energyEfficiencyRecords(params);
                    this.tableData = res.data.results || [];
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        open(title, row = {}) {
            this.drawer = true;
            this.title = title;
            if (Object.keys(row).length > 0) {
                this.formData = row;
                this.getlist();
            }
        },
        handleClose() {
            this.drawer = false;
        },
    },
};
</script>
