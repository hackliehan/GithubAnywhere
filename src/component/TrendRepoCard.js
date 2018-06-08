/**
 * @desc 趋势单项详情
 * @author binhg
 */

import React, { Component } from 'react'
import { Text, StyleSheet, View , Image ,TouchableOpacity} from 'react-native'
import HTMLView from 'react-native-htmlview'

export default class TrendRepoCard extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    
  render() {
    let item = this.props.item;
    let desc = `<p>${item.description}</p>`;
    return (
        <TouchableOpacity
            activeOpacity = {0.6}
            onPress = {this.props.onPress}
        >
            <View style={styles.container}>
                    <Text style={styles.title}>{item.fullName}</Text>
                    <HTMLView 
                        value={desc}
                        stylesheet={{
                            p:styles.desc,
                            a:styles.desc
                        }}
                    />
                    <View style={styles.extraWrap}>
                        <View style={styles.extra}>
                            <Text>贡献者:</Text>
                            {item.contributors.map((avatar_url,index)=><Image
                                key={index} 
                                style={styles.image} 
                                source={{uri:avatar_url}} 
                            />)}
                        </View>
                        <View style={styles.extra}>
                            <Text>星标:</Text>
                            <Text>{item.forkCount}</Text>
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
        color:'#212121',
        marginBottom:8
    },
    desc:{
        fontSize:14,
        color:'#757575'
    },
    extraWrap:{
        marginTop:8,
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