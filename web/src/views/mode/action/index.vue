<template>
    <div>
        <div>模型字段：</div>
        <div class="fieldJson">
            {{ fieldJson }}
            <json-editor-vue
                class="editor"
                v-model="fieldJson"
                style="height: 500px"
            ></json-editor-vue>
        </div>

        <div class="btns">
            <el-button type="primary" @click="cancel">取消</el-button>
            <el-button type="primary" v-loading="loading" @click="submit" >保存</el-button>
        </div>
    </div>
</template>
<script>
    import { defineComponent } from "vue";
    export default defineComponent({ name: "ModeAction" });
</script>
<script setup>
import { update, getDetails } from '@/api/mode.js'
const router = useRouter();
const route = useRoute();
const loading = ref(false)

const { id, type } = route.query;
const fieldJson = ref([])
const updataModel = ref(null)
async function submit() {
    console.log('fieldJson.value:', fieldJson.value)
    loading.value = true
    let action = type == 'create' ? '新增' : '编辑'
    let params = {
        id,
        fieldJson: JSON.stringify(fieldJson.value)
    }
    let res = await update(params);
    loading.value = false
    if (res.code == 200) {
        console.log(`${action}成功！`)
        router.replace('index')
    } else {
        console.log(`${action}失败！`)
    }
}
function cancel() {
    router.replace('index')
}

async function getDetail() {
    let params = { id }
    let res = await getDetails(params);
    if (res.code == 200) {
        let fieldJsons = res.data.fieldJson ? JSON.parse(`${res.data.fieldJson}`) : ''
        console.log('fieldJsons:', fieldJsons)
        fieldJson.value = fieldJsons
    }
}

function init() {
    if (type == 'editMode') {
        getDetail()
    }
}

init()
</script>
<style lang="scss" scoped>
.editor,
.editor * {
  font-family: "Monaco", "Menlo", "Ubuntu Mono", "Droid Sans Mono", "Consolas", monospace !important;
  font-size: 14px !important;
}

</style>