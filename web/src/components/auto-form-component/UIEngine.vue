<template>
    <el-scrollbar class="center-scrollbar" :class="[mode]" :noresize="true">
        <div class="center-board-row">
            <div :style="{ width: '100%' }" :model="formData" :size="formConfigRef.size"
                :label-position="formConfigRef.labelPosition" :disabled="formConfigRef.disabled"
                :label-width="formConfigRef.labelWidth + 'px'">
                <draggable class="drawing-board" item-key="renderKey" :list="drawingList" :animation="340"
                    group="componentsGroup">
                    <template #item="{ element, index }">
                        <div class="drawing-board-item" :class="[`${element.tag}-board`]">
                            <draggable-item :key="element.renderKey" v-bind="attrs" :formData="formData" :element="element"
                                :index="index" :active-id="activeId" :form-conf="formConfigRef" :drawing-list="drawingList"
                                :mode="mode"
                                @activeItem="activeFormItem" @copyItem="drawingItemCopy" @deleteItem="drawingItemDelete"
                                @handleEvent="data => $emit('handleEvent', { formData, ...data })" />
                        </div>
                    </template>
                </draggable>
            </div>
            <div v-show="!drawingList.length && mode == 'desgin'" class="empty-info">
                <el-empty :image-size="200" :description="'从左侧拖入或点选组件进行表单设计'" />
            </div>
        </div>
    </el-scrollbar>
</template>

<script setup>
import draggable from 'vuedraggable'
const props = defineProps({
    activeFormItem: {
        type: Function,
        default: () => { }
    },
    drawingItemCopy: {
        type: Function,
        default: () => { }
    },
    drawingItemDelete: {
        type: Function,
        default: () => { }
    },
    mode: { // 运行模式 desgin  runtime
        type: String,
        default: 'desgin'
    },
    formData: {
        type: Object,
        default: () => { }
    },
    formConfSchema: {
        type: Array,
        default: () => []
    }
})
const drawingList = defineModel('drawingList')
const activeId = defineModel('activeId')
const formConfigRef = computed(() => {
    let obj = {}
    props.formConfSchema.forEach(item => {
        obj[item.prop] = item.value
    });
    return obj
})

</script>

<style lang="scss">
$geo-basic-footer-height: 6px;
$selectedColor: #f6f7ff;
$lighterBlue: #409EFF;

.auto-form-context {
    .action-bar {
        position: relative;
        height: 45px;
        padding: 0 15px;
        box-sizing: border-box;
        border: 1px solid #f1e8e8;
        display: flex;
        justify-content: right;
        align-items: center;

        .delete-btn {
            color: #F56C6C;
        }
    }

    .center-scrollbar {
        height: calc(100% - 45px);
    }

    .el-scrollbar__view {
        height: 100%;
        overflow-x: hidden;
    }

    .center-board-row {
        // padding: 10px 10px 15px 10px;
        box-sizing: border-box;
        height: 100%;
        position: relative;
    }

    .drawing-board {
        height: calc(100% - 30px * 2);
        padding: 30px 0;

        // .drawing-board-item.el-button-board {
        //     display: inline-block;
        // }

        .components-body {
            padding: 0;
            margin: 0;
            font-size: 0;
        }

        .sortable-ghost {
            position: relative;
            display: block;
            overflow: hidden;

            &::before {
                content: " ";
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                height: 3px;
                background: rgb(89, 89, 223);
                z-index: 2;
            }
        }

        .components-item.sortable-ghost {
            width: 100%;
            height: 60px;
            background-color: $selectedColor;
        }

        .active-from-item {
            .el-form-item {
                background: $selectedColor;
                border-radius: 6px;
            }

            .drawing-item-copy,
            .drawing-item-delete {
                display: initial;
            }

            .component-name {
                color: $lighterBlue;
            }
        }

        .el-form-item {
            margin-bottom: 0px;

            &.custom-el-button {
                .el-form-item__label {
                    padding-right: 0;
                    overflow: hidden;
                }
            }
        }
    }

    .empty-info {
        position: absolute;
        width: 100%;
        top: 5px;
    }

    .div-wrap,
    .el-row-wrap,
    .el-col-wrap,
    .div-item,
    .t-search {
        position: relative;
        cursor: move;
        border: 1px dashed #ccc;
        width: 100%;
        // min-height: 80px;
        box-sizing: border-box;

        &.active {
            border: 1px dashed $lighterBlue;

            .drawing-item-copy,
            .drawing-item-delete {
                display: block;
            }

            .component-name {
                color: $lighterBlue;
            }
        }
    }
    .t-table-wrap {
        border: 1px dashed #ccc;
        &.active {
            border: 1px dashed $lighterBlue;
        }
    }
    .t-table {
        position: relative;
        cursor: move;
        // border: 1px dashed #ccc;
        width: 100%;
        max-width: 100%;
        // min-height: 80px;
        box-sizing: border-box;

        &.active {
            // border: 1px dashed $lighterBlue;

            .drawing-item-copy,
            .drawing-item-delete {
                display: block;
            }

            .component-name {
                color: $lighterBlue;
            }
        }
    }
    .el-button-board {
        .div-item {
            min-height: 32px;
            width: auto;
            display: inline-block;
            .drawing-item-copy {
                right: 28px;
            }
            .drawing-item-delete {
                right: 0;
            }
        }
    }

    .drawing-item {
        position: relative;
        cursor: move;

        &.unfocus-bordered:not(.activeFromItem)>div:first-child {
            border: 1px dashed #ccc;
        }

        .el-form-item {
            padding: 12px 10px;
        }
    }

    .drawing-row-item {
        position: relative;
        cursor: move;
        box-sizing: border-box;
        border: 1px dashed transparent;
        border-radius: 3px;
        // padding: 0 2px;
        // margin-bottom: 15px;

        .drawing-row-item {
            margin-bottom: 0px;
        }

        .el-col {
            margin-top: 22px;
        }

        .el-form-item {
            margin-bottom: 0;
        }

        .drag-wrapper {
            width: 100%;
            // min-height: 80px;
            border: 1px dashed #ccc;
        }

        &.active-from-item {
            border: 1px dashed $lighterBlue;
        }

        
    }

    .component-name {
        // position: absolute;
        // top: 0;
        // left: 0;
        font-size: 12px;
        color: #bbb;
        display: inline-block;
        padding: 0 6px;
        height: 16px;
    }
    .drawing-item,
    .drawing-row-item {
        .el-form-item {
            border: 1px dashed transparent;
        }

        &:hover {
            .el-form-item {
                background: $selectedColor;
                border-radius: 6px;
            }

            .drawing-item-copy,
            .drawing-item-delete {
                display: initial;
            }
        }

        &.active-from-item {
            .el-form-item {
                border: 1px dashed $lighterBlue;
            }
        }

        .drawing-item-copy,
        .drawing-item-delete {
            display: none;
            position: absolute;
            top: -10px;
            width: 22px;
            height: 22px;
            line-height: 22px;
            text-align: center;
            border-radius: 50%;
            font-size: 12px;
            border: 1px solid;
            cursor: pointer;
            z-index: 1;
        }

        .drawing-item-copy {
            right: 56px;
            border-color: $lighterBlue;
            color: $lighterBlue;
            background: #fff;

            &:hover {
                background: $lighterBlue;
                color: #fff;
            }
        }

        .drawing-item-delete {
            right: 24px;
            border-color: #F56C6C;
            color: #F56C6C;
            background: #fff;

            &:hover {
                background: #F56C6C;
                color: #fff;
            }
        }
    }

    .drawing-item-copy,
    .drawing-item-delete {
        display: none;
        position: absolute;
        top: -10px;
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        border-radius: 50%;
        font-size: 12px;
        border: 1px solid;
        cursor: pointer;
        z-index: 1;
    }

    .drawing-item-copy {
        right: 56px;
        border-color: $lighterBlue;
        color: $lighterBlue;
        background: #fff;

        &:hover {
            background: $lighterBlue;
            color: #fff;
        }
    }

    .drawing-item-delete {
        right: 24px;
        border-color: #F56C6C;
        color: #F56C6C;
        background: #fff;

        &:hover {
            background: #F56C6C;
            color: #fff;
        }
    }

    .runtime {

        .drawing-item,
        .drawing-row-item {
            &:hover {
                .el-form-item {
                    background: #fff;
                    border-radius: 0px;
                }

                .drawing-item-copy,
                .drawing-item-delete {
                    display: none;
                }
            }

            .drag-wrapper {
                border-color: transparent;
            }

            .component-name {
                display: none;
            }
        }
    }
}
</style>