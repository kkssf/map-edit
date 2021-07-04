<script>
import register from '@/components/map/Register'
export default {
  mixins: [register],
  data() {
    return {}
  },
  computed: {
    IMAGE() {
      return require('./layerImage/wenzhou.png')
    },
  },
  methods: {
    init() {
      this.createImageLayer()
    },
    createImageLayer() {
      let imageLayer = new AMap.ImageLayer({
        url: this.IMAGE,
        bounds: new AMap.Bounds(
          [120.466138, 27.467275],
          [120.676562, 27.59365]
        ),
        zooms: [5, 18],
        // zindex: 2,
      })
      this.getMap().addLayer(imageLayer)
      console.log('layer', this.getMap().getLayers())
    },
    destroy() {
      
    },
  },
}
</script>

<style>
</style>