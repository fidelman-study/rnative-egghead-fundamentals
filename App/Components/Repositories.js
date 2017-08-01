import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import Badge from "./Badge";
import Separator from './Helpers/Separator';
import Web_View from './Helpers/Web_View';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});

class Repositories extends Component {
  constructor() {
    super();
    this.openPage = this.openPage.bind(this);
  }

  openPage(url) {
    this.props.navigator.push({
      component: Web_View,
      title: 'Web View',
      passProps: { url }
    })
  }

  render() {
    const { userInfo, repos } = this.props;

    const list = repos.map((repo, index) => {
      const desc = repo.description ? <Text style={styles.description}>{repo.description}</Text> : <View/>;
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={() => this.openPage(repo.html_url)}
              underlayColor='transparent'>
              <Text style={styles.name}>{repo.name}</Text>
            </TouchableHighlight>
            <Text style={styles.stars}>Stars: {repo.stars || 0}</Text>
            {desc}
          </View>
          <Separator />
        </View>
      );
    });

    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={userInfo}/>
        {list}
      </ScrollView>
    );
  }
}

export default Repositories;