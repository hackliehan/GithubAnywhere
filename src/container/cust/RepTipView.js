/**
 * @desc 自定义语言标签页
 * @author binhg
 */

import React, { Component } from 'react'
import { StyleSheet, View , ScrollView , Alert, DeviceEventEmitter} from 'react-native'
import NavigationBar from '../../component/NavigationBar'
import ImageBtn from '../../component/ImageBtn'
import TextBtn from '../../component/TextBtn'
import RepTipDao,{SELECTED_FLAG} from '../../dao/RepTipDao'
import CheckBox from 'react-native-check-box'
import ArrayUtils from '../../util/ArrayUtils'
import { ACTION_TYPE , TAB_FLAG } from '../Home'

/**
 * 操作标签
 * @param {tring} FLAG_HOT 操作热门条目
 * @param {tring} FLAG_TREND 操作最新趋势条目
 */
export const MODIFY_FLAG = {
  FLAG_HOT:'FLAG_HOT',
  FLAG_TREND:'FLAG_TREND'
}

export default class RepTipView extends Component {
  constructor(props) {
    super(props)
    this.modifyHot = this.props.modifyFlag === MODIFY_FLAG.FLAG_HOT;
    this.rtDao = new RepTipDao(this.modifyHot?SELECTED_FLAG.LANG_HOT:SELECTED_FLAG.LANG_TREND);
    //被改变的标签数据
    this.changedTipData = [];
    this.state = {
      tipData:[]
    }
  }

  componentDidMount(){
    this.loadTipData();
  }

  onClickTip(item){
    item.checked = this.props.isRemove?item.checked:!item.checked;
    ArrayUtils.updateArray(this.changedTipData,item);
  }

  //渲染单个复选框组件
  renderCheckBox(data){
    let {name,checked} = data;
    return <CheckBox 
      style={styles.checkbox}
      leftText = {name}
      onClick={()=>{this.onClickTip(data)}}
      isChecked={this.props.isRemove?false:checked}
      checkBoxColor={'#2196F3'}
    />
  }

  renderNavBar(){
    return <NavigationBar 
      title = {`自定义${this.modifyHot?'标签':'语言'}`}
      leftBtn = {
        <ImageBtn 
          source={require('../../../res/images/ic_arrow_back_white_36pt.png')}
          onPress={()=>{this.onGoBack()}}
        />
      }

      rightBtn = {
        <TextBtn
          title={this.props.isRemove?'删除':'保存'}
          onPress={()=>{this.onSaveData()}}
        />
      }
    />
  }

  renderTipCell(key,tip,nextTip,isSingle){
    return <View key={key} style={styles.tipContainer}>
      <View style={styles.tipWrap}>
        {this.renderCheckBox(tip)}
        {!isSingle?this.renderCheckBox(nextTip):null}
      </View>
      <View style={styles.tipLine}></View>
    </View>
  }

  renderTipView(){
    if(!this.state.tipData||this.state.tipData.length<1) return null;
    let TipViewRows = [],
        len = this.state.tipData.length;
    for(let i=0;i<len-1;i+=2){
      TipViewRows.push(this.renderTipCell(i,this.state.tipData[i],this.state.tipData[i+1]));
    }
    //渲染单独存在的一行
    TipViewRows.push(len%2 !== 0?this.renderTipCell(len-1,this.state.tipData[len-1],null,true):null);
    return TipViewRows;
  }

  onGoBack(){
    if(this.changedTipData.length>0){
      const {isRemove} = this.props;
      Alert.alert(
        '提示',
        `退出前是否${isRemove?'确认删除':'保存更改'}?`,
        [{
          text:'取消',
          onPress:()=>{
             this.props.navigator.pop();
          }
        },{
          text:'确定',
          onPress:()=>{
            this.onSaveData();
          }
        }]
      );
    }else{
      this.props.navigator.pop();
    }
  }

  onSaveData(){
    if(this.changedTipData.length<1){
      this.props.navigator.pop();
      return;
    }
    let resultTipData = ArrayUtils.clone(this.state.tipData);
    if(this.props.isRemove)
    resultTipData = this.state.tipData.filter(item=>this.changedTipData.indexOf(item)<0);
    //存储数据并且通报状态
    this.rtDao.saveTipData(resultTipData).then(res=>{
      // this.props.navigator.pop();
      DeviceEventEmitter.emit('home_action',ACTION_TYPE.REFRESH,{
        selectedTab:TAB_FLAG.CUST
      });
    }).catch(error=>{
      console.log(error);
    });
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
        {this.renderNavBar()}
        <ScrollView>
          {this.renderTipView()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'whitesmoke'
  },
  checkbox:{
    flex:1,
    padding:10
  },
  tipContainer:{
    marginVertical:3
  },
  tipWrap:{
    flexDirection:'row'
  },
  tipLine:{
    height:1,
    backgroundColor:'#757575',
  }
})
