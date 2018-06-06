/**
 * @desc 用户主页
 * @author binhg
 */

import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import RepTipView from './RepTipView'
import NavigationBar from '../../component/NavigationBar'
import SortTipView from './SortTipView'

export default class Customer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar 
          title="用户主页"
        />
        <Text
          onPress={()=>{
            this.props.navigator.push({
              component:RepTipView
            });
          }}
        > 自定义标签 </Text>
        <Text
          onPress={()=>{
            this.props.navigator.push({
              component:SortTipView
            });
          }}
        > 标签排序 </Text>
        <Text
          onPress={()=>{
            this.props.navigator.push({
              component:RepTipView,
              params:{
                isRemove:true
              }
            });
          }}
        > 删除标签 </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
     flex:1
  }
})
