<template>
  	<div id="overview">
        <headernav type="/overview"></headernav>
        <overviewcontent></overviewcontent>
  	</div>
</template>

<script type="text/javascript">
    /**
     * 地图概览页主框架
     */

    import headernav from '../navigation/headernav.vue'
    import elmenu from '../menu/elmenu.vue'
    import overviewcontent from './content.vue'
    import '../../static/style/overview/index.scss'

	export default {
  		data () {
    		return {

    		}
  		},
        components: { headernav,elmenu,overviewcontent }
	}
</script>
