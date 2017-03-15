<template>
<div id="userment">
    <headernav type="/userment"></headernav>
    <div class="content">
        <elmenu type="userment"></elmenu>
        <router-view></router-view>
    </div>
</div>
</template>

<script type="text/javascript">
import headernav from '../navmenu/headernav.vue'
import elmenu from '../navmenu/elmenu.vue'

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

<style>
#userment {
    width: 100%;
    height: 100%;
}
</style>
