/**
 * @author binhg
 */
import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Home from './Home'

export default class Welcome extends Component {

  componentDidMount(){
    setTimeout(()=>{
      this.props.navigator.push({
        component:Home
      });
    },2000);
  }

  render() {
    return (
      <View>
        <Text> WelcomPage </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
