const useKeepAliveStore = defineStore(
  'keepAlive',
  {
    state: () => ({
        keepAliveComponents: []
    }),
    actions: {
        // 加入到缓存队列
        setKeepAlive(component) {
            if (!this.keepAliveComponents.includes(component)) {
                this.keepAliveComponents.push(component);
            }
        },

        // 从缓存队列移除
        removeKeepAlive(component) {
            const index = this.keepAliveComponents.indexOf(component);
            if (index !== -1) {
                this.keepAliveComponents.splice(index, 1);
            }
        }
    },
    getters: {
        getKeepAliveComponents(state) {
          return state.keepAliveComponents;
        }
    },
  })

export default useKeepAliveStore;
