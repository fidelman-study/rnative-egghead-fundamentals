/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} from 'react-native';

import Main from './Components/Main';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  }
});

export default class eggheadfundamentals extends Component {
  render() {
    return (
      <NavigatorIOS style={styles.container} initialRoute={{
        title: 'Github Notetaker',
        component: Main
      }}/>
    );
  }
}

AppRegistry.registerComponent('eggheadfundamentals', () => eggheadfundamentals);
