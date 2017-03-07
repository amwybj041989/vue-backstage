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
import headernav from '../navigation/headernav.vue'
import elmenu from '../menu/elmenu.vue'
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
