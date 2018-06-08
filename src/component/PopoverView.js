/**
 * @desc pop弹窗封装组件
 * @author binhg
 */

import React, { Component,PropTypes } from 'react'
import { Text, StyleSheet, View ,ViewPropTypes ,TouchableOpacity} from 'react-native'
import Popover from './base/Popover'

export default class PopoverView extends Component {

    static propTypes = {
        fromRectComp:PropTypes.object,//定位依据的组件
        contentStyle: ViewPropTypes.style,
        placement:PropTypes.string,
        data:PropTypes.array.isRequired
    }

    static defaultProps = {
        placement:'bottom'
    }

    constructor(props) {
      super(props)
    
      this.state = {
         fromRect:{},
         isVisible:false
      }
    }
    
    closePopover(){
        this.setState({
            isVisible:false
        });
    }

    showPopover(){
        this.props.fromRectComp.measure((ox,oy,width,height,x,y)=>{
            this.setState({
                fromRect:{
                    x,
                    y,
                    width,
                    height
                },
                isVisible:true
            });
        })
    }


    render() {
        return (
            <Popover 
                fromRect={this.state.fromRect}
                isVisible = {this.state.isVisible}
                placement = {this.props.placement}
                contentStyle = {[styles.contentStyle,this.props.contentStyle]}
                onClose = {()=>this.closePopover()}
            >
                <View style={styles.wrapper}>
                    {this.props.data.map((item,index)=>
                        <TouchableOpacity 
                            key={index}
                            style={styles.labelTouch}
                        >
                            <Text style={styles.labelText}>{item.key}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </Popover>
        )
    }
}

const styles = StyleSheet.create({
    contentStyle:{
        opacity:0.8,
        backgroundColor:'#99CCFF'
    },
    wrapper:{
        paddingVertical:5,
        paddingHorizontal:5,
        alignItems:'center'
    },
    labelTouch:{
        padding:3,
        marginVertical:3
    },
    labelText:{
        fontSize:16,
        fontWeight:'400',
        color:'#FFF'
    }
})
