import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';

import Profile from './Profile';
import Repositories from './Repositories';
import Notes from './Notes';
import api from '../Utils/api';

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
   fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class Dashboard extends Component {
  constructor() {
    super();

    this.goToProfile = this.goToProfile.bind(this);
    this.goToRepos = this.goToRepos.bind(this);
    this.goToNotes = this.goToNotes.bind(this);
  }

  goToProfile() {
    this.props.navigator.push({
      title: "Profile Page",
      component: Profile,
      passProps: { userInfo: this.props.userInfo }
    });
  }

  goToRepos() {
    api.getRepos(this.props.userInfo.login)
      .then((res) => {
        if (res.message === 'Not Found') {
          console.error('Not found');
        } else {
          this.props.navigator.push({
            title: "Repositories Page",
            component: Repositories,
            passProps: {
              userInfo: this.props.userInfo,
              repos: res
            }
          });
        }
      })
  }

  goToNotes() {
    api.getNotes(this.props.userInfo.login)
      .then((res) => {
        res = res || {};
        console.log(res);

        this.props.navigator.push({
          title: "Notes Page",
          component: Notes,
          passProps: {
            userInfo: this.props.userInfo,
            notes: res
          }
        });
      })
  }

  static makeBackground(btn) {
    const obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    };

    if(btn === 0) {
      obj.backgroundColor = '#48BBEC'
    } else if (btn === 1) {
      obj.backgroundColor = '#E77AAE'
    } else {
      obj.backgroundColor = '#758BF4'
    }

    return obj;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.props.userInfo.avatar_url }} style={styles.image}/>
        <TouchableHighlight
          style={Dashboard.makeBackground(0)}
          onPress={this.goToProfile}
          underlayColor="#88D4F5"
        >
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={Dashboard.makeBackground(1)}
          onPress={this.goToRepos}
          underlayColor="#88D4F5"
        >
          <Text style={styles.buttonText}>View Repos</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={Dashboard.makeBackground(2)}
          onPress={this.goToNotes}
          underlayColor="#88D4F5"
        >
          <Text style={styles.buttonText}>View Notes</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Dashboard;