import { getFormRules } from '@/utils/index'

const dict_type_status = [
    {
        label: '启用',
        value: '1'
    },
    {
        label: '禁用',
        value: '0'
    }
]
const dict_type_delstatus = [
    {
        label: '已删除',
        value: '1'
    },
    {
        label: '未删除',
        value: '0'
    }
]


export const searchConfig = [
    {
        type: 'input',
        label: '字典名称',
        prop: 'dictLabel',
    },
    {
        type: 'input',
        label: '字典值',
        prop: 'dictValue',
    },
    {
        type: 'input',
        label: '描述',
        prop: 'desc',
    },
    {
        type: 'select',
        label: '状态',
        prop: 'status',
        options: dict_type_status
    },
    {
        type: 'select',
        label: '删除状态',
        prop: 'delstatus',
        options: dict_type_delstatus
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
        label: '字典名称',
        prop: 'dictLabel'
    },
    {
        label: '字典值',
        prop: 'dictValue'
    },
    {
        label: '描述',
        prop: 'desc'
    },
    {
        label: '状态',
        prop: 'status',
        dict: dict_type_status
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
                label: '字典名称',
                prop: 'dictLabel',
                required: true,
                min: 1,
                max: 10
            }
        ]
    },
    {
        list: [
            {
                type: 'input',
                label: '字典值',
                prop: 'dictValue',
                required: true,
                min: 1,
                max: 10
            }
        ]
    },
    {
        list: [
            {
                type: 'input',
                label: '字典类型',
                prop: 'type',
                disabled: true
            }
        ]
    },
    {
        list: [
            {
                type: 'input',
                label: '样式属性',
                prop: 'className',
            }
        ]
    },
    {
        list: [
            {
                type: 'input',
                label: '显示序号',
                prop: 'indexNum',
            }
        ]
    },
    {
        list: [
            {
                type: 'select',
                label: '状态',
                prop: 'status',
                defaultData: '1',
                required: true,
                options: dict_type_status
            }
        ]
    },
    {
        list: [
            {
                type: 'input',
                label: '描述',
                prop: 'desc'
            }
        ]
    }
]

export const formRules = getFormRules(formConfig)