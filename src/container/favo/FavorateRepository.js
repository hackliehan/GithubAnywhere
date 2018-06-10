/**
 * @desc 收藏模块
 * @author binhg
 */

import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import NavigationBar from '../../component/NavigationBar'
import FavRepoListView from './FavRepoListView'
import {FAVO_TYPE} from '../../dao/FavoRepoDao'

/**
 * tab 数据
 */
const TabData = [{
  name:'热门',
  type:FAVO_TYPE.TYPE_HOT
},{
  name:'趋势',
  type:FAVO_TYPE.TYPE_TREND
}]; 

export default class FavorateRepository extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  renderScrollTabView(){
    return  <ScrollableTabView 
              tabBarUnderlineStyle={styles.tabView}
              tabBarActiveTextColor={'white'}
              tabBarInactiveTextColor={'white'}
              tabBarBackgroundColor={'#99CCFF'}
              initialPage = {0}
              renderTabBar = { ()=><ScrollableTabBar /> }
            > 
              {TabData.map((item,index)=>{
                return <FavRepoListView 
                  key={index}
                  tabLabel={item.name} 
                  tip={item}
                  {...this.props}
                >{item.name}</FavRepoListView>
              })}
              
            </ScrollableTabView>
  }

  render() {
    return (
      <View style={styles.container}>

        <NavigationBar 
          title="我的收藏"
        />
        {this.renderScrollTabView()}
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
  }
})

 