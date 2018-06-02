/**
 * @desc 最热相关数据的远程获取,以及本地操纵
 * @author binhg
 */

import FetchUtils from '../util/FetchUtils'

export default class HotRepositoryDao {


    //获取网络数据
    fetchRemoteRes(url,data){
        return new Promise((resolve,reject)=>{
            FetchUtils.get(url,data).then(res=>{
                if(!res||!res.items){
                    reject(new Error('从网络端获取数据为空!'));
                    return;      
                }
                resolve(res.items);
            }).catch(error=>{
                reject(error)
            })
        })
    }


}
