<template>
    <div>
        action
        <div @click="goToList">返回列表页</div>
    </div>
</template>
<script>
    import { defineComponent } from "vue";
    export default defineComponent({ name: "Action" });
</script>
<script setup>
const router = useRouter();
function goToList() {
    router.replace(
        {
            path: '/list',
        }
    )
}
</script>