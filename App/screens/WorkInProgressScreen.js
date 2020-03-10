import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dimensions, TouchableOpacity, View, StyleSheet, Image, StatusBar } from 'react-native';
import * as Actions from '../actions';

const image = require('../../assets/coming_soon.png');

class WorkInProgressScreen extends React.Component {
  render() {
    return (
      <View style = { s.background }>
        <TouchableOpacity
          onPress = { () => this.props.toStart() }
        >
          <View style = { s.imagebox }>
            <Image resizeMode = 'contain' style = { s.image } source = { image }/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const { height } = Dimensions.get('screen');
const s = StyleSheet.create({
  background: {
    padding: 20 * height / 640,
    paddingTop: (StatusBar.currentHeight || 0),
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },

  imagebox: {
    alignItems: 'center',
    marginBottom: 10 * height / 640
  },

  image: {
    width: 320 * height / 640,
    height: 320 * height / 640
  }
});

export default connect(
  null,
  (dispatch) => bindActionCreators(Actions, dispatch)
)(WorkInProgressScreen);
