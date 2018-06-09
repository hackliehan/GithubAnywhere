/**
 * @desc 标签排序
 * @author binhg
 */

import React, { Component } from 'react'
import { StyleSheet , View , Alert , DeviceEventEmitter} from 'react-native'
import NavigationBar from '../../component/NavigationBar'
import ImageBtn from '../../component/ImageBtn'
import TextBtn from '../../component/TextBtn'
import RepTipDao,{SELECTED_FLAG} from '../../dao/RepTipDao'
import ArrayUtils from '../../util/ArrayUtils'
import SortableListView from 'react-native-sortable-listview'
import SortTipCell from './SortTipCell'
import { ACTION_TYPE , TAB_FLAG } from '../Home'

/**
 * 操作排序类型的标签
 */
export const SORT_MODIFY_FLAG = {
  FLAG_HOT:'FLAG_HOT',
  FLAG_TREND:'FLAG_TREND'
}

export default class SortTipView extends Component {
  constructor(props) {
    super(props)
    this.modifyHot = this.props.modifyFlag === SORT_MODIFY_FLAG.FLAG_HOT;
    this.rtDao = new RepTipDao(this.modifyHot?SELECTED_FLAG.LANG_HOT:SELECTED_FLAG.LANG_TREND);
    this.tipData = [];//所有的标签条目
    this.backupActiveTips = [];//可排序标签备份
    this.sortResultTips = [];//排序最终合并结果
    this.state = {
      checkedTipData:[]//用以记录改变的已订阅标签
    }
  }

  componentDidMount(){
    this.loadTipData();
  }

  onClickTip(item){
    item.checked = !item.checked;
    ArrayUtils.updateArray(this.changedTipData,item);
  }

  renderNavBar(){
    return <NavigationBar 
      title = {`排序${this.modifyHot?'热门标签':'趋势语言'}`}
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

  onGoBack(){
    if(!ArrayUtils.isEqual(this.backupActiveTips,this.state.checkedTipData)){
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
    if(ArrayUtils.isEqual(this.backupActiveTips,this.state.checkedTipData)){
      this.props.navigator.pop();
      return;
    }
    this.getFinalTipData();
    this.rtDao.saveTipData(this.sortResultTips).then(res=>{
      DeviceEventEmitter.emit('home_action',ACTION_TYPE.REFRESH,{
        selectedTab:TAB_FLAG.CUST
      });
    }).catch(error=>{
      console.log(error);
    });
  }

  /**
   * 以 this.backupActiveTips作为桥梁,更新全标签队列
   */
  getFinalTipData(){
      this.sortResultTips = ArrayUtils.clone(this.tipData);
      for (let index = 0; index < this.backupActiveTips.length; index++) {
          let item = this.backupActiveTips[index];
          let oldIndex = this.tipData.indexOf(item); 
          this.sortResultTips.splice(oldIndex,1,this.state.checkedTipData[index]);
      }
  }

  initTipArrays(data){
      this.tipData = ArrayUtils.clone(data);
      this.backupActiveTips = data.filter(item=>item.checked);
      this.setState({
          checkedTipData:ArrayUtils.clone(this.backupActiveTips)
      });
  }

  loadTipData(){
    this.rtDao.fetchTipData().then(data=>{
      this.initTipArrays(data);
    }).catch(error=>{
        console.log(error);
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <SortableListView
            
            data = {this.state.checkedTipData}
            order = {Object.keys(this.state.checkedTipData)}
            renderRow = {row=><SortTipCell item={row} {...this.props} />}
            onRowMoved = {e=>{
                this.state.checkedTipData.splice(e.to,0,this.state.checkedTipData.splice(e.from,1)[0]);
                this.forceUpdate();
            }}
        >
        </SortableListView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  sortableList:{
    paddingHorizontal:6
  }
})
