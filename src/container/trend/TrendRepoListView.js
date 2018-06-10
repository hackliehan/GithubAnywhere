/**
 * 趋势列表页面
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
import TrendRepoCard from '../common/TrendRepoCard'
import RepoDetailView from '../common/RepoDetailView'
import { FAVO_TYPE } from '../../dao/FavoRepoDao'
import FavorateCommon from '../common/FavorateCommon'

const QUERY_URL = 'https://github.com/trending/';
const GITHUB_URL = 'https://github.com';

export default class TrendRepoListView extends Component {
    constructor(props) {
      super(props)
      let ds = new ListView.DataSource({
          rowHasChanged:(r1,r2)=>r1!==r2
      });

      this.trendData = [];

      //获取 Repo 数据 dao
      this.trendDao = new HotRepositoryDao(DATA_TYPE.type_trend);
      this.favoCommon = new FavorateCommon(FAVO_TYPE.TYPE_TREND);

      this.state = {
        dataSource:ds,
        isLoading:false
      }
    }

    componentDidMount(){
        let {since:{value:since}} = this.props;
        this.loadResByLang(since);
        this.listener = DeviceEventEmitter.addListener('hasChangeTrendFavorate',()=>{
            this.favoCommon.changeStatus(true);
        });
    }

    componentWillReceiveProps(nextProps){
        let newSince = nextProps.since.value,
            oldSince = this.props.since.value;
        if(newSince !== oldSince){
            this.loadResByLang(newSince);
        }else if(this.favoCommon.getStatus()){
            this.favoCommon.changeStatus(false);
            this.loadResByLang(newSince);
        }
    }
    
    componentWillUnmount(){
        if(this.listener){
            this.listener.remove();
        }
    }

    enterRow(item){
        let {fullName:full_name,url} = item;
        this.props.navigator.push({
            component:RepoDetailView,
            params:{
                item:{full_name,html_url:`${GITHUB_URL}${url}`,...item},
                favoType:FAVO_TYPE.TYPE_TREND
            }
        });
    }

    renderRow(item){
        return <TrendRepoCard 
            onPress={()=>this.enterRow(item)} 
            item={item} 
            onFavorate = {item=>this.favoCommon.saveFavorateItem(item)} 
            onUnFavorate = {item=>this.favoCommon.delFavorateItem(item)}
            {...this.props}
        />
    }

    flushDataSource(){
        let dataList = this.favoCommon.mixFavoAndRepo(this.trendData);
        this.setState({dataSource:this.state.dataSource.cloneWithRows(dataList)});
        this.setState({isLoading:false});
    }

    loadResByLang(since){
        this.setState({
            isLoading:true
        });
        let {tabLabel} = this.props;
        return this.trendDao.fetchRepoData(`${QUERY_URL}${tabLabel}?since=${since}`,{
            tabLabel,
            since
        }).then(res=>{
            this.trendData = res;
            this.favoCommon.loadFavorateData().then(()=>{
                this.flushDataSource();
            });
        }).catch(error=>{
            console.log(error);
            this.setState({isLoading:false});
        });
    }

    render() {
        let {since:{value:since}} = this.props;
        return (
        <View style={styles.container}>
            <ListView 
                dataSource = {this.state.dataSource}
                renderRow = {item=>this.renderRow(item)}
                enableEmptySections = {true}
                refreshControl = {<RefreshControl 
                    refreshing = {this.state.isLoading}
                    onRefresh = {()=>this.loadResByLang(since)}
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
