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

// 销售管理左侧导航
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
]
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
]
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
    }
]

// 员工管理左侧导航
const staffmentdata = [
    {
        name: '理货员管理',
        url: '/staffment',
        child: [{
            name: '理货员管理',
            url: '/staffment/tallymanlist'
        }]
    }
]

// 资料管理左侧导航
const datamentdata = [
    {
        name: '供货商管理',
        url: '/dealerment',
        child: [{
            name: '供货商管理',
            url: '/datament/dealerment'
        }]
    },
    {
        name: '商品分类管理',
        url: '/productclass',
        child: [
            {
                name: '商品大类管理',
                url: '/datament/bigclass'
            },
            {
                name: '商品中类管理',
                url: '/datament/mediumclass'
            },
            {
                name: '商品小类管理',
                url: '/datament/smallclass'
            }
        ]
    },
    {
        name: '商品字典管理',
        url: '／prodyctdictionary',
        child: [
            {
                name: '商品字典管理',
                url: '/datament/pdictionary'
            }
        ]
    }
]


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
            },
            {
                name: '资料管理',
                url: '/datament',
                type: 'datament'
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
            case 'datament':
                // 资料管理
                data = datamentdata
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
