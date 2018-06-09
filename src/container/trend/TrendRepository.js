/**
 * @desc 趋势模块
 * @author binhg
 */

import React, { Component } from 'react'
import { Text, StyleSheet, View ,Image,TouchableOpacity,DeviceEventEmitter} from 'react-native'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import NavigationBar from '../../component/NavigationBar'
import TrendRepoListView from './TrendRepoListView'
import RepTipDao,{SELECTED_FLAG} from '../../dao/RepTipDao'
import PopoverView from '../../component/PopoverView'


//定义选项列表数据
const sinceData = [{
  key:'当 天',
  value:'daily'
},{
  key:'本 周',
  value:'weekly'
},{
  key:'本 月',
  value:'monthly'
}];

export default class TrendRepository extends Component {
  
  constructor(props) {
    super(props)
    this.rtDao = new RepTipDao(SELECTED_FLAG.LANG_TREND);
    this.state = {
      tipData:[],
      sinceInfo : sinceData[0]
    }
  }
  
  componentDidMount(){
    this.loadTipData();
  }

  renderScrollTabView(){
    if(this.state.tipData.length<1) return null;
    return  <ScrollableTabView 
              tabBarUnderlineStyle={styles.tabView}
              tabBarActiveTextColor={'white'}
              tabBarInactiveTextColor={'white'}
              tabBarBackgroundColor={'#99CCFF'}
              initialPage = {0}
              renderTabBar = { ()=><ScrollableTabBar /> }
            > 
              {this.state.tipData.map((item,index)=>{
                return item.checked?<TrendRepoListView 
                  key={index}
                  tabLabel={item.name} 
                  tip={item}
                  since={this.state.sinceInfo}
                  {...this.props}
                >{item.name}</TrendRepoListView>:null
              })}
              
            </ScrollableTabView>
  }

  loadTipData(isRefreshList){
    this.rtDao.fetchTipData().then(data=>{
      this.setState({tipData:data});
    }).catch(error=>{
      console.log(error);
    })
  }

  showSinceSelect(){
    this.refs.sinceSelect.showPopover();
  }

  /**
   * 选中单个 popover 选项
  */
  selectSinceItem(item){
    this.setState({
      sinceInfo:item
    });
    this.refs.sinceSelect.closePopover();
  }

  renderTitleView(){
    return (
      <TouchableOpacity
        style={styles.titleViewTouch}
        ref='titleView'
        onPress = {()=>this.showSinceSelect()}
      >
        <View style={styles.titleView}>
          <Text style={styles.titleViewText}>趋势 {this.state.sinceInfo.key}</Text>
          <Image style={styles.titleViewImage} source={require('../../../res/images/ic_tiaozhuan_down.png')}></Image>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar 
          titleView={this.renderTitleView()}
        />
        {this.renderScrollTabView()}
        <PopoverView
          ref='sinceSelect'
          fromRectComp={this.refs.titleView}
          data = {sinceData}
          onSelected = {(item)=>{this.selectSinceItem(item)}}
        ></PopoverView>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  tabView:{
    backgroundColor:'#e7e7e7',
    height:3
  },
  titleViewTouch:{
    alignItems:'center',
    justifyContent:'center'
  },
  titleView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  titleViewText:{
    fontSize:20,
    color:'#FFF'
  },
  titleViewImage:{
    width:12,
    height:12,
    tintColor:'#FFF'
  }
})

 