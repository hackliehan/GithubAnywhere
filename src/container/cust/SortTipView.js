/**
 * @desc 标签排序
 * @author binhg
 */

import React, { Component } from 'react'
import { Text , StyleSheet , View , Alert} from 'react-native'
import NavigationBar from '../../component/NavigationBar'
import ImageBtn from '../../component/ImageBtn'
import TextBtn from '../../component/TextBtn'
import RepTipDao,{SELECTED_FLAG} from '../../dao/RepTipDao'
import CheckBox from 'react-native-check-box'
import ArrayUtils from '../../util/ArrayUtils'
import SortableListView from 'react-native-sortable-listview'

export default class SortTipView extends Component {
  constructor(props) {
    super(props)
    this.rtDao = new RepTipDao(SELECTED_FLAG.LANG_TIP);
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
    item.checked = !item.checked;
    ArrayUtils.updateArray(this.changedTipData,item);
  }

  //渲染单个复选框组件
  renderCheckBox(data){
    let {name,checked} = data;
    return <CheckBox 
      style={styles.checkbox}
      leftText = {name}
      onClick={()=>{this.onClickTip(data)}}
      isChecked={checked}
      checkBoxColor={'#2196F3'}
    />
  }

  renderNavBar(){
    return <NavigationBar 
      title = "自定义语言标签"
      leftBtn = {
        <ImageBtn 
          source={require('../../../res/images/ic_arrow_back_white_36pt.png')}
          onPress={()=>{this.onGoBack()}}
        />
      }

      rightBtn = {
        <TextBtn
          title="保存"
          onPress={()=>{this.onSaveData()}}
        />
      }
    />
  }



  renderTipView(){
    if(!this.state.tipData||this.state.tipData.length<1) return null;
    let TipViewRows = [],
        len = this.state.tipData.length;
    for(let i=0;i<len;i+=2){
      TipViewRows.push(
        <View key={i} style={styles.tipWrap}>
          {this.renderCheckBox(this.state.tipData[i])}
          {this.renderCheckBox(this.state.tipData[i+1])}
        </View>
      );
    }
    TipViewRows.push(
      <View key={len-1} style={styles.tipWrap}>
          {len%2 !== 0?this.renderCheckBox(this.state.tipData[len-1]):null}
      </View>
    );
    return TipViewRows;
  }

  onGoBack(){
    if(this.changedTipData.length>0){
      Alert.alert(
        '提示',
        '是否保存更改再退出?',
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
    this.rtDao.saveTipData(this.state.tipData);
    this.props.navigator.pop();
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
    flex:1
  },
  checkbox:{
    flex:1,
    padding:10
  },
  tipWrap:{
    flexDirection:'row'
  }
})
