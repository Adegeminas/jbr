import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Autocomplete from './Autocomplete.js';
// import Autocomplete from 'react-native-autocomplete-input';
import { s as new_s } from '../libs/styles.js';

const remove = require('../../assets/ProfileScreen/remove.png');

export default class GeneralSelector extends React.Component {
  constructor(props) {
    super(props);

    this.input = null;

    this.state = {
      query: '',
      hide: true,
      selected: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.flag) return;

    if (prevProps.flag !== this.props.flag) {
      this.setState({
        query: ''
      });
    }
  }

  onSelected(item) {
    this.setState({
      query: item,
      hide: true,
      selected: item
    });
    this.input.blur();
    this.props.onSelect(item);
  }

  onChangeText(text) {
    this.setState({ query: text });
  }

  onFocus() {
    this.setState({ hide: false })
  }

  onBlur() {
    this.setState({
      hide: true
    });

    this.forceUpdate();
  }

  render() {
    return (
      <View
        style = {{
          flex: 1,
          backgroundColor: 'white',
          zIndex: 1,
          width: '100%',
          top: 0,
          marginRight: 5,
          marginTop: 10,
        }}
      >
        <Text style = {{ color: 'gray' }}> { this.props.title } </Text>
        <Autocomplete
          key = { this.props.flag2 }
          ref = { input =>  this.input = input }
          data = {
            this.props.data
              .filter(item => item.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1)
              .filter((item, index) => index < 5)
          }
          hideResults = { this.state.hide }
          onFocus = {() => this.onFocus()}
          onBlur = {() => this.onBlur()}
          keyExtractor = {(item, index) => index.toString()}
          inputContainerStyle = {{
            borderBottomWidth: 0.7,
            borderColor: 'gray'
          }}
          containerStyle = {{
            flex: 0,
            width: '100%'
          }}
          listContainerStyle = {{
            maxHeight: 100
          }}
          defaultValue = { this.props.default }
          onChangeText = { text => this.onChangeText(text) }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress = {() => this.onSelected(item) }
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
