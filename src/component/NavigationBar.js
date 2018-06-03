/**
 * @desc App 顶部导航组件
 * @author binhg
 */

import React,{Component,PropTypes} from 'react'
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    Image,
    Platform,
    ViewPropTypes
} from 'react-native'

/**
 * @desc 组件固定属性
 */
const NAVBAR_HEIGHT_IOS = 44;
const NAVBAR_HEIGHT_ANDROID = 50;
const STATUS_BAR_HEIGHT_IOS = 20;

//状态栏属性定义
const statusBarShape = {
    barStyle:PropTypes.oneOf(['light-content','default']),
    hide:PropTypes.bool,
    backgroundColor:PropTypes.string
}

export default class NavigationBar extends Component {
    static propTypes = {
        title:PropTypes.string,
        titleView:PropTypes.element,
        style:ViewPropTypes.style,//navbar组件整体样式
        titleLayoutStyle:ViewPropTypes.style,//标题主题布局
        hide:PropTypes.bool,
        leftBtn:PropTypes.element,//左边按钮
        rightBtn:PropTypes.element, //右边按钮

        statusBar:PropTypes.shape(statusBarShape)
    }

    static defaultProps = {
        statusBar:{
            barStyle:'light-content',
            hide:false
        },
        hide:false
    }


    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }

    getNavbarBtn(btnView){
        return (<View style={styles.NavBtn}>
            {btnView?btnView:null}
        </View>);
    }

    render(){
        //标题
        const titleElement =  this.props.titleView?this.props.titleView:
            <Text ellisizeMode="tail" numberOfLines={1} style={styles.navTitle}>{this.props.title}</Text>
        //整体 Nav
        const content = (
            <View style={styles.navContent}>
                {this.getNavbarBtn(this.props.leftBtn)}
                <View style={[styles.navTitleContainer,this.props.titleLayoutStyle]}>
                    {titleElement}
                </View>
                {this.getNavbarBtn(this.props.rightBtn)}
            </View>
        );
        //系统状态栏
        const stausBarComp = this.props.statusBar.hide?null:
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar}/>
            </View>;
        return (
            <View style={[styles.container,this.props.style,(this.props.hide?styles.hide:{})]}>
                {stausBarComp}
                {content}
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#99CCFF'
    },
    navContent:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:10,
        height:Platform.OS === 'ios'?NAVBAR_HEIGHT_IOS:NAVBAR_HEIGHT_ANDROID
    },
    navTitleContainer:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:0,
        bottom:0,
        left:40,
        right:40
    },
    navTitle:{
        fontSize:20,
        color:'#FFF'
    },
    NavBtn:{
        alignItems:'center'
    },
    statusBar:{
        height:Platform.OS === 'ios'?STATUS_BAR_HEIGHT_IOS:0
    },
    hide:{
        height:0,
        overflow:'hidden'
    }

    
});