/**
 * @desc Repository详情浏览页面
 * @author binhg
 */

import React, { Component } from 'react'
import {
    StyleSheet, 
    View,
    WebView
} from 'react-native'
import NavigationBar from '../../component/NavigationBar'
import ImageBtn from '../../component/ImageBtn'
import FavorateCommon from './FavorateCommon'
import {FavoImage,UnFavoImage} from './commonImage'

export default class componentName extends Component {

    constructor(props) {
        super(props)
        this.favoCommon = new FavorateCommon(this.props.favoType);
        this.state = {
            canGoBack:false,
            isFavorate:this.props.item.isFavorate?true:false,
            isFavoReady:false
        }
    }

    componentDidMount(){
        this.loadFavoData();
    }

    loadFavoData(){
        this.favoCommon.loadFavorateData().then(()=>{
            this.setState({
                isFavoReady:true
            });
        });
    }
    
    goBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        }else{
            this.props.navigator.pop();
        }
    }
 
    onNavigationStateChange(e){
        this.setState({
            canGoBack:e.canGoBack
        });
    }

    toggleFavo(){
        let isFavorate = !this.state.isFavorate
        if(isFavorate){
            this.favoCommon.saveFavorateItem(this.props.item);
        }else{
            this.favoCommon.delFavorateItem(this.props.item);
        }
        this.setState({
            isFavorate
        });
    }

    render() {
        return (
            <View style={styles.container}>
                
                <NavigationBar
                    title={this.props.item.full_name}
                    leftBtn = {
                        <ImageBtn 
                            source={require('../../../res/images/ic_arrow_back_white_36pt.png')}
                            onPress = {()=>this.goBack()}
                        />
                    }
                    rightBtn = {
                        this.state.isFavoReady?<ImageBtn
                            style = {{tintColor:'#9400D3'}}
                            onPress={()=>this.toggleFavo(this.props.item)}
                            source={this.state.isFavorate?FavoImage:UnFavoImage}
                        />:null
                    }
                />

                <WebView 
                    source = {{
                        uri:this.props.item.html_url
                    }}
                    startInLoadingState = {true}
                    onNavigationStateChange = {e=>this.onNavigationStateChange(e)}
                    ref={webView=>this.webView = webView}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
