/**
 * 收藏模块列表展示页
 */

import React, { Component } from 'react'
import { 
    StyleSheet, 
    View,
    ListView,
    RefreshControl,
    DeviceEventEmitter,
    Alert
 } from 'react-native'

import RepositoryCard from '../common/RepositoryCard'
import TrendRepoCard from '../common/TrendRepoCard'
import RepoDetailView from '../common/RepoDetailView'
import {FAVO_TYPE} from '../../dao/FavoRepoDao'
import FavorateCommon from '../common/FavorateCommon'

const GITHUB_URL = 'https://github.com';

export default class FavRepoListView extends Component {
    constructor(props) {
      super(props)
      let ds = new ListView.DataSource({
          rowHasChanged:(r1,r2)=>r1!==r2
      });
      this.isHot = this.props.tip.type === FAVO_TYPE.TYPE_HOT?true:false;
      this.favoCommon = new FavorateCommon(this.isHot?FAVO_TYPE.TYPE_HOT:FAVO_TYPE.TYPE_TREND);

      this.state = {
         dataSource:ds,
         isLoading:false
      }
    }

    componentDidMount(){
        this.loadFavoData(true);
        this.listener = DeviceEventEmitter.addListener(this.favoCommon.getEventName(),()=>{
            this.loadFavoData(false);
            this.favoCommon.changeStatus(true);
        });
    }

    componentWillUnmount(){
        if(this.listener){
            this.listener.remove()
        }
    }

    componentWillReceiveProps(){
        if(this.favoCommon.getStatus()){
            this.loadFavoData(true);
        }
    }
    
    enterRow(item){
        let {fullName:full_name,url} = item;
        this.props.navigator.push({
            component:RepoDetailView,
            params:{
                item:{full_name,html_url:`${GITHUB_URL}${url}`,...item},
                favoType:this.props.tip.type
            }
        });
    }

    renderRow(item){
        return (
            this.isHot?<RepositoryCard 
                onPress={()=>this.enterRow(item)}
                onFavorate = {item=>this.favoCommon.saveFavorateItem(item)} 
                onUnFavorate = {item=>this.favoCommon.delFavorateItem(item)}
                item={item} 
                {...this.props}
            />:<TrendRepoCard 
                onPress={()=>this.enterRow(item)} 
                item={item} 
                onFavorate = {item=>this.favoCommon.saveFavorateItem(item)} 
                onUnFavorate = {item=>this.favoCommon.delFavorateItem(item)}
                {...this.props}
            />
        )
    }

    

    loadFavoData(isNeedLoading){
        if(isNeedLoading){
            this.setState({
                isLoading:true
            });
        }
        this.favoCommon.loadFavorateData().then(()=>{
            let favoData = this.favoCommon.getFavoData();
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(favoData),
                isLoading:false
            });
        })
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
                    onRefresh = {()=>this.loadFavoData(true)}
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