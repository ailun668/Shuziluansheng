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
                    height="calc(100% - 50px)"
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
                        :label="getTitle('Date')"
                        align="center"
                    >
                        <template #default="{ column, index, row }">
                            {{ timestampToUtcFormat(row.ts, "YYYY-MM-DD") }}
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
                    <el-table-column :label="getTitle('Action')" align="center">
                        <template #default="{ column, index, row }">
                            <el-button type="text" @click="detail(row)">{{
                                getTitle("DetailsPerHour")
                            }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div
                    ref="pagination"
                    style="background: #fff"
                    class="flex flex-align-center flex-justify-end pagination-wrap"
                >
                    <el-pagination
                        style="padding: 10px"
                        :layout="'total, sizes, prev, pager, next, jumper'"
                        :total="total"
                        v-model:current-page="pageNo"
                        v-model:page-size="pageSize"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                    >
                    </el-pagination>
                </div>
            </div>
        </el-drawer>
        <detailDrawer ref="detailDrawer" />
    </div>
</template>

<script>
import dayjs from "dayjs";
import { timestampToUtcFormat, utcDateToTimestamp } from "@/utils/comment.js";
import detailDrawer from "./detailPerHourDrawer.vue";
import Api from "@/api/owl.js";
export default {
    props: {
        direction: {
            type: String,
            default: "rtl",
        },
    },
    components: {
        detailDrawer,
    },
    data() {
        return {
            drawer: false,
            title: "",
            tableData: [],
            loading: false,
            formData: {},
            total: 0,
            pageSize: 10,
            pageNo: 1,
        };
    },
    methods: {
        timestampToUtcFormat,
        async getlist() {
            //根据type 控制时间单位 0日 1小时 2分 3月 4季度 5周 6年。
            try {
                const params = {
                    pageIndex: this.pageNo,
                    pageSize: this.pageSize,
                    type: 0,
                };
                if (Object.keys(this.formData).length) {
                    params.startTs = this.formData.startTs;
                    params.endTs = this.formData.endTs;
                    this.loading = true;
                    const res = await Api.energyEfficiencyRecords(params);
                    this.tableData = res.data.results || [];
                    this.total = res.data.total ?? 0;
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
        detail(row) {
            this.$refs.detailDrawer.open("DetailsPerHour", row);
        },
        handleSizeChange() {
            this.PageNo = 1;
            this.getlist();
        },
        handleCurrentChange() {
            this.getlist();
        }
    },
};
</script>

<style scoped>
.drawer-body {
    height: 100%;
}
</style>
