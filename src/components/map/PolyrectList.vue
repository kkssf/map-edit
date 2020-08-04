

<script>
import register from '@/components/map/Register'

// import wenzhou from '@/assets/wenzhou.js'
import { color16 } from '@/assets/utils.js'
import { mapGetters, mapMutations } from 'vuex'
export default {
  mixins: [register],
  data() {
    return {
      polygonList: [],
      editor: null,
      index: null,
    }
  },
  computed: {
    ...mapGetters(['getAreaList', 'getAddFlag']),
  },
  methods: {
    ...mapMutations([
      'setAreaList',
      'setAddFlag',
      'setPointIndex',
      'configAreaList',
      'delAreaList',
    ]),
    init() {
      this.createAreaList()
    },
    clear() {
      // this.getMap().getAllOverlays('polygon').setMap(null)
      this.cleanEditor()
      let polygon = this.getMap().getAllOverlays('polygon')
      // console.log(polygon,'polygon')
      if (polygon.length) {
        this.getMap().remove(polygon)
      }
    },
    cleanEditor() {
      if (this.editor) {
        this.editor.close()
        this.editor = null
      }
    },
    createAreaList() {
      // console.log('create')
      this.clear()
      this.getAreaList.map((item, Index) => {
        this.polygonList = []
        item.list.map((nav, index) => {
          let polygon = new AMap.Polygon({
            path: nav,
            strokeColor: item.strokeColor,
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillOpacity: 1,
            fillColor: item.fillColor,
            zIndex: 50,
          })
          polygon.on('dblclick', () => {
            // console.log('dblclick')
            this.cleanEditor()
            this.getMap().remove(polygon)
            let arr = [...item.list]
            arr.splice(index, 1)
            let obj = {
              name: item.name,
              list: arr,
              strokeColor: item.strokeColor,
              fillColor: item.fillColor,
            }
            this.configAreaList({ index: Index, obj: obj })
            if (arr.length == 0) {
              obj = {}
              this.delAreaList(Index)
            }
          })
          polygon.on('click', () => {
            this.cleanEditor()
            this.editor = new AMap.PolygonEditor(this.getMap(), polygon)

            this.editor.addAdsorbPolygons(
              this.getMap().getAllOverlays('polygon')
            )
            this.editor.open()
            this.getMap().setFitView()
          })
          polygon.on('rightclick', () => {
            this.editor.on('end', (e) => {
              let list = []
              let arr = []
              list = e.target.getPath().map((po) => [po.lng, po.lat])

              arr = [...item.list]
              arr[index] = list

              let obj = {
                name: item.name,
                list: arr,
                strokeColor: item.strokeColor,
                fillColor: item.fillColor,
              }
              this.configAreaList({ index: Index, obj: obj })
            })
            this.cleanEditor()
            this.getMap().setFitView()
          })
          polygon.on('mouseover', () => {
            polygon.setOptions({
              fillOpacity: 0.3,
            })
            this.setPointIndex(Index)
          })
          polygon.on('mouseout', () => {
            polygon.setOptions({
              fillOpacity: 1,
              fillColor: item.fillColor,
            })
            this.setPointIndex(null)
          })
          this.getMap().add(polygon)
          this.polygonList.push(polygon)

          // if (index == item.list.length - 1) {
          //   // console.log(this.polygonList, 'polygonList')
          //   item.list.map((list, listIndex) => {
          //     list.map((point) => {
          //       let areaPoint = new AMap.LngLat(point[0], point[1])
          //       console.log(
          //         areaPoint,
          //         'area' + listIndex + 'point',
          //         this.polygonList[listIndex].getPath()
          //       )
          //       // if (this.polygonList[listIndex].contains(areaPoint)) {
          //       //   console.log('重合')
          //       // }
          //       this.polygonList.map((poly) => {
          //         if (poly.contains(areaPoint)) {
          //           console.log('包含', areaPoint)
          //         }
          //       })
          //     })
          //   })
          // }
        })
      })
    },
    addPloygon() {
      let mouseTool = new AMap.MouseTool(this.getMap())
      let strokeColor = color16()
      let fillColor = color16()
      mouseTool.polygon({
        strokeColor: strokeColor,
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 1.0,
        fillColor: fillColor,
        zIndex: 50,
      })
      mouseTool.on('draw', (polygon) => {
        let list = polygon.obj.getPath().map((item) => [item.lng, item.lat])
        let obj = {
          name: `新建区域${this.getAreaList.length + 1}`,
          list: [list],
          strokeColor: strokeColor,
          fillColor: fillColor,
        }
        this.setAreaList(obj)
        this.setAddFlag(false)
        mouseTool.close(false)
      })
    },
    destroy() {
      // this.getMap().clearMap()
    },
  },
  watch: {
    getAreaList: {
      immediate: true,
      deep: true,
      handler() {
        this.createAreaList()
      },
    },
    getAddFlag: {
      immediate: true,
      handler(val) {
        if (val) {
          this.addPloygon()
        }
      },
    },
  },
}
</script>

<style>
</style>