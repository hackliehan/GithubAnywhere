/**
 * @desc 图标,图片型按钮自定义库 需要自定义图库
 * @author binhg
 */

import React, {Component, PropTypes} from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    ViewPropTypes,
    } from 'react-native'


export default class ImageBtn extends Component {
    static propTypes = {
        source:PropTypes.any.isRequired,
        wrapperStyle:ViewPropTypes.style,
        style:Image.propTypes.style,
        onPress:PropTypes.func,
        disable: PropTypes.bool,
        img:PropTypes.element
    }

    static defaultProps = {
        type:'arrow',
        disable:false,
        onPress:void(0)
    }

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <View style={[styles.container,this.props.wrapperStyle]}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress = {
                        this.props.onPress
                    }
                    disable = {this.props.disable}
                >
                {this.props.img?this.props.img:
                <Image 
                    style={[styles.btnIcon,this.props.style]} 
                    source={this.props.source}
                />
                }    
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center'
    },
    btnIcon:{
        width:22,
        height:22
    }
});