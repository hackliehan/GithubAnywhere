/**
 * 操作选项卡
 * @author binhg
 */

import React, { Component ,PropTypes} from 'react'
import { Text, StyleSheet, View , Image , TouchableOpacity ,ViewPropTypes} from 'react-native'

export default class OperationCard extends Component {
    static propTypes = {
        icon:PropTypes.any,
        title:PropTypes.string,
        titleStyle:Text.propTypes.style,
        contentStyle:ViewPropTypes.style,
        iconStyle:Image.propTypes.style,
        arrowStyle:Image.propTypes.style,
        arrowVisible:PropTypes.bool,
        onPress:PropTypes.func
    }

    static defaultProps = {
        arrowVisible:true,
        onPress:void(0)
    }

    render() {
        return (
        <TouchableOpacity
            style={[styles.container,this.props.contentStyle]}
            onPress={this.props.onPress}
        >
                <View style={styles.leftWrapper}>
                    <Image
                        style={[styles.icon,this.props.iconStyle]}
                        source= {this.props.icon}
                    ></Image>
                    <Text style={[styles.title,this.props.titleStyle]}>{this.props.title}</Text>    
                </View>
                <Image
                    style={[styles.arrow,this.props.arrowStyle,(!this.props.arrowVisible?styles.hide:null)]}
                    source= {require('../../../../res/images/ic_tiaozhuan.png')}
                >
                </Image>
        </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:14,
        paddingVertical:14,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white'
    },
    leftWrapper:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    icon:{
        width:22,
        height:22,
        marginRight:10
    },
    arrow:{
        width:22,
        height:22
    },
    title:{
        fontSize:16,
        fontWeight:'400',
        color:'#757575'
    },
    hide:{
        height:0,
        overflow:'hidden'
    }

})
