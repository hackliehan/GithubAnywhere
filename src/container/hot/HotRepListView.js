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
import RepositoryCard from '../../component/RepositoryCard'
import RepoDetailView from '../../component/RepoDetailView'

const QUERY_URL = 'https://api.github.com/search/repositories';

export default class HotRepListView extends Component {
    constructor(props) {
      super(props)
      let ds = new ListView.DataSource({
          rowHasChanged:(r1,r2)=>r1!==r2
      });

      //获取 hot 数据 dao
      this.hotDao = new HotRepositoryDao(DATA_TYPE.type_hot);

      this.state = {
         dataSource:ds,
         isLoading:false
      }
    }

    componentDidMount(){
        this.loadResByLang();
        this.listener = DeviceEventEmitter.addListener('reFreshHotList',()=>{
            this.loadResByLang();
        });
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
                item
            }
        });
    }

    renderRow(item){
        return <RepositoryCard 
            onPress={()=>this.enterRow(item)} 
            item={item} 
            {...this.props}
        />
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
            this.setState({dataSource:this.state.dataSource.cloneWithRows(res)});
            this.setState({isLoading:false});
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
