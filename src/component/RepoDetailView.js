/**
 * @desc Repository详情浏览页面
 * @author binhg
 */

import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    View,
    WebView
} from 'react-native'
import NavigationBar from './NavigationBar'
import ImageBtn from './ImageBtn'

export default class componentName extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
        canGoBack:false
      }
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

    render() {
        return (
        <View style={styles.container}>
            
            <NavigationBar
                title={this.props.item.full_name}
                leftBtn = {
                    <ImageBtn 
                        source={require('../../res/images/ic_arrow_back_white_36pt.png')}
                        onPress = {()=>this.goBack()}
                    />
                }
                rightBtn = {
                    <ImageBtn
                        source={require('../../res/images/ic_star.png')}
                    />
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
