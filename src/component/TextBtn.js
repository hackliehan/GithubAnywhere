/**
 * @desc 文字类型按钮组件
 * @author
 */

import React, {Component,PropTypes} from 'react'
import {Text, StyleSheet, View ,ViewPropTypes,TouchableOpacity} from 'react-native'

export default class TextBtn extends Component {
    static propTypes = {
        title:PropTypes.string.isRequired,
        titleStyle:ViewPropTypes.style,
        onPress:PropTypes.func
    }
    static defaultProps = {
        onPress:void(0)
    }
    render() {
        return (
            <View>
                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress = {this.props.onPress}
                >
                    <Text 
                        allisizeMode={'tail'} 
                        numberOfLines={1} 
                        style={styles.title} 
                    >{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize:16,
        color:'white'
    }
})
