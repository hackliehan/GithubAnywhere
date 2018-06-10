/**
 * @author binhg
 */
import React, {Component} from 'react'
import { 
  StyleSheet, 
  View,
  Image,
  DeviceEventEmitter 
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'

import HotRepository from './hot/HotRepository'
import TrendRepository from './trend/TrendRepository'
import FavorateRepository from './favo/FavorateRepository'
import Customer from './cust/Customer'
import EasyToast,{DURATION} from 'react-native-easy-toast'

/**
 * 主页监听动作类型
 */
export const ACTION_TYPE = {
  SHOW_TOAST:'SHOW_TOAST',
  REFRESH:'REFRESH'
}

/**
 * 主页 tab 类型定义
 */
export const TAB_FLAG = {
  HOT:'HOT',
  TREND:'TREND',
  FAVO:'FAVO',
  CUST:'CUST'
}

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      switchTab : this.props.selectedTab?this.props.selectedTab:TAB_FLAG.HOT
    }
  }

  componentDidMount(){
    this.listener = DeviceEventEmitter.addListener('home_action',(actionType,payload)=>{
      switch(actionType){
        case ACTION_TYPE.SHOW_TOAST:
          this.showToast(payload);
          break;
        case ACTION_TYPE.REFRESH:
          this.reFreshHome(payload);
          break;
      }
    });
  }

  componentWillUnmount(){
    if(this.listener){
      this.listener.remove();
    }
  }

  showToast(params){
    this.toast.show(params.message,params.duration||DURATION.LENGTH_LONG);
  }
  
  /**
   * 刷新主页面
   * @param {object} params 
   */
  reFreshHome(params){
    let {selectedTab} = params;
    this.props.navigator.resetTo({
      component:Home,
      params:{
        ...this.props,
        selectedTab
      }
    });
  }

  renderTabView(TabComp,tabType,title,renderIcon){
    return (
      <TabNavigator.Item
            selected = {this.state.switchTab === tabType}
            title={title}
            selectedTitleStyle = {styles.selectedTitle}
            renderIcon = {()=><Image 
              style={styles.icon}
              source={renderIcon}  
            />}
            renderSelectedIcon = {()=><Image 
              style={[styles.icon,styles.selectedIcon]}
              source={renderIcon}  
            />}
            onPress = {()=>{this.setState({switchTab:tabType})}}
      >
        <TabComp {...this.props}/>
      </TabNavigator.Item>
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <TabNavigator>
          {this.renderTabView(HotRepository,TAB_FLAG.HOT,'热门',require('../../res/images/ic_polular.png'))}
          {this.renderTabView(TrendRepository,TAB_FLAG.TREND,'趋势',require('../../res/images/ic_trending.png'))}
          {this.renderTabView(FavorateRepository,TAB_FLAG.FAVO,'收藏',require('../../res/images/ic_favorite.png'))}
          {this.renderTabView(Customer,TAB_FLAG.CUST,'我',require('../../res/images/ic_my.png'))}
        </TabNavigator>
        <EasyToast ref={toast => this.toast = toast} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  icon:{
    width:26,
    height:26
  },
  selectedIcon:{
    tintColor:'red'
  },
  selectedTitle:{
    color:'red'
  }
})
