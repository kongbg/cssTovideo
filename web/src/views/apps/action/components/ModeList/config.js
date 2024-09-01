import { getFormRules } from '@/utils/index'
export const formConfig = [
    {
        // hide: true,
        list: [
            {
                type: 'input',
                label: '所属应用',
                prop: 'appId',
                // hide: true,
                disabled: true,
            }
        ]
    },
    {
        list: [
            {
                type: 'input',
                label: '模型名称',
                prop: 'name',
                required: true,
                min: 1,
                max: 10
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
            }
        ]
    },
    {
        list: [
            {
                type: 'input',
                label: '模型描述',
                prop: 'desc'
            }
        ]
    }
]

export const formRules = getFormRules(formConfig)