<template>
    <div class="panel-padding">
        <div class="rows">
            <div class="item">
                <div class="label">上：</div>
                <div class="value"><el-input-number v-model="paddingTop" :min="0" @change="change"/> <span>{{ unit }}</span> </div>
            </div>
            <div class="item">
                <div class="label">右：</div>
                <div class="value"><el-input-number v-model="paddingRight" :min="0" @change="change"/> <span>{{ unit }}</span> </div>
            </div>
        </div>
        <div class="rows">
            <div class="item">
                <div class="label">下：</div>
                <div class="value"><el-input-number v-model="paddingBottom" :min="0" @change="change"/> <span>{{ unit }}</span> </div>
            </div>
            <div class="item">
                <div class="label">左：</div>
                <div class="value"><el-input-number v-model="paddingLeft" :min="0" @change="change"/> <span>{{ unit }}</span> </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { watch } from "vue"

const emit = defineEmits()
const props = defineProps({
    modelValue: {
        type: String,
        default: '0px 0px 0px 0px'
    },
    unit: {
        type: String,
        default: 'px'
    }
})
const paddingTop = ref(0)
const paddingRight = ref(0)
const paddingBottom = ref(0)
const paddingLeft = ref(0)
watch(()=>props.modelValue, () => {
    init()
})

function change() {
    let str = `${paddingTop.value}${props.unit} ${paddingRight.value}${props.unit} ${paddingBottom.value}${props.unit} ${paddingLeft.value}${props.unit}`;
    console.log('str:', str)
    emit('update:modelValue', str)
}

function init() {
    if (!props.modelValue) return
    let arr = props.modelValue.split(' ')
    if (arr.length) {
        paddingTop.value = arr[0].replace(props.unit, '')
        paddingRight.value = arr[1].replace(props.unit, '')
        paddingBottom.value = arr[2].replace(props.unit, '')
        paddingLeft.value = arr[3].replace(props.unit, '')
    }
}

init()
</script>

<style lang="scss" scoped>
.panel-padding {
    width: 100%;
    .rows {
        width: 100%;
        display: flex;
        .item {
            .value {
                display: flex;
                .el-input-number {
                    width: 100px;
                }
            }
            &:first-child{
                margin-right: 10px;
            }
        }
    }
}
</style>