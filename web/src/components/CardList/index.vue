<template>
    <div class="cards-warp">
        <div class="cards" v-for="(item, index) in data" @click="$emit('handleClick', { data: item, index })">
            <div class="icon"></div>
            <div class="name">{{ item.name }}</div>
        </div>
        <div class="cards create" @click="$emit('handleCreate')">
            <div class="icon">+</div>
            <div class="name"></div>
        </div>
    </div>
</template>

<script setup>
const data = defineModel('data')
</script>

<style lang="scss" scoped>
.cards-warp {
    display: flex;

    .cards {
        margin-right: 20px;
        cursor: pointer;
        text-align: center;

        .icon {
            width: 60px;
            height: 60px;
            border: 1px solid #eee;
            border-radius: 4px;
            display: inline-block;
        }

        .name {
            width: 100px;
            text-align: center;
            overflow: hidden;
            font-size: 12px;
            word-break: break-all;
        }

        &.create {
            line-height: 60px;
            font-size: 32px;
            color: #999;
        }
    }
}
</style>