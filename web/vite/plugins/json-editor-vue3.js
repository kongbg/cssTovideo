// 报错 jsoneditor does not provide an export named 'default'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

export default function jsonEditImport() {
    return viteCommonjs()
}
