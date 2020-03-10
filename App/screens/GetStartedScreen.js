import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import * as Actions from '../actions';
import { s, color } from '../libs/styles.js';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ee_color = require('../../assets/NoRegSelectRoleScreen/employee_color.png');
const er_color = require('../../assets/NoRegSelectRoleScreen/employer_color.png');
const ee_gray = require('../../assets/NoRegSelectRoleScreen/employee_gray.png');
const er_gray = require('../../assets/NoRegSelectRoleScreen/employer_gray.png');

class GetStartedScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      as: 'no',
      email: '',
      password: '',
      password_confirmation: '',
      secureTextEntry: true
    };
  }

  emailError() {
    if (this.state.email.length < 3) return false;

    const emailCheck = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return !emailCheck.test(this.state.email);
  }

  passwordError() {
    if (this.state.password.length === 0) return false;
    return this.state.password.length < 8;
  }

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
  }

  renderPasswordAccessory() {
    const { secureTextEntry } = this.state;

    const name = secureTextEntry ? 'visibility' : 'visibility-off';

    return (
      <TouchableOpacity onPress = { () => {}}>
        <MaterialIcon
          size = {24}
          color = { 'gray' }
          name = { name }
          onPress = { () => {
            this.onAccessoryPress()
          }}
          suppressHighlighting
        />
      </TouchableOpacity>
    );
  }

  render() {
    return (

      <View style = {{ ...s.background_no_align, width: '100%' }}>
        <View style = {{ ...s.middle, width: '100%' }}>
          <View style = { s.br(20) }/>
          <Text style = { s.text(22, 30, 'normal', 'center', color.black) }>Get Started</Text>
          <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>
            Sign up for new account, enter your email and get started.
          </Text>
          <View style = { s.br(10) }/>

          <View style = {{...s.leftrow, width: '100%' }}>
            <Text style = { s.text(12, 15, 'normal', 'left', 'gray') }>Select your Role:</Text>
          </View>

          <View style = { s.imagesContainer }>
            <TouchableOpacity
              style = { s.setStartedRoleContainer }
              onPress = { () => {
                this.setState({ as: 'worker' })
              }}
            >
              <Image style = { s.image(80, 80) } source = { this.state.as === 'worker' ? ee_color : ee_gray }/>
              <Text style = { this.state.as === 'worker' ? { color: color.black } : { color: 'gray' } }> Employee </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style = { s.setStartedRoleContainer }
              onPress = { () => {
                this.setState({ as: 'hirer' })
              } }
            >
              <Image style = { s.image(80, 80) } source = { this.state.as === 'hirer' ? er_color : er_gray }/>
              <Text style = { this.state.as === 'hirer' ? { color: color.black } : { color: 'gray' } }> Employer </Text>
            </TouchableOpacity>
          </View>

          <View
            style = {{
              width: '100%'
            }}
          >

            <TextField
              label = 'Email'
              keyboardType='email-address'
              value = { this.state.email }
              error = { this.emailError() ? 'invalid email' : null }
              onChangeText = { email => this.setState({ email }) }
            />

            <TextField
              secureTextEntry = { this.state.secureTextEntry }
              label = 'Password'
              value = { this.state.password }
              error = { this.passwordError() ? 'too short password' : null }
              onChangeText = { password => this.setState({ password }) }
              renderRightAccessory = { () => this.renderPasswordAccessory() }
            />

            <TextField
              secureTextEntry = { this.state.secureTextEntry }
              label = 'Confirm Password'
              value = { this.state.password_confirmation }
              onChangeText = { password_confirmation => this.setState({ password_confirmation }) }
              renderRightAccessory = { () => this.renderPasswordAccessory() }
            />
          </View>
        </View>


        <View style = { s.footer }>
          <TouchableOpacity
            style = { s.buttonbox(color.blue, color.blue) }
            onPress = { () => this.props.register(this.state) }
          >
            <Text style = { s.text(16, 22, 'normal', 'center', color.white) }> Next </Text>
          </TouchableOpacity>

          <Text
            style = { s.text(16, 22, 'normal', 'center', color.black) }
            onPress = { () => this.props.logout() }
          >
            Already have an account? <Text style = { s.text(16, 22, 'normal', 'center', color.blue)}>Sign in here</Text>
          </Text>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  (dispatch) => bindActionCreators(Actions, dispatch)
)(GetStartedScreen);
