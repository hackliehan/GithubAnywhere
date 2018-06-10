/**
 * @desc 简单分割线
 * @author binhg
 */

import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

export default class Seperator extends Component {
  render() {
    return (
      <View style={styles.seperator}></View>
    )
  }
}

const styles = StyleSheet.create({
    seperator:{
        height:1,
        opacity:0.6,
        backgroundColor:'darkgray'
    }
})
