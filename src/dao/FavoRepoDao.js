/**
 * @desc 收藏仓库数据对比
 * @author binhg
 */

import {AsyncStorage} from 'react-native'

/**
 * 收藏类型
 */
export const FAVO_TYPE = {
    TYPE_HOT:'TYPE_HOT',
    TYPE_TREND:'TYPE_TREND'
}

export default class FavoRepoDao {

    constructor(type){
        this.type = type;
    }

    fetchFavoData(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.type,(error,res)=>{
                if(error){
                    reject(error);
                }else{
                    if(!res){
                        res = '[]';
                    }
                    try{
                        resolve(JSON.parse(res));
                    }catch(error){
                        reject(error);
                    }
                }
            });
        });
    }

    saveFavoData(items){
        return new Promise((resolve,reject)=>{
            let favoStr;
            try{
                favoStr = JSON.stringify(items);
            }catch(error){
                reject(error);
            }
            AsyncStorage.setItem(this.type,favoStr,error=>{
                if(error){
                    reject(error);
                }else{
                    resolve(true);
                }
            });
        });
    }

}