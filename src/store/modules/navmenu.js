/**
 * 导航菜单
 */
import * as types from '../mutation'


const state = {
    headernav: [],
    elmenu: []
}

const getters = {
    headernav: state => state.headernav,
    elmenu: state => state.elmenu
}

const sellmentdata = [
    {
        name: '销售数据概览',
        url: '/generality',
        child: [{
            name: '销售数据概览',
            url: '/sellment/selloverview',
        }]
    },
    {
        name: '在售商品管理',
        url: '/product',
        child: [{
            name: '商品销售统计',
            url: '/sellment/productsales'
        }]
    },
    {
        name: '订单数据统计',
        url: '/order',
        child: [{
            name: '订单数据查询',
            url: '/sellment/ordersearch'
        }]
    }
];
// 盒子管理左侧导航
const boxmentdata = [
    {
        name: '盒子管理',
        url: '/boxmentmgt',
        child: [{
            name: '盒子管理',
            url: '/boxment/boxlist'
        }]
    },
    {
        name: '城市小区管理',
        url: '/community',
        child: [{
            name: '城市小区管理',
            url: '/boxment/community'
        }]
    }
];
// 用户管理左侧导航
const usermentdata = [
    {
    name: '用户管理',
    url: '/userment',
    child: [{
            name: '注册用户列表',
            url: '/userment/userlist'
        }
        // {
        //     name: '用户统计分析',
        //     url: '/userment/statistics'
        // }
    ]
}];

// 员工管理左侧导航
const staffmentdata = [
    {
    name: '理货员管理',
    url: '/staffment',
    child: [{
        name: '理货员管理',
        url: '/staffment/tallymanlist'
    }]
}]

const actions = {
    /**
     * 切换顶部导航
     */
    headernavSwitch({ commit }) {
        let data = [{
                name: '地图概览',
                url: '/overview',
                type: 'overview'
            },
            {
                name: '销售管理',
                url: '/sellment',
                type: 'sellment'
            },
            {
                name: '盒子管理',
                url: '/boxment',
                type: 'boxment'
            },
            {
                name: '用户管理',
                url: '/userment',
                type: 'userment'
            },
            {
                name: '员工管理',
                url: '/staffment',
                type: 'staffment'
            }
        ]
        commit(types.HEADERNAV_SWITCH, { data })
    },
    /**
     * 切换左侧菜单
     */
    elmenuSwitch({ commit }, type) {
        let data
        switch (type) {
            case 'sellment':
                // 销售管理
                data = sellmentdata
                break;
            case 'boxment':
                // 盒子管理
                data = boxmentdata
                break;
            case 'userment':
                data = usermentdata
                break;
            case 'staffment':
                // 员工管理
                data = staffmentdata
                break;
        }
        commit(types.ELMENU_SWITCH, { data })
    }
}

const mutations = {
    [types.HEADERNAV_SWITCH](state, {
        data
    }) {
        state.headernav = data
    },
    [types.ELMENU_SWITCH](state, {
        data
    }) {
        state.elmenu = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
