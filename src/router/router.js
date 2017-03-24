/**
 * 路由各项配置
 */
 import Vue from 'vue'
 import VueRouter from 'vue-router'

// 全局使用路由
Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        redirect: '/overview'
    },
    {
        name: 'login',
        path: '/login',
        component: require('../components/logins/login.vue')
    },
    {
        name: 'overview',
        path: '/overview',
        component: require('../components/overview/index.vue')
    },
    {
        name: 'sellement',
        path: '/sellment',
        redirect: '/sellment/selloverview',
        component: require('../components/sellment/index.vue'),
        children: [
            {
                name: 'selloverview',
                path: 'selloverview',
                component: require('../components/sellment/sellOverview.vue')
            },
            {
                name: 'sellsales',
                path: 'productsales',
                component: require('../components/sellment/productSales.vue')
            },
            {
                name: 'sellordersearch',
                path: 'ordersearch',
                component: require('../components/sellment/orderSearch.vue')
            }
        ]
    },
    {
        name: 'boxment',
        path: '/boxment',
        redirect: '/boxment/boxlist',
        component: require('../components/boxment/index.vue'),
        children: [
            {
                name: 'boxlist',
                path: 'boxlist',
                component: require('../components/boxment/boxlist.vue')
            },
            {
                name: 'boxeditor',
                path: 'boxeditor/:id',
                component: require('../components/boxment/boxEditor.vue')
            },
            {
                name: 'province',
                path: 'province',
                component: require('../components/boxment/province.vue')
            },
            {
                name: 'city',
                path: 'city',
                component: require('../components/boxment/city.vue')
            },
            {
                name: 'area',
                path: 'area',
                component: require('../components/boxment/area.vue')
            },
            {
                name: 'administrativeeditor',
                path: 'administrativeeditor/:id/type',
                component: require('../components/boxment/administrativeEditor.vue')
            },
            {
                name: 'administrativecreate',
                path: 'administrativecreate/:type',
                component: require('../components/boxment/administrativeCreate.vue')
            },
            {
                name: 'community',
                path: 'community',
                component: require('../components/boxment/community.vue')
            },
            {
                name: 'communityeditor',
                path: 'communityeditor/:id',
                component: require('../components/boxment/communityEditor.vue')
            }
        ]
    },
    {
        name: 'userment',
        path: '/userment',
        redirect: '/userment/userlist',
        component: require('../components/userment/index.vue'),
        children: [
            {
                name: 'usermentlist',
                path: 'userlist',
                component: require('../components/userment/userlist.vue')
            },
            {
                name: 'usermentdetail',
                path: 'detail/:id',
                component: require('../components/userment/detail.vue')
            },
            {
                name: 'usermentstatistics',
                path: 'statistics',
                component: require('../components/userment/statistics.vue')
            }
        ]
    },
    {
        name: 'staffment',
        path: '/staffment',
        redirect: '/staffment/tallymanlist',
        component: require('../components/staffment/index.vue'),
        children: [
            {
                name: 'staffmentlist',
                path: 'tallymanlist',
                component: require('../components/staffment/tallymanList.vue')
            },
            {
                name: 'staffmenteditor',
                path: 'tallymaneditor/:id',
                component: require('../components/staffment/tallymanEditor.vue')
            }
        ]
    },
    {
        name: 'datament',
        path: '/datament',
        redirect: '/datament/supplier',
        component: require('../components/datament/index.vue'),
        children: [
            {
                name: 'supplier',
                path: 'supplier',
                component: require('../components/datament/supplierList.vue')
            },
            {
                name: 'supplierEditor',
                path: 'supplierEditor/:id',
                component: require('../components/datament/supplierEditor.vue')
            },
            {
                name: 'bigclass',
                path: 'bigclass',
                component: require('../components/datament/bigclass.vue')
            },
            {
                name: 'mediumclass',
                path: 'mediumclass',
                component: require('../components/datament/mediumclass.vue')
            },
            {
                name: 'smallclass',
                path: 'smallclass',
                component: require('../components/datament/smallclass.vue')
            },
            {
                name: 'classcreate',
                path: 'classcreate/:type',
                component: require('../components/datament/classCreate.vue')
            },
            {
                name: 'classeditor',
                path: 'classeditor/:id/:type',
                component: require('../components/datament/classEditor.vue')
            },
            {
                name: 'pdictionary',
                path: 'pdictionary',
                component: require('../components/datament/pdictionary.vue')
            },
            {
                name: 'pdictionaryeditor',
                path: 'pdictionaryeditor/:id',
                component: require('../components/datament/pdictionaryEditor.vue')
            },
            {
                name: 'dictionarytype',
                path: 'dictionarytype',
                component: require('../components/datament/dictionaryTypeList.vue')
            },
            {
                name: 'dictionarytypeeditor',
                path: 'dictionarytypeeditor/:id',
                component: require('../components/datament/dictionaryTypeEditor.vue')
            },
            {
                name: 'productmgt',
                path: 'productmgt',
                component: require('../components/datament/productMgt.vue')
            }
        ]
    },
    {
        name: 'notfound',
        path: '/404',
        component: require('../components/common/notfound.vue')
    },
    { // 404页面路由必须放最后,引导所有未知链接跳转404
        path: '*',
        redirect: '/404'
    }
]

// 路由配置
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: routes
})

export  default router
