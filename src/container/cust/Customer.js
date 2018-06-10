/**
 * @desc 用户主页
 * @author binhg
 */

import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import RepTipView,{MODIFY_FLAG} from './RepTipView'
import NavigationBar from '../../component/NavigationBar'
import SortTipView,{SORT_MODIFY_FLAG} from './SortTipView'
import OperationCard from './common/OperationCard'
import { ICON_MODIFY , ICON_SORT ,ICON_DEL } from '../common/commonImage'
import Seperator from '../../component/Seperator'


/**
 * 项目卡片专用样式
 */
const AppCardStyle = {
  appCardContainer:{
    paddingVertical:17
  },
  appCardIcon:{
    width:35,
    height:35
  },
  appCardTitle:{
    fontSize:18
  }
}

/**
 * 配置菜单条件
 */
const menuData = {
  hot:{
    title:'热度管理',
    children:[{
      icon:ICON_MODIFY,
      title:'订阅标签',
      jumpTo:RepTipView,
      params:{
        modifyFlag:MODIFY_FLAG.FLAG_HOT
      }
    },{
      icon:ICON_DEL,
      title:'标签删除',
      jumpTo:RepTipView,
      params:{
        isRemove:true,
        modifyFlag:MODIFY_FLAG.FLAG_HOT
      }
    },{
      icon:ICON_SORT,
      title:'标签排序',
      jumpTo:SortTipView,
      params:{
        modifyFlag:SORT_MODIFY_FLAG.FLAG_HOT
      }
    }]
  },
  trending:{
    title:'趋势管理',
    children:[{
      icon:ICON_MODIFY,
      title:'订阅语言',
      jumpTo:RepTipView,
      params:{
        modifyFlag:MODIFY_FLAG.FLAG_TREND
      }
    },{
      icon:ICON_SORT,
      title:'语言排序',
      jumpTo:SortTipView,
      params:{
        modifyFlag:SORT_MODIFY_FLAG.FLAG_TREND
      }
    }]
  }
}

export default class Customer extends Component {

  constructor(props) {
    super(props)
    this.iconColor = '#99CCFF'
    this.state = {
       
    }
  }
  
  renderTitleLabel(title){
    return (
      <View style={styles.titleLabelWrapper}>
        <Text 
        style={styles.titleLabel}
        >
          {title}
        </Text>
      </View>
    )
  }

  onSelectCard(item){
    let {jumpTo:component,params } = item;
    this.props.navigator.push({
      component,
      params
    });
  }

  renderMenu(){
    let menuKeys = Object.keys(menuData);
    return menuKeys.map((item,index)=>(
      <View key={index}>
        <Seperator />
        {this.renderTitleLabel(menuData[item].title)}
        {menuData[item].children.map((child,index)=>(
          <View key={index}>
            <OperationCard 
              title={child.title}
              icon = {child.icon}
              iconStyle = {{
                tintColor:this.iconColor
              }}
              arrowStyle = {{
                tintColor:this.iconColor
              }}
              onPress={()=>this.onSelectCard(child)}
            />
            <Seperator/>
          </View>
        ))}
      </View>
    ))
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar 
          title="用户主页"
        />

        <OperationCard 
          title = 'GithubAnyWhere'
          icon = {require('../../../res/images/github.png')}
          titleStyle = {{
            ...AppCardStyle.appCardTitle
          }}
          contentStyle = {{
            ...AppCardStyle.appCardContainer
          }}
          iconStyle = {{
            tintColor:this.iconColor,
            ...AppCardStyle.appCardIcon
          }}
          arrowStyle = {{
            tintColor:this.iconColor
          }}
          arrowVisible = {false}
        />
        {this.renderMenu()}
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'whitesmoke'
  },
  titleLabelWrapper:{
    height:40,
    paddingHorizontal:8,
    justifyContent:'center',
    backgroundColor:'whitesmoke'
  },
  titleLabel:{
    fontSize:16,
    fontWeight:'400',
    color:'#757575'
  }
})
