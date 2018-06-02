/**
 *@desc 最热模块主页
 *@author binhg
 */
import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import NavigationBar from '../../component/NavigationBar'
import HotRepListView from './HotRepListView'

export default class HotRespoitory extends Component {
  render() {

    return (
      <View style={styles.container}>

        <NavigationBar 
          title="最热项目"
        />

        <ScrollableTabView 
          initialPage = {0}
          renderTabBar = { ()=><ScrollableTabBar /> }
        >
          <HotRepListView tabLabel='iOS'>iOS</HotRepListView>
          <HotRepListView tabLabel='Android'>Android</HotRepListView>
          <HotRepListView tabLabel='Java'>Java</HotRepListView>
          <HotRepListView tabLabel='Javascript'>Javascript</HotRepListView>
        </ScrollableTabView>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})
