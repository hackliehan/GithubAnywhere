/**
 * @desc 最热相关数据的远程获取,以及本地操纵
 * @author binhg
 */

import FetchUtils from '../util/FetchUtils'
import {
    AsyncStorage
} from 'react-native'
import GitHubTrending from 'GitHubTrending'
import {generatorParam} from '../util/FetchUtils'

//获取的数据类型
export const DATA_TYPE = {
    type_hot:'type_hot_',
    type_trend:'type_trend_'
};

export default class HotRepositoryDao {

    constructor(dataType){
        this.dataType = dataType;
        this.key = '';
        if(dataType === DATA_TYPE.type_trend){
            this.trendUtil = new GitHubTrending();
        }
    }

    /**
     * 按照时间戳获取本地或者远程最新数据
     * @param {string} url 
     * @param {Object} params 
     */
    fetchRepoData(url,params){
        return new Promise((resolve,reject)=>{
            let key = this.dataType === DATA_TYPE.type_hot ?`${this.dataType}${params.q}`:
                `${this.dataType}${params.since}_${params.tabLabel}`;
            this.key = key;
            this.fetchLocalRepoData(key).then(res=>{
                let isNeedUpdate = true;
                if(res&&res.saveTimeStamp){
                    isNeedUpdate = this.isNeedUpdate(res.saveTimeStamp);
                }
                if(isNeedUpdate||!res.items||res.items.length<1){
                    this.fetchRemoteRepoData(url,params).then(res=>{
                        resolve(res);
                    }).catch(error=>{
                        reject(error);
                    });
                }else{
                    resolve(res.items);
                }
            }).catch(error=>{
                console.log(error);
                this.fetchRemoteRepoData(url,params).then(res=>{
                    resolve(res);
                }).catch(error=>{
                    reject(error);
                });
            })
        });
    }

    /**
     * 
     * @param {URL} url 
     * @param {参数} data 
     */
    fetchRemoteRepoData(url, params){
        return new Promise((resolve,reject)=>{
            if(this.dataType === DATA_TYPE.type_hot){
                FetchUtils.get(url,params).then(res=>{
                    if(!res||!res.items){
                        reject(new Error('从网络端获取数据为空!'));
                        return;      
                    }
                    resolve(res.items);
                    this.saveLocalRepoData(res.items,this.key).catch(error=>{
                        console.log(error);
                    });
                }).catch(error=>{
                    reject(error);
                })
            }else{
                this.trendUtil.fetchTrending(url).then(res=>{
                    resolve(res);
                    this.saveLocalRepoData(res,this.key).catch(error=>{
                        console.log(error);
                    });
                }).catch(error=>{
                    reject(error);
                })
            }
        })
    }

    /**
     * 获取本地保存信息
     * @param {string} key 
     */
    fetchLocalRepoData(key){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(key,(error,res)=>{
                if(error){
                    reject({
                        errorMsg:`获取${key}数据时出错`,
                        error
                    });
                }else{
                    try{
                        resolve(JSON.parse(res));
                    }catch(error){
                        reject({
                            errorMsg:`${key}由字符串格式化为对象时出错`,
                            error
                        });
                    }
                }
            });
        });
    }

    /**
     * 保存数据到本地存储
     */
    saveLocalRepoData(items,key){
        let saveTimeStamp = new Date().getTime();
        let data = {items,saveTimeStamp};
        return new Promise((resolve,reject)=>{
            let repoDataStr;
            try{
                repoDataStr = JSON.stringify(data);
            }catch(error){
                reject({
                    errorMsg:`${key}数据转换为字符串时出错`,
                    error
                });
            }
            AsyncStorage.setItem(key,repoDataStr,error=>{
                if(error){
                    reject({
                        errorMsg:`存储${key}数据时出错`,
                        error
                    });
                }else{
                    resolve(true);
                }
            });
        });
    }

    /**
     * 对比两次获取时间,查看是否需要获取网络数据
     * @param {上次存储时间戳} timeStamp 
     */
    isNeedUpdate(timeStamp){
        let currentDate = new Date();
        let prevSaveDate = new Date();
        prevSaveDate.setTime(timeStamp);
        let isYearChanged = currentDate.getFullYear() !== prevSaveDate.getFullYear();
        let isMonthChanged = currentDate.getMonth() !== prevSaveDate.getMonth();
        let isDateChanged = currentDate.getDate() !== prevSaveDate.getDate();
        let isLongHoursAgo = currentDate.getHours() - prevSaveDate.getHours()>2;
        return isYearChanged||isMonthChanged||isDateChanged||isLongHoursAgo;
    }


}
