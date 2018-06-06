/**
 * @desc 排序标签单项容器
 * @author binhg
 */
import React, { Component } from 'react'
import { Text, StyleSheet, View ,TouchableHighlight ,Image } from 'react-native'

export default class SortTipCell extends Component {
  render() {
    return (
        <TouchableHighlight
            {...this.props.sortHandlers}
            underlayColor={'#EEE'}
            activeOpacity={0.8}
            style={styles.container}
        >
            <View style={styles.wrapper}>
                <Image style={styles.image} source={require('../../../res/images/ic_sort.png')} />
                <Text style={styles.title}>{this.props.item.name}</Text>
            </View>
        </TouchableHighlight>    
            
    )
  }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F8F8F8',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10,
        marginTop:8,
        borderWidth:0.5,
        borderColor:'#DDD',
        shadowRadius:2,
        shadowOffset:{
            width:0.5,
            height:0.5
        },
        shadowOpacity:0.8,
        shadowColor:'#757575'
    },
    wrapper:{
        height:40,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    image:{
        width:22,
        height:22,
        marginRight:10
    },
    title:{
        fontSize:16
    }
})
