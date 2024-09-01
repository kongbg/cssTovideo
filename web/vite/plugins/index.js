import vue from '@vitejs/plugin-vue'
import createAutoImport from './auto-import'
import jsonEditImport from './json-editor-vue3'

export default function createVitePlugins() {
    const vitePlugins = [vue()]
    vitePlugins.push(createAutoImport())
    vitePlugins.push(jsonEditImport())
    return vitePlugins
}