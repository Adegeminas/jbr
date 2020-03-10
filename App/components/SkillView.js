import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { s as new_s } from '../libs/styles.js';

const remove = require('../../assets/ProfileScreen/remove.png');

class SkillView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: []
    };
  }
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const skill = this.props.name;

    return (
      <View style = {{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        margin: 3,
        minWidth: 80,
        overflow: 'scroll'
      }}>
        <Text> { skill } </Text>
        <TouchableOpacity
          onPress = { () => this.props.onDelete(skill) }
        >
          <Image style = { new_s.image(25, 25) } source = { remove }/>
        </TouchableOpacity>
      </View>
    );
  }
}


export default SkillView;
