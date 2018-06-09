/**
 * 趋势列表页面
 * @author binhg
 */

import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    View,
    ListView,
    Image,
    RefreshControl
 } from 'react-native'

import HotRepositoryDao,{DATA_TYPE} from '../../dao/HotRepositoryDao'
import TrendRepoCard from '../../component/TrendRepoCard'
import RepoDetailView from '../../component/RepoDetailView'

const QUERY_URL = 'https://github.com/trending/';
const GITHUB_URL = 'https://github.com';

export default class TrendRepoListView extends Component {
    constructor(props) {
      super(props)
      let ds = new ListView.DataSource({
          rowHasChanged:(r1,r2)=>r1!==r2
      });

      //获取 Repo 数据 dao
      this.trendDao = new HotRepositoryDao(DATA_TYPE.type_trend);

      this.state = {
        dataSource:ds,
        isLoading:false
      }
    }

    componentDidMount(){
        this.loadResByLang(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.loadResByLang(nextProps);
    }
    
    enterRow(item){
        let {fullName:full_name,url} = item;
        this.props.navigator.push({
            component:RepoDetailView,
            params:{
                item:{full_name,html_url:`${GITHUB_URL}${url}`,...item}
            }
        });
    }

    renderRow(item){
        return <TrendRepoCard 
            onPress={()=>this.enterRow(item)} 
            item={item} 
            {...this.props}
        />
    }

    loadResByLang(data){
        let { tabLabel } = data;
        let {value:since} = data.since;
        console.log('接收到数据更改',since)
        this.setState({
            isLoading:true
        });
        return this.trendDao.fetchRepoData(`${QUERY_URL}${tabLabel}?since=${since}`,{
            tabLabel,
            since
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
                refreshControl = {<RefreshControl 
                    refreshing = {this.state.isLoading}
                    onRefresh = {()=>this.loadResByLang(this.props)}
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
