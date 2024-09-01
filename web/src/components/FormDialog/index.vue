<template>
    <div class="form-dialog-container">
        <el-dialog v-model="dialogFormVisible" :title="title" width="500">
            <el-form ref="ruleFormRef" :model="form" :rules="dialogFormRules">
                <template v-for="conf in config">
                    <el-row v-if="!conf.hide">
                        <template v-for="info in conf.list">
                            <el-col v-if="!info.hide">
                                <!-- 输入框 -->
                                <el-form-item v-if="info.type == 'input'" :label="info.label"
                                    :prop="info.required ? info.prop : ''" :label-width="info?.width || formLabelWidth">
                                    <el-input v-model="form[info.prop]" :disabled="info.disabled" />
                                </el-form-item>
                                <!-- 下拉框 -->
                                <el-form-item v-if="info.type == 'select'" :label="info.label"
                                    :prop="info.required ? info.prop : ''" :label-width="info?.width || formLabelWidth">
                                    <el-select v-model="form[info.prop]" :multiple="info.multiple" :disabled="info.disabled"
                                        :placeholder="info?.placeholder" :clearable="info.clearable || true"
                                        @change="val => selectChange(val, info)">
                                        <el-option v-for="op in (info.options.value || info.options)"
                                            :label="op[(info?.props && info?.props.label) || 'label']"
                                            :value="op[(info?.props && info?.props.value) || 'value']"
                                            :key="op[(info?.props && info?.props.value) || 'value']">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- 级联区域 -->
                                <el-form-item v-if="info.type == 'areacascader'" :label="info.label"
                                    :prop="info.required ? info.prop : ''" :label-width="info?.width || formLabelWidth">
                                    <el-cascader v-model="form[info.prop]" :clearable="info.clearable || false"
                                        :disabled="info.disabled" :options="info.options" :props="{
                                            value: 'areaCode',
                                            label: 'areaName',
                                            children: 'childList',
                                            checkStrictly: true,
                                        }" />
                                </el-form-item>
                                <!-- 日期时间范围（时分秒） -->
                                <el-form-item v-if="info.type == 'areacascader'" :label="info.label"
                                    :prop="info.required ? info.prop : ''" :label-width="info?.width || formLabelWidth">
                                    <el-cascader v-model="form[info.prop]" :clearable="info.clearable || false"
                                        :disabled="info.disabled" :options="info.options" :props="{
                                            value: 'areaCode',
                                            label: 'areaName',
                                            children: 'childList',
                                            checkStrictly: true,
                                        }" />
                                </el-form-item>
                                <!-- 日期时间范围 (日期) -->
                                <el-form-item v-if="info.type == 'datetimerange'" :label="info.label"
                                    :prop="info.required ? info.prop : ''" :label-width="info?.width || formLabelWidth">
                                    <el-date-picker v-model="form[info.prop]" type="datetimerange"
                                        format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                                        :defaultTime="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
                                        :range-separator="info.rangeSeparator" :start-placeholder=info.startPlaceholder
                                        :end-placeholder=info.endPlaceholder :clearable="info.clearable || true"
                                        :disabled="info.disabled" />
                                </el-form-item>
                                <!-- 日期时间 -->
                                <el-form-item v-if="info.type == 'daterange'" :label="info.label"
                                    :prop="info.required ? info.prop : ''" :label-width="info?.width || formLabelWidth">
                                    <el-date-picker v-model="form[info.prop]" type="daterange" format="YYYY-MM-DD"
                                        value-format="YYYY-MM-DD" :range-separator="info.rangeSeparator"
                                        :start-placeholder=info.startPlaceholder :end-placeholder=info.endPlaceholder
                                        :clearable="info.clearable || true" :disabled="info.disabled" />
                                </el-form-item>
                                <el-form-item v-if="info.type == 'date'" :label="info.label"
                                    :prop="info.required ? info.prop : ''" :label-width="info?.width || formLabelWidth">
                                    <el-date-picker v-model="form[info.prop]" type="date" format="YYYY-MM-DD"
                                        value-format="YYYY-MM-DD" :placeholder="info.placeholder"
                                        :clearable="info.clearable || true" :disabled="info.disabled">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item v-if="info.type == 'radio'" :label="info.label"
                                    :prop="info.required ? info.prop : ''" :label-width="info?.width || formLabelWidth">
                                    <el-radio-group v-model="form[info.prop]" :disabled="info.disabled">
                                        <el-radio v-for="op in info.options"
                                            :label="op[(info.props && info.props.label) || 'label']"
                                            :value="op[(info.props && info.props.value) || 'value']"
                                            :key="op[(info.props && info.props.value) || 'value']">
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>

                                <!-- 上传 -->
                                <el-form-item v-if="info.type == 'uploadImg'" :label="info.label"
                                    :prop="info.required ? info.prop : ''" :label-width="info?.width || formLabelWidth">
                                    <UploadImg></UploadImg>
                                </el-form-item>
                            </el-col>
                        </template>
                    </el-row>
                </template>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="cancel">{{ cancelText }}</el-button>
                    <el-button type="primary" v-loading="loading" @click="submit">{{ submitText }}</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import UploadImg from '@/components/UploadImg'
const emit = defineEmits([])
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: true
    },
    loading: {
        type: Boolean,
        default: true
    },
    cancelText: {
        type: String,
        default: '取消'
    },
    submitText: {
        type: String,
        default: '确定'
    },
    formLabelWidth: {
        type: Number,
        default: 80
    },
    title: {
        type: String,
        default: '新增'
    },
    type: {
        type: String,
        default: 'create'
    }
})

const ruleFormRef = ref(null)
const config = defineModel('config')
const form = defineModel('form')
const dialogFormRules = defineModel('rules')

watch(() => props.modelValue, () => {
    dialogFormVisible.value = props.modelValue
    if (props.modelValue) {
        initForm()
    }
    setTimeout(() => {
        ruleFormRef.value && ruleFormRef.value.clearValidate()
    }, 150)
})
// 定义时间组件的默认值
let valueMap = {
    'datetimerange': () => { return [] },
    'daterange': () => { return [] },
}
const dialogFormVisible = ref(props.modelValue)

// 联动的父级变动
async function selectChange(value, data) {
    // 找到相关联的下级prop
    let key = data.like && data.like.key;
    if (key) {
        let likeData = null

        // 找到下级配置
        for (let i = 0; i < config.value.length; i++) {
            let info = config.value[i]
            !likeData ? likeData = info.find(item => item.prop == key) : '';

            if (likeData) break
        }
        // 使用下级配置api请求数据填充options
        if (likeData && likeData.api) {
            delete form.value[key];

            if (likeData.like) {
                delete form.value[likeData.like.key];
            }

            let option = await likeData.api({ data: value });
            likeData.options = likeData.transformPropData ? likeData.transformPropData(option) : option
        }
    }
}

// 初始化表单数据
function initForm() {
    config.value.forEach(async info => {
        let list = info.list || []
        list.forEach(async item => {
            // 配置了api 并且 是联动一级才自动请求数据
            if (item.api) {
                // 联动节点的 parent 才需要自动获取数据
                let autoGet = item.like && !item.like.parent;
                if (item.api && autoGet || (item.api && !item.like)) {
                    let option = await item.api();
                    item.options = item.transformPropData ? item.transformPropData(option) : option
                }

            }
            // 设置默认值
            if (item.defaultData) {
                form.value[item.prop] = item.defaultData
            }

            // 设置部分值默认值类型
            if (valueMap[item.type]) {
                form.value[item.prop] = valueMap[item.type]()
            }
        })
    })
    console.log('config.value:', config.value)
}

function cancel() {
    emit('update:modelValue', false)
}
function submit() {
    ruleFormRef.value.validate((valid) => {
        if (valid) {
            emit('submit', { type: props.type, data: form.value })
        } else {
            console.log('error submit!')
        }
    })
}
</script>
<style lang="scss" scoped>
@import './form-dialog-container.scss'
</style>