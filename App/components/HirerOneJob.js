import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text, Image, ScrollView, Modal, Alert, TouchableHighlight } from 'react-native';
import * as Actions from '../actions';
import {s, color} from '../libs/styles.js';
import DeckSwiper from './DeckSwiper.js';

const cancel = require('../../assets/MainMenu/cancel.png');

class HirerOneJob extends React.Component {
  static navigationOptions = { drawerLabel: () => null };

  render() {
    return (
      <View style = { s.background_no_align }>
        <View style = { s.header }>
          <View style = { s.row }>
            <Text>          </Text>
            <Text
              style = { s.text(22, 30, 'normal', 'center', color.black) }
            ><Text style = {s.text(22, 30, 'normal', 'center', color.blue)}>Job</Text>Board</Text>
            <TouchableOpacity
              onPress = { () => {
                this.props.navigation.navigate('HirerJobs');
              } }
            >
              <Image  style = { s.image(20, 20) } source = { cancel }/>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView keyboardShouldPersistTaps = {'always'}>
          <Text style = { s.text(22, 30, 'normal', 'center', color.black)}> { this.props.job.title } </Text>
          <Text style = { s.text(16, 22, 'normal', 'center', color.black)}> { this.props.job.description } </Text>

          <DeckSwiper
            workers = { this.props.workers }
            openCandidateScreen = {
              worker => {
                this.props.setCurrentCandidate(worker);
                this.props.navigation.navigate('HirerCandidate')
              }
            }
          />

          <Text style = {s.text(22, 30, 'normal', 'center', color.black)}>Maybe candidates</Text>

          <DeckSwiper
            workers = { this.props.workers }
            openCandidateScreen = {
              worker => {
                this.props.setCurrentCandidate(worker);
                this.props.navigation.navigate('HirerCandidate')
              }
            }
          />

        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => {
    return {
      access_token: state.appState.access_token,
      job: state.appState.currentJob,
      workers: state.appState.currentCandidates
    };
  },
  dispatch => bindActionCreators(Actions, dispatch)
)(HirerOneJob);
