import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import * as Actions from '../actions';
import { s, color } from '../libs/styles.js';

const ee_color = require('../../assets/NoRegSelectRoleScreen/employee_color.png');
const er_color = require('../../assets/NoRegSelectRoleScreen/employer_color.png');
const ee_gray = require('../../assets/NoRegSelectRoleScreen/employee_gray.png');
const er_gray = require('../../assets/NoRegSelectRoleScreen/employer_gray.png');

class NoRegSelectRoleScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      role: 'no'
    };
  }

  render() {
    return (
      <View style = { s.background }>

        <View style = { s.header }>
          <Text style = { s.text(22, 30, 'bold', 'center', color.black) }><Text style = {{color : '#4A90E2'}}>Job</Text>Board</Text>
          <View style = { s.br(10) }/>
          <Text style = { s.text(22, 30, 'normal', 'center', color.black) }>What role do you have?</Text>
          <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Duis et dictum magna.
          </Text>
        </View>

        <View style = { s.middle }>
          <View style = { s.br(10) }/>
          <Text style = {{ ...s.text(12, 16, 'normal', 'left', 'gray'), width: '100%' }}>Select your Role:</Text>
          <View style = { s.br(10) }/>

          <View style = { s.imagesContainer }>
            <TouchableOpacity
              style = { s.setStartedRoleContainer }
              onPress = { () => {
                this.setState({ role: 'worker' })
              } }
            >
              <Image style = { s.image(80, 80) } source = { this.state.role === 'worker' ? ee_color : ee_gray }/>
              <Text style = { this.state.role === 'worker' ?
                s.text(14, 19, 'normal', 'center', '#161616') :
                s.text(14, 19, 'normal', 'center', '#A5A5A5') }
              > Employee </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style = { s.setStartedRoleContainer }
              onPress = { () => {
                this.setState({ role: 'hirer' })
              } }
            >
              <Image style = { s.image(80, 80) } source = { this.state.role === 'hirer' ? er_color : er_gray }/>
              <Text style = { this.state.role === 'hirer' ?
                s.text(14, 19, 'normal', 'center', '#161616') :
                s.text(14, 19, 'normal', 'center', '#A5A5A5') }
              > Employer </Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style = { s.footer }>
          <TouchableOpacity
            style = { this.state.role === 'no' ?
              s.buttonbox(color.gray, color.gray) :
              s.buttonbox(color.blue, color.blue) }
            onPress = { () => {
              if (this.state.role === 'no') return;
              return this.state.role === 'worker' ?
                this.props.toNoRegLookingForAJobScreen() :
                this.props.toNoRegLookingForAnEmployeeScreen()
            }}
          >
            <Text style = { s.text(16, 22, 'normal', 'center', color.white) }> Next </Text>
          </TouchableOpacity>


          <Text
            style = { s.text(16, 22, 'normal', 'center', color.black) }
            onPress = { () => this.props.logout() }
          > Already have an account? <Text style = {{color : '#4A90E2'}}>Sign in here</Text></Text>

        </View>
      </View>
    );
  }
}

export default connect(
  null,
  (dispatch) => bindActionCreators(Actions, dispatch)
)(NoRegSelectRoleScreen);
