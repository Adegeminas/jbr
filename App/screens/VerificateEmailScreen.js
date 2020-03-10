import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import * as Actions from '../actions';
import { s, color } from '../libs/styles.js';

const image = require('../../assets/VerificateEmailScreen/0.png');

class VerificateEmailScreen extends React.Component {
  render() {
    return (
      <View style = { s.background }>

        <View style = { s.header }>
          <Text style = { s.text(22, 30, 'bold', 'center', color.black) }><Text style = {{color : '#4A90E2'}}>Job</Text>Board</Text>
        </View>

        <View style = {{ ...s.middle }}>
          <Image style = { s.image(257, 245) } source = { image }/>
          <View style = { s.br(10) }/>
          <Text style = { s.text(22, 30, 'bold', 'center', color.black) }>
            Thank you for Signing Up
          </Text>
          <View style = { s.br(10) }/>
          <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>
            The verification letter was sent to the email you specified.
          </Text>
        </View>

        <View style = { s.footer }>
          <TouchableOpacity
            style = { s.buttonbox(color.blue, color.blue) }
            onPress = { () => this.props.logout() }
          >
            <Text style = { s.text(16, 22, 'normal', 'center', color.white) }> Sign In </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

export default connect(
  null,
  (dispatch) => bindActionCreators(Actions, dispatch)
)(VerificateEmailScreen);
