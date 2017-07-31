import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center'
  }
});

class Badge extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.props.userInfo.avatar_url }}/>
        <Text style={styles.name}>{this.props.userInfo.name}</Text>
        <Text style={styles.handle}>{this.props.userInfo.login}</Text>
      </View>
    );
  }
}

Badge.propTypes = {
  userInfo: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired
  }).isRequired
};

export default Badge;