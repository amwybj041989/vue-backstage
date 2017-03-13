<template>
<el-row class="mb-10">
    <el-col :span="24" class="el-item display-table top-toolbar">
        <div class="toolbar-path tn">{{ bone }}{{ two }}{{ three }}</div>
    </el-col>
</el-row>
</template>

<script type="text/javascript">
// 简单的页内顶部导航

export default {
    props: ['bone', 'btwo', 'bthree'],
    data: () => ({

    }),
    computed: {
        two(){ return (this.btwo === "" || this.btwo === undefined) ? "" : ' > ' + this.btwo },
        three(){ return (this.bthree === "" || this.bthree === undefined) ? "" : ' > ' + this.bthree }
    }
}
</script>
