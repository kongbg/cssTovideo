<template>
    <div class="apps">
        <Tabsv2 v-model="activeType" :data="app_type" :props="{ label: 'dictLabel', value: 'dictValue' }"
            @handleClick="({ data }) => getData({ type: data.dictValue })"></Tabsv2>
        <CardList :data="tableInfo.tableData" @handleCreate="handleButton('create')"
            @handleClick="({ data, index }) => handleButton('view', data)"></CardList>
    </div>

    <!-- 新增、编辑弹窗 -->
    <FormDialog v-model="formVisible" :form="dialogForm" :rules="formRules" :config="formConfig" :loading="diaLogLoading"
        :type="mode" @submit="diaLogSubmit"></FormDialog>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({ name: "AppsIndex" });
</script>
<script setup>
import Tabsv2 from '@/components/Tabsv2/index.vue'
import CardList from '@/components/CardList/index.vue'
import FormDialog from '@/components/FormDialog/index.vue'
import { searchConfig, columns, formConfig, formRules } from './config.js'
import { create, update, getData as getList, getDetails, del } from '@/api/apps.js'
import { getData as getDicts } from '@/api/dict'

const router = useRouter()
const searchForm = ref({}) // 搜索组件表单数据
const col = 4 // 搜索组件每行数量
const gutter = 40 // 搜索组件每个条件之间间隔 单位：px
const tableInfo = ref({
    loading: false, // 列表loading
    tableData: [], // 列表数据
    currentPage: 1, // 当前页码
    pageSize: 10, // 每页条数
    pageSizes: [10, 20, 30, 40], // 可切换页码
    size: 'default', // 默认尺寸
    background: true, // 分页背景
    layout: "total, prev, pager, next, sizes, jumper",// 功能布局
    total: 0, // 总条数
})

const app_type = ref([])
const activeType = ref('')
const formVisible = ref(false) // x新增/编辑弹窗显示控制
const dialogForm = ref({}) // 弹窗表单
const diaLogLoading = ref(false) // 弹窗提交loading
const mode = ref('create') // 模式： create-新增 edit-编辑

function handleButton(type, row) {
    if (type === 'create') {
        dialogForm.value = {}
        mode.value = type
        formVisible.value = true
    } else if (type === 'edit') {
        dialogForm.value = { ...row }
        mode.value = type
        formVisible.value = true
    } else if (type === 'view') {
        router.push({
            path: 'action',
            query: {
                appId: row.id
            }
        })
    }
}

/**
 * 每页条数改成
 * @param {*} pageSize 每页条数
 */
function handleSizeChange(pageSize) {
    tableInfo.value.pageSize = pageSize
    getData()
}

/**
 * 当前页码改成
 * @param {*} currentPage 当前页码
 */
function handleCurrentChange(currentPage) {
    tableInfo.value.currentPage = currentPage
    getData()
}

/**
 * 获取列表数据
 * @param {*} playload 搜索条件
 */
async function getData(playload = {}) {
    let params = {
        page: tableInfo.value.currentPage,
        pageSize: tableInfo.value.pageSize,
    }
    Object.assign(params, playload)
    tableInfo.value.loading = true
    let res = await getList(params);
    tableInfo.value.loading = false
    if (res.code == 200) {
        tableInfo.value.tableData = res.data.list || []
        tableInfo.value.total = res.data.total

    } else {
    }
}

/**
 * 获取字典数据
 * @param {*}  dictType  字典类型
 */
async function getDict(dictType = '') {
    let params = {
        type: dictType,
        pageSize: 999,
    }
    let res = await getDicts(params);
    tableInfo.value.loading = false
    if (res.code == 200) {
        return res.data.list

    } else {
        return []
    }
}

/**
 * 重置搜索条件
 * @param {*} data 搜索表单数据
 */
function handleReset(data) {
    searchForm.value = data
    getData(searchForm.value)
}
/**
 * 搜索
 */
function handleSearch() {
    getData(searchForm.value)
}

/**
 * 弹窗提交事件
 * @param {*} type  模式： create-新增 edit-编辑
 * @param {*} data  需要提交的数据
 */
async function diaLogSubmit({ type, data }) {
    diaLogLoading.value = true

    let api = type == 'create' ? create : update;
    let action = type == 'create' ? '新增' : '编辑'

    let res = await api(data);
    diaLogLoading.value = false
    if (res.code == 200) {
        console.log(`${action}成功！`)
        formVisible.value = false
        getData()
    } else {
        console.log(`${action}失败！`)
    }
}

/**
 * 页面数据初始化
 */
async function init() {
    app_type.value = await getDict('app_type')
    if (app_type.value.length) {
        activeType.value = app_type.value[0].dictValue
        getData({ type: activeType.value })
    }

}

init()
</script>

<style lang="scss" scoped></style>