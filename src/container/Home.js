/**
 * @author binhg
 */
import React, {Component} from 'react'
import {
  Text, 
  StyleSheet, 
  View,
  Image  
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'

import HotRespority from './hot/HotRespority'
import TrendRespority from './trend/TrendRespority'
import FavorateRespority from './favo/FavorateRespority'
import Customer from './cust/Customer'


export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      switchTab : 'hot'
    }
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
        <TabComp />
      </TabNavigator.Item>
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <TabNavigator>
          {this.renderTabView(HotRespority,'hot','最热',require('../../res/images/ic_polular.png'))}
          {this.renderTabView(TrendRespority,'trend','趋势',require('../../res/images/ic_trending.png'))}
          {this.renderTabView(FavorateRespority,'favo','收藏',require('../../res/images/ic_favorite.png'))}
          {this.renderTabView(Customer,'cust','我',require('../../res/images/ic_my.png'))}
        </TabNavigator>
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
