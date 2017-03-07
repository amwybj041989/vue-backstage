<template>
<div id="boxment">
    <headernav type="/boxment"></headernav>
    <div class="content">
        <elmenu type="boxment"></elmenu>
        <router-view></router-view>
    </div>
</div>
</template>

<script type="text/javascript">
import headernav from '../navigation/headernav.vue'
import elmenu from '../menu/elmenu.vue'

export default {
    data: () => ({

    }),
    components: {
        headernav,
        elmenu
    }
}
</script>

<style>
#boxment {
    width: 100%;
    height: 100%;
}
</style>
