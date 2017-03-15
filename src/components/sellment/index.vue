<template>
<div id="sellment">
    <headernav type="/sellment"></headernav>
    <div class="content">
        <elmenu type="sellment"></elmenu>
        <router-view></router-view>
    </div>
</div>
</template>

<script type="text/javascript">
import headernav from '../navmenu/headernav.vue'
import elmenu from '../navmenu/elmenu.vue'
import '../../static/style/sellment/index.scss'

export default {
    data() {
        return {

        }
    },
    components: {
        headernav,
        elmenu
    }
}
</script>
