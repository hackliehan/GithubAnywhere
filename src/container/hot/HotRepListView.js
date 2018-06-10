/**
 * @desc 最热分类数据列表
 * @author binhg
 */

import React, { Component } from 'react'
import { 
    StyleSheet, 
    View,
    ListView,
    RefreshControl,
    DeviceEventEmitter
 } from 'react-native'

import HotRepositoryDao,{DATA_TYPE} from '../../dao/HotRepositoryDao'
import RepositoryCard from '../common/RepositoryCard'
import RepoDetailView from '../common/RepoDetailView'
import {FAVO_TYPE} from '../../dao/FavoRepoDao'
import FavorateCommon from '../common/FavorateCommon'

const QUERY_URL = 'https://api.github.com/search/repositories';

export default class HotRepListView extends Component {
    constructor(props) {
      super(props)
      let ds = new ListView.DataSource({
          rowHasChanged:(r1,r2)=>r1!==r2
      });

      this.hotData = [];

      //获取 hot 数据 dao
      this.hotDao = new HotRepositoryDao(DATA_TYPE.type_hot);
      this.favoCommon = new FavorateCommon(FAVO_TYPE.TYPE_HOT);

      this.state = {
         dataSource:ds,
         isLoading:false
      }
    }

    componentDidMount(){
        this.loadResByLang();
        this.listener = DeviceEventEmitter.addListener('hasChangeHotFavorate',()=>{
            this.favoCommon.changeStatus(true);
        });
    }

    componentWillReceiveProps(){
        if(this.favoCommon.getStatus()){
            this.favoCommon.changeStatus(false);
            this.loadResByLang();
        }
    }

    componentWillUnmount(){
        if(this.listener){
            this.listener.remove();
        }
    }
    
    enterRow(item){
        this.props.navigator.push({
            component:RepoDetailView,
            params:{
                item,
                favoType:FAVO_TYPE.TYPE_HOT
            }
        });
    }

    renderRow(item){
        return <RepositoryCard
            onPress={()=>this.enterRow(item)}
            onFavorate = {item=>this.favoCommon.saveFavorateItem(item)} 
            onUnFavorate = {item=>this.favoCommon.delFavorateItem(item)}
            item={item} 
            {...this.props}
        />
    }

    

    flushDataSource(){
        let dataList = this.favoCommon.mixFavoAndRepo(this.hotData);
        this.setState({dataSource:this.state.dataSource.cloneWithRows(dataList)});
        this.setState({isLoading:false});
    }

    loadResByLang(){
        let {query} = this.props.tip;
        this.setState({
            isLoading:true
        });
        return this.hotDao.fetchRepoData(QUERY_URL,{
            q:query,
            sort:'stars'
        }).then(res=>{
            this.hotData = res;
            this.favoCommon.loadFavorateData().then(()=>{
                this.flushDataSource();
            });
            
        }).catch(error=>{
            console.log(error);
            this.setState({isLoading:false});
        });
    }

    render() {
        return (
        <View style={styles.container}>
            <ListView 
                dataSource = {this.state.dataSource}
                renderRow = {item=>this.renderRow(item)}
                enableEmptySections = {true}
                refreshControl = {<RefreshControl 
                    refreshing = {this.state.isLoading}
                    onRefresh = {()=>this.loadResByLang()}
                    title="加载最新数据"
                    titleColor={'#99CCFF'} 
                    colors={['#99CCFF']}
                    tintColor={'#99CCFF'}
                 />}
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    lines:{
        backgroundColor:'black',
        height:1
    }
})
