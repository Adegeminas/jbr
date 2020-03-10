import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import * as Actions from '../actions';
import { s, color } from '../libs/styles.js';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const image = require('../../assets/LoginScreen/header.png');

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cache_loaded: false,
      email: this.props.e || '',
      password: this.props.p || '',
      remember: this.props.remember || false,
      secureTextEntry: true,
      out: null
    };
  }

  componentDidMount() {
    setTimeout(function () {
      this.setState({
        email: this.props.e || '',
        password: this.props.p || '',
        remember: this.props.remember || false
      })
    }.bind(this), 300);
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
        <View>
          <Image style = {{ ...s.image(232, 190), alignSelf: 'center' }} source = { image }/>

          <Text
            style = { s.text(22, 30, 'normal', 'center', color.black) }
          > Welcome to <Text style = { s.text(22, 30, 'bold', 'center', color.blue) }>Job</Text>Board</Text>

          <TextField
            label = 'Email'
            keyboardType='email-address'
            error = { this.emailError() ? 'invalid email' : null }
            value = { this.state.email }
            onChangeText = { email => this.setState({ email }) }
          />

          <TextField
            secureTextEntry = { this.state.secureTextEntry }
            label = 'Password'
            error = { this.passwordError() ? 'too short password' : null }
            value = { this.state.password }
            onChangeText = { password => this.setState({ password }) }
            renderRightAccessory = { () => this.renderPasswordAccessory() }
          />
        </View>

        <View style = { s.row }>
          <View style = { s.row }>
            <TouchableOpacity
              style = {{
                borderWidth: 1,
                width: 15,
                height: 15,
                borderColor:  this.state.remember === true ? color.blue : color.darkgray,
                backgroundColor: this.state.remember === true ? color.blue : color.white
              }}
              onPress = { () => this.setState({
                remember: !this.state.remember
              }) }
            />
            <Text style = { s.text(14, 18, 'normal', 'right', color.black) } onPress = { () => null }> Remember me </Text>
          </View>
          <Text style = { s.text(14, 18, 'normal', 'right', color.black) } onPress = { () => null }> Forget Password </Text>
        </View>

        <View style = {{ ...s.footer, width: '100%', marginBottom: 20 }} >
          <TouchableOpacity
            style = {  s.buttonbox(color.blue, color.blue) }
            onPress = { () => this.props.authorize(this.state) }
          >
            <Text style = { s.text(16, 22, 'bold', 'center', color.white) }> Sign In </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style = {  s.buttonbox(color.white, color.blue) }
            onPress = { () => this.props.toNoRegSelectRoleScreen() }
          >
            <Text style = { s.text(16, 22, 'bold', 'center', color.blue) }> Skip and Continue without Registration </Text>
          </TouchableOpacity>

          <Text
            style = { s.text(16, 22, 'normal', 'center', color.black) }
            onPress = { () => this.props.signUpStart() }
          >
            Don't have an account?<Text style = { s.text(16, 22, 'normal', 'left', color.blue) }> Signup here</Text>
          </Text>
          <Text style = { s.text(16, 22, 'bold', 'center', color.black) }> Version 20.02.2020 - 11:53</Text>
        </View>
      </View>
    );
  }
}

export default connect(
  state => {
    return {
      remember: state.appState.remember,
      e: state.appState.e,
      p: state.appState.p
    };
  },
  dispatch => bindActionCreators(Actions, dispatch)
)(LoginScreen);
