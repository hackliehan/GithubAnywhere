/**
 * @desc 项目统一入口
 * @author binhg
 */

import React, { Component } from 'react'
import {Navigator} from 'react-native-deprecated-custom-components'
import Home from './container/Home'

export default function entry(){

    class Root extends Component {

        //初始化导航路由
        renderScene(route,navigator){
            const Component = route.component;
            return <Component 
                navigator = {navigator}
                {...route.params}
            />
        }

        render(){
            return <Navigator
                initialRoute = {{
                    component:Home
                }}
                renderScene = {(route,navigator)=>this.renderScene(route,navigator)}
            />
        }
    }

    return <Root/>

}