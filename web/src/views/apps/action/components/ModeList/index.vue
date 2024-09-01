<template>
    <div class="mode-list">
        <CardList :data="modeList" @handleClick="handleClick" @handleCreate="handleCreate"></CardList>

        <FormDialog v-model="formVisible" :form="dialogForm" :rules="formRules" :config="formConfig"
            :loading="diaLogLoading" :type="mode" @submit="diaLogSubmit"></FormDialog>
    </div>
</template>
<script setup>
import { getData as getModeList, create, update } from '@/api/mode.js'
import CardList from '@/components/CardList/index.vue'
import { formConfig, formRules } from './config.js'
import FormDialog from '@/components/FormDialog/index.vue'
const props = defineProps({
    appId: {
        type: String,
        default: ''
    }
})
const router = useRouter()
const formVisible = ref(false)
const dialogForm = ref({})
const diaLogLoading = ref(false)
const mode = ref('create')
const modeList = ref([
    // {
    //     name: 'mode1',
    //     id: '1'
    // }
])

function handleClick({ data, index }) {
    router.push({
        // path: '/desgin/mode',
        path: '/mode/action',
        query: {
            type: 'editMode',
            id: data.id
        }
    })
}

/**
 * 打开新增模型弹窗
 */
function handleCreate() {
    dialogForm.value = { appId: props.appId }
    mode.value = 'create'
    formVisible.value = true
}

/**
 * 新增。编辑模型
 * @param {*} param
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
        getModes()
    } else {
        console.log(`${action}失败！`)
    }
}

/**
 * 获取模型数据
 */
async function getModes() {
    let params = { appId: props.appId, pageSize: 999 }
    let res = await getModeList(params);
    if (res.code == 200) {
        modeList.value = res.data.list || []
    } else {
    }
}

/**
 * 页面数据初始化
 */
function init() {
    // 获取模型
    getModes()
}

init()
</script>