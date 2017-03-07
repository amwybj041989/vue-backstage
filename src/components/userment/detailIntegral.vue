<template>
<div class="integral">
    <el-table :data="tableData" :stripe="true" style="width: 100%">
        <el-table-column prop="date" label="时间" width="150"></el-table-column>
        <el-table-column prop="status" label="积分状态" width="150"></el-table-column>
        <el-table-column prop="cal" label="积分增减"></el-table-column>
    </el-table>
</div>
</template>

<script type="text/javascript">
// 注册用户列表
import '../../static/style/userment/detailIntegral.scss'

export default {
    data() {
        return {
            tableData: [{
                date: '2017-02-02',
                status: '消费获取',
                cal: '+5'
            },{
                date: '2017-02-02',
                status: '消费获取',
                cal: '+5'
            },{
                date: '2017-02-02',
                status: '消费获取',
                cal: '+5'
            },{
                date: '2017-02-02',
                status: '消费获取',
                cal: '+5'
            },{
                date: '2017-02-02',
                status: '消费获取',
                cal: '+5'
            },{
                date: '2017-02-02',
                status: '消费获取',
                cal: '+5'
            },{
                date: '2017-02-02',
                status: '消费获取',
                cal: '+5'
            },]
        }
    },
    methods: {

    }
}
</script>
