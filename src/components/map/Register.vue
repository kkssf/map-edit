<script>
// 高德地图注册事件(所有地图组件mixins)
// 所有地图组件实现init 方法,初始化结束后会自动调用init
// 组件销毁时会自动调用destroy方法,
// 如果实例下绑定有$object(this.$object),会在地图中移除
export default {
  render () { return null },
  inject: ['amap'],
  created () {
    let map = this.getMap()
    typeof this.init === 'function' && this.init(map)
  },
  beforeDestroy () {
    // let map = this.getMap()
    // console.log(map.getAllOverlays('polygon'),'getAllOverlays')
    // debugger
    typeof this.destroy === 'function' && this.destroy()
    if (this.$object) {
      if (typeof this.$object === 'object') {
        try {
          if (typeof this.$object.destroy === 'function') {
            this.$object.destroy()
          }
          if (typeof this.$object.setMap === 'function') {
            this.$object.setMap(null)
          }
        } catch (error) {
          console.warn(error)
        }
        this.$object = null
      }
    }
  },
  methods: {
    // 通用方法 TODO
    getObject () {
      return this.$object || null
    },
    setObject (obj) {
      this.$object = obj || null
    },
    getMap () {
      return this.amap.$map
    }
  }
}
</script>
