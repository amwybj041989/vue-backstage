/**
 * api集成管理
 */
import Vue from 'vue'
import axios from 'axios'
import { API_HOST,setParams } from '../config/config'
import querystring from 'querystring'

export default {
    /**
     * 通用api方法
     */
    apiCommunication(apiname, param, callback) {
        var params = param
        if(apiname !== '/Login/login') {
            params = setParams(param)
        }
        axios.post(API_HOST + apiname, querystring.stringify(params))
            .then(function(response) {
                callback(response.data)
            })
    }
}

/**
 * boxment接口列表
 *
 * /Box/CreateBox  新建盒子
 * /Box/getBoxInfo  盒子详情
 * /Box/UpdateBox  更新盒子数据
 * /City/ProvinceAdminList  省份管理列表
 * /City/CreateProvince  新建省份
 * /City/CityAdminList  城市管理列表
 * /City/CreateCity  新建城市
 * /City/AreaAdminList  区镇管理列表
 * /City/CreateArea  新建区镇
 * /City/CommunityAdminList  小区管理列表
 * /City/CreateCommunity  小区管理列表
 */

/**
 * 通用接口列表
 *
 * /Login/login  用户登录
 * /Box/BoxList  所有盒子列表
 * /City/ProvinceList  所有省份列表
 * /City/CityList  根据省份返回城市列表
 * /City/AreaList  根据城市返回区镇列表
 * /City/CommunityList  根据区镇返回小区列表
 * /Material/ProductBigClass  获取商品大类列表
 * /Material/ProductMediumClass  根据商品大类id获取商品中类
 * /Material/ProductSmallClass  根据商品中类id获取商品小类
 * /Material/DictionarySearchList  根据字典类型编码获取字典列表
 * /Product/ProductSelectSupplier  获取供应商列表
 */

/**
 * datament接口列表
 *
 * /Material/ProductClassList  获取商品分类列表
 * /Material/getClass  获取所有商品分类(新建/编辑商品分类时候用)
 * /Material/deleteProductClass  删除商品分类
 * /Material/UpdateProductClass  更新商品分类数据
 * /Material/CreateProductClass  新建商品分类
 * /Material/getProductClassInfo  获取商品分类详情
 * /Material/UpdateProductClass  更新商品分类
 * /Material/CreateSupplier  新增供货商
 * /Material/SupplierList  供货商列表
 * /Material/DeleteSupplier  删除供货商
 * /Material/SupplierInfo  获取某个供货商详情
 * /Material/UpdateSupplier  更新供货商资料
 * /Material/DictionaryTypeList  获取商品字典类型列表
 * /Material/CreateType  新增商品字典类型
 * /Material/DictionaryList  获取商品字典列表
 * /Material/CreateDictionary  新增字典
 * /Product/ProductList  获取商品列表
 * /Product/CreateProduct  新增商品
 */

/**
 * overview接口列表
 *
 * /Sales/getDashboardData  地图概览
 */

/**
 * sellement接口列表
 *
 * /Sales/SalesData  销售数据概览
 * /Order/ProductSalesData  获取商品销售统计
 * /Order/OrderList  订单数据查询
 * /Sales/getTimeData  销售时间段分析
 * /Sales/getSalesAmount  销售额/订单量曲线图
 */

/**
 * staffment接口列表
 *
 * /Tallyman/TallymanList  理货员列表
 * /Tallyman/CreateTally  新建理货员
 */

/**
 * userment接口列表
 *
 * /User/getUserList  注册用户列表
 * /User/getUserInfo  注册用户基础资料
 * /User/getBuyRecord  注册用户购买记录
 */
