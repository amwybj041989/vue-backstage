/**
 * api相关，所有接口操作都在这里完成
 */
import Vue from 'vue'
import { MessageBox } from 'element-ui'
import axios from 'axios'
import { API_HOST,setParams } from '../config/config'
import querystring from 'querystring'

export default {
    /**
     * 用户登录
     */
    onLogin(userinfo, callback) {
        axios.post(API_HOST + '/Login/login', querystring.stringify(userinfo)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('登录失败，请检查用户名或密码重新填写登录或者联系管理员', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
            MessageBox.alert('登录失败，接口出错，请联系管理员', '系统通知', { confirmButtonText: '确定', type: 'error' })
        })
    },
    /**
     * 地图概览
     */
    getOverviewData(callback) {
        var params = setParams({})
        axios.post(API_HOST + '/Sales/getDashboardData', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('登录失败，请检查用户名或密码重新填写登录或者联系管理员', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
            MessageBox.alert('登录失败，接口出错，请联系管理员', '系统通知', { confirmButtonText: '确定', type: 'error' })
        })
    },
    /**
     * 销售数据概览
     */
    getDashboardData(callback) {
        var params = setParams({})
        axios.post(API_HOST + '/Sales/SalesData', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 获取商品销售统计
     */
    getProductSales(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Order/ProductSalesData', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 订单数据查询
     */
    getOrderList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Order/OrderList', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 理货员列表
     */
    getStafftalist(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Tallyman/TallymanList', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 注册用户列表
     */
    getUserList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/User/getUserList', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 注册用户基础资料
     */
    getUserBasisData(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/User/getUserInfo', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 注册用户购买记录
     */
    getUserBuyRecord(param, callback){
        var params = setParams(param)
        axios.post(API_HOST + '/User/getBuyRecord', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 获取商品分类列表
     */
    getProductClassList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/ProductClassList', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 获取所有商品分类(新建/编辑商品分类时候用)
     */
    getClass(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/getClass', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 删除商品分类
     */
    deleteProductClass(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/deleteProductClass', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('服务器通讯失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }) .catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 更新商品分类数据
     */
    updateProductClass(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/UpdateProductClass', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('保存失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 新建商品分类
     */
    createProductClass(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/CreateProductClass', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 获取商品分类详情
     */
    getProductClassInfo(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/getProductClassInfo', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 更新商品分类
     */
    updateProductClass(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/UpdateProductClass', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 新增供货商
     */
    createSupplier(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/CreateSupplier', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 供货商列表
     */
    getSupplierList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/SupplierList', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 删除供货商
     */
    deleteSupplier(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/DeleteSupplier', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('删除数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 获取某个供货商详情
     */
    getSupplierInfo(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/SupplierInfo', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 更新供货商资料
     */
    updateSupplier(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/UpdateSupplier', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('数据更新失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 获取商品字典类型列表
     */
    getDictionaryTypeList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/DictionaryTypeList', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('数据获取失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 新增商品字典类型
     */
    createDictionaryType(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/CreateType', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('创建失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 获取商品字典列表
     */
    getDictionaryList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/DictionaryList', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('数据获取失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 新增字典
     */
    createDictionary(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/CreateDictionary', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('创建失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 销售时间段分析
     */
    getSalesTime(callback) {
        var params = setParams({})
        axios.post(API_HOST + '/Sales/getTimeData', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 销售额/订单量曲线图
     */
    getSalesAmount(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Sales/getSalesAmount', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 所有盒子列表
     */
    getBoxList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Box/BoxList', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    }
}
