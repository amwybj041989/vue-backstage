<template>
<div id="map-container">
    <el-amap :vid="'amap-vue'" :center="center" :zoom="zoom" mapStyle="dark" :features="features"></el-amap>
</div>
</template>

<script>
// import AMap from 'AMap'
import '../../static/style/overview/map.scss'

export default {
    name: 'amap-page',
    data () {
        return {
            zoom: 9,
            center: [113.414694,22.515505],
            mapStyle: 'dark',
            features: ["bg","road","building"]
        }
    }
}
</script>
