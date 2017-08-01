import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import api from '../Utils/api';
import Separator from './Helpers/Separator';
import Badge from './Badge';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

class Notes extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.notes),
      note: '',
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.footer = this.footer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
        note: e.nativeEvent.text
    });
  }

  handleSubmit() {
    const note = this.state.note;
    this.setState({
        note: ''
    });

    api.addNote(this.props.userInfo.login, note)
      .then(() => {
        api.getNotes(this.props.userInfo.login)
          .then((data) => {
            this.setState({
                dataSource: this.ds.cloneWithRows(data)
            });
          });
      })
      .catch((error) => {
        console.error('Request failed', error);
        this.setState({
            error
        });
      })
  }

  footer() {
    return (
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          placeholder="New Note"
          onChange={(e) => this.handleChange(e)}
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor="#88D4F5"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }

  static renderRow(rowData) {
    return (
      <View>
        <View style={styles.container}>
          <Text>{rowData}</Text>
        </View>
        <Separator/>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={Notes.renderRow}
          renderHeader={() => <Badge userInfo={this.props.userInfo}/>}
          enableEmptySections
        />
        {this.footer()}
      </View>
    );
  }
}

export default Notes;