<template>
    <el-upload v-model:file-list="fileList" :action="actionUrl" name="image" list-type="picture-card"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <el-icon>
            <Plus />
        </el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>
  
<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const fileList = ref([
    {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
])

const actionUrl = 'http://localhost:3006/api/upload'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)


const handleRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
    dialogImageUrl.value = !uploadFile.url
    dialogVisible.value = true
}
</script>