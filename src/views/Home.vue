<template>
  <div class="home">
    <div class="map-contain">
      <AMap :opts="opts">
        <polyrect-list />
      </AMap>
    </div>
    <div class="control-area">
      <control-view />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AMap from '@/components/map/AMap'
import PolyrectList from '@/components/map/PolyrectList'
import ControlView from '@/components/ControlView'
export default {
  name: 'Home',
  components: {
    AMap,
    PolyrectList,
    ControlView,
  },
  data() {
    return {
      opts: {
        zoom: 10,
        center: [120.672913, 27.980921],
      },
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      formLabelWidth: '120px',
    }
  },
  methods:{

  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 1px;
  flex-grow: 1;
  display: flex;
  .map-contain {
    width: 80%;
    height: 100%;
  }
  .control-area {
    width: 20%;
    height: 100%;
  }
}
</style>
