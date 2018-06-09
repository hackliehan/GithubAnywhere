/**
 *@desc 最热模块主页
 *@author binhg
 */
import React, { Component } from 'react'
import { StyleSheet, View , DeviceEventEmitter} from 'react-native'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import NavigationBar from '../../component/NavigationBar'
import HotRepListView from './HotRepListView'
import RepTipDao,{SELECTED_FLAG} from '../../dao/RepTipDao'

export default class HotRespoitory extends Component {
  
  constructor(props) {
    super(props)
    this.rtDao = new RepTipDao(SELECTED_FLAG.LANG_HOT);
    this.state = {
       tipData:[]
    }
  }
  
  componentDidMount(){
    this.loadTipData();
    this.listener = DeviceEventEmitter.addListener('hotTipIsChanged',()=>{
    });
  }

  componentWillUnMount(){
    if(this.listener){
      this.listener.remove();
    }
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
                return item.checked?<HotRepListView 
                  key={index}
                  tabLabel={item.name} 
                  tip={item}
                  {...this.props}
                >{item.name}</HotRepListView>:null
              })}
              
            </ScrollableTabView>
  }

  loadTipData(){
    this.rtDao.fetchTipData().then(data=>{
      this.setState({tipData:data});
    }).catch(error=>{
      console.log(error);
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <NavigationBar 
          title="最热项目"
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
