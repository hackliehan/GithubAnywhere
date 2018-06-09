/**
 * @desc 用户主页
 * @author binhg
 */

import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import RepTipView,{MODIFY_FLAG} from './RepTipView'
import NavigationBar from '../../component/NavigationBar'
import SortTipView,{SORT_MODIFY_FLAG} from './SortTipView'

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
              component:RepTipView,
              params:{
                modifyFlag:MODIFY_FLAG.FLAG_HOT
              }
            });
          }}
        > 自定义热门标签 </Text>
        <Text
          onPress={()=>{
            this.props.navigator.push({
              component:SortTipView,
              params:{
                modifyFlag:SORT_MODIFY_FLAG.FLAG_HOT
              }
            });
          }}
        > 热门标签排序 </Text>
        <Text
          onPress={()=>{
            this.props.navigator.push({
              component:RepTipView,
              params:{
                isRemove:true,
                modifyFlag:MODIFY_FLAG.FLAG_HOT
              }
            });
          }}
        > 删除热门标签 </Text>
        <Text
          onPress={()=>{
            this.props.navigator.push({
              component:RepTipView,
              params:{
                modifyFlag:MODIFY_FLAG.FLAG_TREND
              }
            });
          }}
        > 自定义趋势标签 </Text>
        <Text
          onPress={()=>{
            this.props.navigator.push({
              component:SortTipView,
              params:{
                modifyFlag:SORT_MODIFY_FLAG.FLAG_TREND
              }
            });
          }}
        > 趋势语言排序 </Text>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container:{
     flex:1
  }
})
