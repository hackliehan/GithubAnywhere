/**
 * @fetch 的基本封装
 * @author binhg
 */


/**
 * @private
 * @description 组装 GET 模式下的参数 支持一层深度对象
 * @param {Object} params 参数
 */
export function generatorParam(url,params,isJustNeedParams){
    params = params||{};
    let hasExistParams = url.indexOf('?') !== -1;
    let bridge = hasExistParams?'&':'?';
    let paramRows = [];
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const value = params[key];
            paramRows.push(`${key}=${value}`);
        }
    }
    if(isJustNeedParams) return paramRows.join('&');
    if(paramRows.length<1) return url;
    return `${url}${bridge}${paramRows.join('&')}`;
}

export default class HttpTool {

    //get 方法
    static get(url,params){
        url = generatorParam(url,params);
        return new Promise((resolve,reject)=>{
            fetch(url,{
                method:'GET'
            })
            .then(response=>response.json())
            .then(res=>{
                resolve(res)
            })
            .catch(error=>{
                reject(error)
            })
        })
    }

    //post 方法
    static post(url,params){
        return new Promise((resolve,reject)=>{
            fetch(url,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(params)
            }).then(response => response.json())
            .then(res=>{
                resolve(res);
            })
            .catch(error=>{
                reject(error)
            })
        })
    }

    //post  表单提交
    static postForm(url,params){
        console.log(url)
        return new Promise((resolve,reject)=>{
            fetch(url,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body:generatorParam('',params,true)
            }).then(response => response.json())
            .then(res=>{
                resolve(res);
            })
            .catch(error=>{
                reject(error)
            })
        })
    }

}