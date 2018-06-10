/**
 * 提取收藏处理公用模块
 * @author binhg
 */
import ArrayUtils from '../../util/ArrayUtils'
import FavoRepoDao,{FAVO_TYPE} from '../../dao/FavoRepoDao'
import { DeviceEventEmitter } from 'react-native'

export default class FavorateComon {

    constructor(type){
        this.type = type;
        this.favoDao = new FavoRepoDao(this.type);
        this.favoData = [];
        this.idName = this.type === FAVO_TYPE.TYPE_HOT?'id':'fullName',
        this.hasChangeFavorateStatus = false;
        this.eventName = this.type === FAVO_TYPE.TYPE_HOT?'hasChangeHotFavorate':'hasChangeTrendFavorate'
    }

    loadFavorateData(){
        return this.favoDao.fetchFavoData().then(res=>{
            this.favoData = res;
        }).catch(error=>{
            console.log(error);
        })
    }

    notifyFavoHasChange(data){
        DeviceEventEmitter.emit(this.eventName,data);
    }

    saveFavorateItem(item){
        item.isFavorate =true;
        this.favoData.push(item);
        this.favoDao.saveFavoData(this.favoData).then(()=>{
            this.notifyFavoHasChange(this.favoData);
        }).catch(error=>{
            console.log(error);
        });
    }

    delFavorateItem(item){
        this.favoData = ArrayUtils.delItemById(this.favoData,item,this.idName);
        this.favoDao.saveFavoData(this.favoData).then(()=>{
            this.notifyFavoHasChange(this.favoData);
        }).catch(error=>{
            console.log(error);
        });
    }

    mixFavoAndRepo(repoData){
        return ArrayUtils.mixPropById(repoData,this.favoData,this.idName,'isFavorate');
    }

    changeStatus(isChanged){
        this.hasChangeFavorateStatus = isChanged;
    }

    getStatus(){
        return this.hasChangeFavorateStatus;
    }

    getFavoData(){
        return this.favoData;
    }

    getEventName(){
        return this.eventName;
    }

}