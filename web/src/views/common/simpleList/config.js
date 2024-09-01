export const searchConfig = [
    {
        type: 'input',
        label: '名称',
        prop: 'name',
    },
    {
        type: 'input',
        label: '描述',
        prop: 'desc',
        defaultData: '默认值'
    },
    {
        type: 'select',
        label: '类型',
        prop: 'type',
        options: [
            {
                label: '启用',
                value: '1'
            },
            {
                label: '禁用',
                value: '0'
            }
        ]
    },
    {
        type: 'select',
        label: '状态',
        prop: 'status',
        options: [
            {
                label: 'label',
                value: '1'
            }
        ]
    },
    {
        type: 'select',
        label: '删除状态',
        prop: 'delstatus',
        options: [
            {
                label: '已删除',
                value: '1'
            },
            {
                label: '未删除',
                value: '0'
            }
        ]
    },
    {
        type: 'input',
        label: '创建人',
        prop: 'createBy',
    },
    { type: "reset", label: "重置条件" },
    { type: "submit", label: "查询" }
]
export const columns = [
    {
        type: 'index',
        label: '序号',
        width: 60
    },
    {
        label: '姓名',
        prop: 'name'
    },
    {
        label: '类型',
        prop: 'type'
    },
    {
        label: '描述',
        prop: 'desc'
    },
    {
        label: '状态',
        prop: 'status'
    },
    {
        label: '创建人',
        prop: 'createBy'
    },
    {
        label: '创建时间',
        prop: 'createTime'
    },
    {
        label: '更新时间',
        prop: 'updateTime'
    },
    {
        label: '操作',
        slot: 'action'
    }
]

export const formConfig = [
    {
        list: [
            {
                type: 'input',
                label: '输入框',
                prop: 'value1',
                defaultData: '默认值'
            }
        ]
    },
    {
        list: [
            {
                type: 'select',
                label: '下拉框(多选)',
                prop: 'value2',
                multiple: true,
                options: [
                    {
                        label: 'label',
                        value: '1'
                    },
                    {
                        label: 'label2',
                        value: '2'
                    },
                    {
                        label: 'labe3',
                        value: '3'
                    },
                ]
            }
        ]
    }
]