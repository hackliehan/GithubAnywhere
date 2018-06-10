/**
 * @desc 热度搜索页面
 * @author binhg
 */
import React, { Component } from 'react'
import { Text,TextInput, StyleSheet, View } from 'react-native'
import NavigationBar from '../../component/NavigationBar'
import TextBtn from '../../component/TextBtn'
import ImageBtn from '../../component/ImageBtn'
import HotRepListView from './HotRepListView'

const defaultQuery = 'stars:>1';

export default class SearchView extends Component {

    constructor(props) {
      super(props)
      this.query = '';
      this.state = {
        currentQuery:defaultQuery
      }
    }
    
    queryData(){
        this.setState({
            currentQuery:this.query
        });
        this.refs.query.blur();
    }

    renderTitleView(){
        return (
            <TextInput 
                style={styles.query}
                onChangeText = {text=>this.query = text}
                autoCapitalize='none'
                placeholder='点击输入要查询的标签'
                ref='query'
            />
        )
    }   
    
    goBack(){
        this.props.navigator.pop();
    }

    render() {
        let { currentQuery } = this.state; 
        return (
            <View style={styles.container}>
                <NavigationBar 
                    titleView={this.renderTitleView()}
                    leftBtn = {
                        <ImageBtn
                            source={require('../../../res/images/ic_arrow_back_white_36pt.png')}
                            onPress = {()=>this.goBack()}
                        />
                    }
                    rightBtn = {
                        <TextBtn 
                            title='搜索'
                            onPress = {()=>this.queryData()}
                        />
                    }
                />
                <HotRepListView
                    tip={{query:currentQuery?currentQuery:defaultQuery}}
                    isSearch = {true}
                    {...this.props}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    query:{
        height:25,
        textAlign:'center',
        fontSize:18,
        borderBottomWidth:2,
        borderColor:'#9400D3',
        opacity:0.8,
        color:'white'
    }
})
