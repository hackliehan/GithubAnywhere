/**
 * @desc 图标,图片型按钮自定义库 需要自定义图库
 * @author binhuguang
 */

import React, {Component, PropTypes} from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image
    } from 'react-native'


export default class ImageBtn extends Component {
    static propTypes = {
        source:PropTypes.any.isRequired,
        wrapperStyle:View.propTypes.style,
        callBack:PropTypes.func,
        disable: PropTypes.bool,
        img:PropTypes.element
    }

    static defaultProps = {
        type:'arrow',
        disable:false,
        callBack:void(0)
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
                        this.props.callBack
                    }
                    disable = {this.props.disable}
                >
                {this.props.img?this.props.img:
                <Image 
                    style={styles.btnIcon} 
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