import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import {s, color} from '../libs/styles.js';
import * as Actions from '../actions';

const arrow = require('../../assets/MainMenu/arrow.png');

const portrets = {
  male: require('../../assets/ProfileScreen/male.png'),
  female: require('../../assets/ProfileScreen/female.png'),
  neutral: require('../../assets/ProfileScreen/both.png')
}

const no = require('../../assets/MainMenu/no.png');
const maybe = require('../../assets/MainMenu/maybe.png');
const yes = require('../../assets/MainMenu/yes.png');

class HirerCandidate extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null
  };

  render() {
    console.log(this.props.worker);

    return (
      <View style = {{ ...s.background, paddingLeft: 0, paddingRight: 0, backgroundColor: color.nearwhite }}>
        <ScrollView style = {{ ...s.scrollview, backgroundColor: color.nearwhite }}>
          <View style = {{ ...s.row, width: '100%', paddingLeft: 18, paddingRight: 18, marginBottom: 15 }}>
            <TouchableOpacity
              onPress = { () => {
                this.props.navigation.navigate('HirerOneJob');
              } }
            >
              <Image resizeMode = 'center' style = { s.image(20, 20) } source = { arrow }/>
            </TouchableOpacity>
            <Text
              style = { s.text(22, 30, 'bold', 'center', color.black) }
            ><Text style = {s.text(22, 30, 'bold', 'center', color.blue)}>Job</Text>Board</Text>
            <Text>          </Text>
          </View>
          <View
            style = {{
              ...s.row,
              width: '100%',
              backgroundColor: color.green,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              paddingLeft: 10
            }}
          >
            <Text style = {s.text(16, 22, 'normal', 'left', color.white)}>{ this.props.job.title }</Text>
            <View>
              <Image
                resizeMode = 'contain'
                style = {{
                  height: 200 * s.height / 667,
                  marginBottom: -20 * s.height / 667,
                  marginTop: -20 * s.height / 667
                }}
                source = { portrets[this.props.worker.gender] }
              />
            </View>
            <Text style = {s.text(16, 22, 'normal', 'left', color.green)}>{ this.props.job.title }</Text>
          </View>
          <View style = { s.br(20) }/>
          <Text style = {s.text(22, 30, 'bold', 'center', color.black)}>
            {this.props.worker.first_name} {this.props.worker.last_name}
          </Text>
          <Text style = {s.text(16, 22, 'normal', 'center', color.black)}>
            4 miles radius
          </Text>
          <Text style = {s.text(30, 45, 'bold', 'center', color.black)}>
            ...
            ...
            ...
          </Text>
        </ScrollView>

        <View style = {{ ...s.row, alignItems: 'space-around', width: '90%', marginBottom: 10 }}>
          <TouchableOpacity
            style = {{ ...s.roleContainer, backgroundColor: color.white, borderColor: color.gray }}
            onPress = { () => {} }
          >
            <Image
              resizeMode = 'center'
              style = { s.image(67, 67) }
              source = { no }
            />
          </TouchableOpacity>

          <TouchableOpacity
            style = {{ ...s.roleContainer, backgroundColor: color.white, borderColor: color.gray }}
            onPress = { () => {} }
          >
            <Image
              resizeMode = 'center'
              style = { s.image(67, 67) }
              source = { maybe }
            />
          </TouchableOpacity>

          <TouchableOpacity
            style = {{ ...s.roleContainer, backgroundColor: color.white, borderColor: color.gray }}
            onPress = { () => {} }
          >
            <Image
              resizeMode = 'center'
              style = { s.image(67, 67) }
              source = { yes }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(
  (state) => {
    return {
      profile: state.appState.profile,
      job: state.appState.currentJob,
      worker: state.appState.currentCandidate
    };
  },
  (dispatch) => bindActionCreators(Actions, dispatch)
)(HirerCandidate);
