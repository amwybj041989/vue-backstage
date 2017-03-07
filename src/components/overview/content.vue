<template>
<div id="overviewcontent" class="right-content">
    <overview-map></overview-map>
    <overview-data></overview-data>
</div>
</template>

<script type="text/javascript">
/**
 * 地图概览页主内容框架
 */
import overviewMap from './map.vue'
import overviewData from './data.vue'

export default {
    data() {
        return {

        }
    },
    components: {
        overviewMap,
        overviewData
    }
}
</script>
