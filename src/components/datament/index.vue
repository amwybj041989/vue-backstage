<template>
<div id="datament">
    <headernav type="/datament"></headernav>
    <div class="content">
        <elmenu type="datament"></elmenu>
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
#datament {
    width: 100%;
    height: 100%;
}
</style>
