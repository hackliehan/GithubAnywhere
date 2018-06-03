/**
 * @desc 标签相关数据操作 dao
 * @author binhg
 */

import tipData from '../../res/data/preTips.json'
import {AsyncStorage} from 'react-native'

//存储数据标志
export const SELECTED_FLAG = {
    LANG_TYPE:'LANG_TYPE',
    LANG_TIP:'LANG_TIP'
}

export default class RepTipDao {
    constructor(flag){
        this.flag = flag;
    }

    /**
     * 获取数据
     */
    fetchTipData(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.flag,(error,data)=>{
                if(error){
                    reject(error);
                    return;
                }
                if(data){
                    try{
                        resolve(JSON.parse(data));    
                    }catch(error){
                        reject(error);
                    }
                }
                else{
                    resolve(tipData);
                    this.saveTipData(tipData);
                }

            })
        });
    }

    /**
     * 保存数据
     * 直接打印错误信息
     */
    saveTipData(data){
        try{
            data = JSON.stringify(data);
        }catch(error){
            console.log(error);
        }
        AsyncStorage.setItem(this.flag,data,error=>{
            if(error){
                console.log(error);
            }
        }) 
    }

 }