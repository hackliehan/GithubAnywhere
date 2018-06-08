/**
 * @desc 标签相关数据操作 dao
 * @author binhg
 */

import tipData from '../../res/data/preTips.json'
import trendData from '../../res/data/preTrendingType.json'
import {AsyncStorage} from 'react-native'

//存储数据标志
export const SELECTED_FLAG = {
    LANG_TREND:'LANG_TREND',
    LANG_HOT:'LANG_HOT'
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
                    resolve(this.flag === SELECTED_FLAG.LANG_HOT?tipData:trendData);
                    this.saveTipData(this.flag === SELECTED_FLAG.LANG_HOT?tipData:trendData);
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