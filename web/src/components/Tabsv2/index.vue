<template>
    <div class="tabs v2">
        <div class="tab" :class="{ 'active': item[props.value] == modelValue }" v-for="(item, index) in data"
            @click="handleClick(item, index)">{{ item[props.label] }}</div>
        <div class="tab create" v-if="showCreate" @click="handleCreate()">+</div>
    </div>
</template>
<script setup>
import { getCurrentInstance } from 'vue';

const data = defineModel('data')
const props = defineModel('props')
const props2 = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    showCreate: {
        type: Boolean,
        default: false
    }
})
const { proxy } = getCurrentInstance()

function handleCreate() {
    proxy.$emit('handleCreate')
}
function handleClick(data, index) {
    proxy.$emit('handleClick', { data, index })
    proxy.$emit('update:modelValue', data[props.value.value])
}
</script>
<style lang="scss" scoped>
.tabs.v2 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 10px;

    .tab {
        margin-top: 5px;
        margin-right: 10px;
        background-color: rgba(191, 191, 191, 0.36);
        color: white;
        padding: 0px 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 50px;
        font-size: 12px;
        cursor: pointer;
        height: 28px;
        line-height: 28px;

        &.active {
            background-color: #e7e7e7;
            color: #333333;
        }

        &.create {
            font-size: 20px;
        }
    }
}
</style>
