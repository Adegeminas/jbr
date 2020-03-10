import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import * as Actions from '../actions';
import { s, color } from '../libs/styles.js';

const image = require('../../assets/NoRegResultsScreen/0.png');

class NoRegResultsScreen extends React.Component {
  render() {
    return (
      <View style = { s.background }>
        <View style = { s.middle }>
          <Image style = { s.image(233, 262) } source = { image }/>
          <Text style = { s.text(22, 30, 'bold', 'center', color.black) }>Search Results</Text>
          <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>
            There were <Text style = {{color: '#4A90E2'}}>{this.props.searches_like_yours} </Text>
            amount of searches like yours. Potential {this.props.role === 'worker' ? 'jobs' : 'employees'} <Text style = {{color: '#4A90E2'}}>
              {this.props.role === 'worker' ? this.props.potential_jobs : this.props.potential_employees}.
            </Text>
          </Text>
          <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>
            To be able to use all the features of the application, you must log in.
          </Text>
        </View>

        <View style = { s.footer }>
          <TouchableOpacity
            onPress = { () => this.props.signUpStart() }
            style = { s.buttonbox(color.blue, color.blue) }
          >
            <Text style = { s.text(16, 22, 'normal', 'center', color.white) }> Sign Up Free </Text>
          </TouchableOpacity>

          <Text
            style = { s.text(16, 22, 'normal', 'center', color.black) }
            onPress = { () => this.props.logout() }
          > Already have an account? <Text style = {{color : '#4A90E2'}}>Sign In here</Text></Text>
        </View>
      </View>
    );
  }
}

export default connect(
  (state) => {
    return {
      role: state.appState.no_reg_role,
      searches_like_yours: state.appState.searches_like_yours,
      potential_employees: state.appState.potential_employees,
      potential_jobs: state.appState.potential_jobs
    };
  },
  (dispatch) => bindActionCreators(Actions, dispatch)
)(NoRegResultsScreen);
