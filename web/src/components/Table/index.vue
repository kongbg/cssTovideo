<template>
    <div class="table-container">
        <el-table v-bind="tableProps" v-loading="tableProps.loading" :data="tableData" style="width: 100%">
            <el-table-column v-bind="getColumnProps(column)" v-for="column in columns" :key="column.prop">
                <!-- headSlot -->
                <template v-slot="scope" v-if="column.headSlot" #header>
                    <slot :name="column.headSlot"></slot>
                </template>
                <!-- 序号 -->
                <template v-slot="{$scope, $index}" v-else-if="column.type == 'index'">
                    <div> {{ $index + 1 }} </div>
                </template>
                <!-- slot -->
                <template v-slot="scope" v-else-if="column.slot">
                    <slot :name="column.slot" :row="scope.row"></slot>
                </template>
                <!-- render -->
                <template v-slot="scope" v-else-if="column.render">
                    <component :is="column.render(scope)"></component>
                </template>
                <!-- dict -->
                <template v-slot="scope" v-else-if="column.dict">
                    {{ formatDict(scope.row[column.prop], column.dict) }}
                </template>
                <!-- default -->
                <template v-slot="scope" v-else>
                    {{ scope.row[column.prop] || scope.row[column.prop] === 0 ? scope.row[column.prop] : '-'}}
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="pagination-container">
        <el-pagination v-bind="paginationProps" />
    </div>
</template>

<script setup>
import { ref, useAttrs, defineModel, reactive, toRefs } from 'vue'
import { formatDict } from '@/utils/dict'

const columns = defineModel('columns')
const tableData = defineModel('tableData')
const attrs = toRefs(reactive(useAttrs()))
// console.log('attrs:', attrs)
const tableProps = ref({
    "empty-text": "暂无数据"
})
const paginationProps = ref({})
const columnProps = ref({})
function getColumnProps(column) {
    return Object.assign(column, columnProps.value)
}
function initProps() {
    let paginationPropsKeys = ['current-page', 'page-size', 'page-sizes', 'size', 'disabled', 'background', 'layout', 'total', 'onSizeChange', 'onCurrentChange', 'small']
    let columnKeys = ['align']
    for (const key in attrs) {
        if (paginationPropsKeys.includes(key)) {
            paginationProps.value[key] = attrs[key]
        } else if (columnKeys.includes(key)) {
            columnProps.value[key] = attrs[key]
        } else {
            tableProps.value[key] = attrs[key]
        }
    }
}

function init() {
    initProps()
}
init()
</script>


<style scoped lang="scss">
@import './table.scss';
@import './pagination.scss';
// .table-container {
//   :deep(.el-popper) {
//     max-width: 600px !important;
//   }
// }
// .pagination-container {
//     margin-top: 20px;
// }
</style>
