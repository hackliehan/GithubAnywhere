/**
 * @desc 显示项目列表中单个项目详情的卡片
 * @author binhg
 */

import React, { Component } from 'react'
import { Text, StyleSheet, View , Image ,TouchableOpacity} from 'react-native'

export default class componentName extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    
  render() {
    let item = this.props.item;
    return (
        <TouchableOpacity
            activeOpacity = {0.6}
            onPress = {this.props.onPress}
        >
            <View style={styles.container}>
                    <Text style={styles.title}>{item.full_name}</Text>
                    <Text style={styles.desc}>{item.description}</Text>
                    <View style={styles.extraWrap}>
                        <View style={styles.extra}>
                            <Text>作者:</Text>
                            <Image 
                                style={styles.image} 
                                source={{uri:item.owner.avatar_url}} 
                            />
                        </View>
                        <View style={styles.extra}>
                            <Text>星标:</Text>
                            <Text>{item.stargazers_count}</Text>
                        </View>
                        <Image 
                            style={styles.image} 
                            source={require('../../res/images/ic_star.png')} 
                        />
                    </View>
            </View>
        </TouchableOpacity>    
    )
  }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        borderWidth:0.5,
        borderColor:'#DDD',
        borderRadius:2,
        marginVertical:3,
        marginHorizontal:5,
        padding:8,
        shadowRadius:1,
        shadowOffset:{
            width:0.5,
            height:0.5
        },
        shadowColor:'#757575',
        shadowOpacity:0.9
    },
    title:{
        fontSize:16,
        color:'#212121'
    },
    desc:{
        fontSize:14,
        color:'#757575',
        marginVertical:5
    },
    extraWrap:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    image:{
        width:22,
        height:22
    },
    extra:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    }
})
