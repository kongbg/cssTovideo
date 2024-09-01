<template>
    <div>
        <div @click="goToList('/list')">前往列表页</div>
        <div @click="goToList('/dict/type')">前往字典列表页</div>
        <div @click="goToList('/mode')">前往创建模型</div>
        <div @click="goToList('/desgin/SOqCdqKntuMi')">前往动态页面</div>
        <div @click="goToList('/apps')">前往Apps页面</div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({ name: "Home" });
</script>

<script setup>
const router = useRouter();
function goToList(path) {
    router.push(
        {
            path
        }
    )
}
</script>