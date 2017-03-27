/**
 * 资料管理api
 */
import Vue from 'vue'
import { MessageBox } from 'element-ui'
import axios from 'axios'
import { API_HOST,setParams } from '../config/config'
import querystring from 'querystring'

export default {
    /**
     * 获取商品分类列表
     */
    getProductClassList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/ProductClassList', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response.data)
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
                callback(response.data)
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
                callback(response.data)
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
                callback(response.data)
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
                callback(response.data)
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
                callback(response.data)
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
                callback(response.data)
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
                callback(response.data)
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
                callback(response.data)
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
                callback(response.data)
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
                callback(response.data)
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
                callback(response.data)
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
                callback(response.data)
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
                callback(response.data)
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
                callback(response.data)
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
                callback(response.data)
            } else {
                MessageBox.alert('创建失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
}
