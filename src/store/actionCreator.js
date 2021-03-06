import axios from 'axios';
import * as actionTypes from './actionTypes'
import { message } from 'antd';
import Qs from 'qs';
import { createBrowserHistory } from 'history'; 

const history = createBrowserHistory();
export const showModal = () => ({
    type: actionTypes.SHOW_MODAL
});
export const welcomeSaveIsAdminToTrue = () => ({
    type: actionTypes.WELCOME_IS_ADMIN_TO_TRUE
})
export const welcomeSaveIsAdminToFalse = () => ({
    type: actionTypes.WELCOME_IS_ADMIN_TO_FALSE
})
export const cancelModal = () => ({
    type: actionTypes.CANCEL_MODAL
})
// 模态框从登录变为注册
export const toRegisterMain = () => ({
    type: actionTypes.TO_REGISTER_MAIN
})
// 模态框从注册变为登录
export const toLoginMain = () => ({
    type: actionTypes.TO_LOGIN_MAIN
})

// 获取验证码button状态，从false改为true

export const changeGetCodeBtnToTrue =()=>({
    type:actionTypes.CHANGE_GETCODE_BTN_TO_TRUE
})

export const changeGetCodeBtnToFalse =()=>({
    type:actionTypes.CHANGE_GETCODE_BTN_TO_FALSE
})
// 获取验证码接口
export const getRegisterCode = (username) => {
    // console.log('xxxx'+email);
    
    // console.log(Qs.stringify(email))
    return (dispatch) => {
        let data = {
            username:username
        }
        // console.log(Qs.stringify(data))
        axios({
            method:'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url:'/api/authentication/vccode',
            data:Qs.stringify(data)
        }).then((res)=>{
            // console.log(res.data)
            message.success(res.data.message);
            // history.push('/#/');
            // setTimeout( ()=>  history.go(),1600);
            // console.log(res)
        }).catch((error)=>{
            // console.log(error);
            dispatch(changeGetCodeBtnToTrue)
            message.error('失败,请稍后重试。',error);
            
        })
    }
}
// 注册
export const toRegister = (RegisterObject)=>{
    
    return (dispatch) => {
        let data = RegisterObject;
        // console.log(data)
        
        axios({
            method:'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            url:'/api/authentication/register',
            data:Qs.stringify(data)
        }).then((res)=>{
            console.log(res.data)
            // 跳转到登录页
            message.success(res.data.message);
            dispatch(toLoginMain());
        }).catch((error)=>{
            message.error('注册失败：',error);
            
        })
    }
}


// Paul-eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJQYXVsIiwic3ViIjoibGVvbkBob29jLnRvcCIsImp0aSI6IjIiLCJleHAiOjE1ODI5ODQxNjd9.LYi3-ZFmvmpGFWU5TXJjOUP-K9M4qRaxUGg2bXwaMOQRhoKWVz82a1inA-3PykpgSrjOiaOHvM2HPeBye-2uaw
// 登录
// export const toLogin = (LoginObject)=>{
   
//     return (dispatch) => {
     

//         axios({
//             method:'post',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authority':'Paul-eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJQYXVsIiwic3ViIjoibGVvbkBob29jLnRvcCIsImp0aSI6IjIiLCJleHAiOjE1ODI5ODQxNjd9.LYi3-ZFmvmpGFWU5TXJjOUP-K9M4qRaxUGg2bXwaMOQRhoKWVz82a1inA-3PykpgSrjOiaOHvM2HPeBye-2uaw'

//             },
//             url:'/api/m/mealKind/酒水饮品',
          
//         }).then((res)=>{
//             console.log(res.data);
            
    
            
//         }).catch((error)=>{
//             message.error('登录失败：',error);
//         })
//     }
// }

// 登录
export const toLogin = (LoginObject)=>{
    // console.log('actioncreateorLogin');
    // console.log(LoginObject);
    return (dispatch) => {
        let data = LoginObject;
        axios({
            method:'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            url:'/api/authentication/login',
            data:Qs.stringify(data)
        }).then((res)=>{
            if(res.data.success){
                // console.log(res.data)
                message.success('登录成功');
                dispatch(loginSuccessSaveState(res.data.message));
                // 登录成功保存状态和token到sessionStroge
                sessionStorage.setItem('isLogin',res.data.success);
                sessionStorage.setItem('token',res.data.message);
                var isAdmin = sessionStorage.getItem('isAdmin');
                // console.log(isAdmin);
                
                //判断是不是管理员登录
                if(isAdmin == 'admin'){
                    history.push('/#/a/');
                    setTimeout( ()=>  history.go(),1600);
                }
                dispatch(cancelModal());
                
               
            }else{
                message.warning(res.data.message);
            }
            
        }).catch((error)=>{
            message.error('登录失败：',error);
        })
    }
}
// 登录成功保存状态
export const loginSuccessSaveState = (LoginSuccessObject) =>({
    type:actionTypes.LOGIN_SUCCESS_SAVE_STATE,
    data:LoginSuccessObject
})

// 登出
export const logout = ()=>({
    type:actionTypes.TO_LOGIN_OUT
})

export const getAllCategoriesList = (categoriesData)=>({
    type:actionTypes.GET_ALL_CATEGORIES,
    data:categoriesData
})

//获得主页菜品分类列表

export const getAllCategories = ()=> {
    return (dispatch) => {
        axios({
            method:'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            url:'/api/m/mealKind',
        }).then((res)=>{
            if(res.data.success){
                console.log(res.data)
                dispatch(getAllCategoriesList(res.data.data));
            }else{
                message.warning(res.data.message);
            }
            
        }).catch((error)=>{
            message.error('获取失败：',error);
        })
    }
}

//改变管理sider的选择状态
export const changeSiderSelectState = (key)=>({
    type:actionTypes.CHANGE_ADMIN_SIDER_STATE,
    data:key
})

//显示addClissifyContent Modal
export const classifyShowAddModal = ()=>({
    type:actionTypes.CLASSIFY_SHOW_ADD_MODAL
})

export const classifyCancelAddModal = ()=>({
    type:actionTypes.CLASSIFY_CANCEL_ADD_MODAL
})

//增加菜品
export const addDish = (dishObject)=>{
    return (dispatch) => {
        let data = {
            name:dishObject.dishName,
            description:dishObject.dishDescribe,
            price:parseFloat(dishObject.dishUnitPrice),
            mealKind:dishObject.dishCategory,
            picUrl:dishObject.dishPicture.file.response.data
        }
        // console.log('actionCreator data',data);
        
        
        
        axios({
            method:'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authority':sessionStorage.getItem('token')
            },
            url:'/api/m/admin/meal',
            data:Qs.stringify(data)
        }).then((res)=>{
            if(res.data.success){
               message.success('增加菜品成功');
               history.push('/#/a/dishesadd');
               setTimeout( ()=>  history.go(),1600);
            }else{
                message.warning(res.data.message);
            }
            
        }).catch((error)=>{
            message.error('增加菜品失败：',error);
        })
    }
}


//添加分类
export const addCategory = (categoryName)=>{
    return (dispatch) => {
        let data = {
            name:categoryName
        };
        // console.log('actionCreator data',data); 
        axios({
            method:'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authority':sessionStorage.getItem('token')
            },
            url:'/api/m/admin/mealKind/'+categoryName,
            data:Qs.stringify(data)
        }).then((res)=>{
            if(res.data.success){
               message.success('增加分类成功');
               history.push('/#/a/classify');
               setTimeout( ()=>  history.go(),1600);
            }else{
                message.warning(res.data.message);
            }

        }).catch((error)=>{
            message.error('增加分类失败：',error);
        })
    }
}

//删除分类
export const deleteCategory = (categoryName)=>{
    return (dispatch) => {
        let data = {
            name:categoryName
        };
        // console.log('actionCreator data',data); 
        axios({
            method:'delete',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authority':sessionStorage.getItem('token')
            },
            url:'/api/m/admin/mealKind/'+categoryName,
            data:Qs.stringify(data)
        }).then((res)=>{
            if(res.data.success){
               message.success('删除分类成功');
               history.push('/#/a/classify');
               setTimeout( ()=>  history.go(),1600);
            }else{
                message.warning(res.data.message);
            }

        }).catch((error)=>{
            message.error('删除分类失败：',error);
        })
    }
}

//编辑分类
export const editCategory = (oldCategoryName,newCategoryName)=>{
    return (dispatch) => {
        let data = {
            oldName:oldCategoryName,
            newName:newCategoryName
        };
        // console.log('actionCreator data',data); 
        axios({
            method:'put',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authority':sessionStorage.getItem('token')
            },
            url:'/api/m/admin/mealKind/'+oldCategoryName,
            data:Qs.stringify(data)
        }).then((res)=>{
            if(res.data.success){
               message.success('修改分类成功');
               history.push('/#/a/classify');
               setTimeout( ()=>  history.go(),1600);
            }else{
                message.warning(res.data.message);

            }

        }).catch((error)=>{
            message.error('修改分类失败：',error);
        })
    }
}

//删除菜品通过id
export const deleteDishById = (dishId)=>{
    return (dispatch) => {
        let data = {
            id:dishId
        };
        // console.log('actionCreator data',data); 
        axios({
            method:'delete',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authority':sessionStorage.getItem('token')
            },
            url:'/api/m/admin/meal/'+dishId,
            data:Qs.stringify(data)
        }).then((res)=>{
            // console.log(res);
            
            if(res.data.success){
               message.success('删除菜品成功');
               history.push('/#/a/disheslist');
               setTimeout( ()=>  history.go(),1600);
            }else{
                message.warning(res.data.message);
            }

        }).catch((error)=>{
            message.error('删除菜品失败：',error);
        })
    }
}

// 前台用户部分

//获取全部菜品


export const getAllDishes = ()=> {
    return (dispatch) => {
        axios({
            method:'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            url:'/api/m/meal',
        }).then((res)=>{
            if(res.data.success){
                //成功后改变仓库内容
                dispatch(getSelectKeyDishesList(res.data.data));
            }else{
                message.warning(res.data.message);
            }
            
        }).catch((error)=>{
            message.error('获取失败：',error);
        })
    }
}


//根据用户选择的id去更改渲染home菜品列表
//将拿到的菜品列表放到仓库中
export const getSelectKeyDishesList = (dishesData)=>({
    type:actionTypes.HOME_DISHES_LIST,
    data:dishesData
})

export const changeHomeDishesList = (selectKey)=> {
    return (dispatch) => {
        axios({
            method:'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            url:'/api/m/meal/kind/'+selectKey,
        }).then((res)=>{
            if(res.data.success){
                // console.log(res.data)
                dispatch(getSelectKeyDishesList(res.data.data));
            }else{
                message.warning(res.data.message);
            }
            
        }).catch((error)=>{
            message.error('获取失败：',error);
        })
    }
}
