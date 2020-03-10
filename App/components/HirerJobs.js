import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity, ScrollView, View, Text, Image } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import * as Actions from '../actions';
import {s, color} from '../libs/styles.js';

const image = require('../../assets/MainMenu/0.png');
const telescope = require('../../assets/MainMenu/1.png');
const geoposition = require('../../assets/MainMenu/geoposition.png');
const candidate = require('../../assets/MainMenu/candidate.png');
const clock = require('../../assets/MainMenu/clock.png');
const jobs_icon = require('../../assets/MainMenu/jobs_icon.png');

class HirerJobs extends React.Component {
  async componentDidMount() {}
  static navigationOptions = {
    drawerLabel: 'Jobs',
    drawerIcon: (<Image resizeMode = 'center' style = { s.image(66, 63) } source = { jobs_icon }/>)
  };

  componentDidMount() {
    this.props.getAllJobs(this.props.access_token);
  }

  render() {
    return (
      <View style = {{ ...s.background, backgroundColor: this.props.jobs.length === 0 ? color.white : color.nearwhite }}>
        <View style = { s.header }>
          <View style = { s.row }>
            <TouchableOpacity
              onPress = { () => {
                this.props.navigation.dispatch(DrawerActions.openDrawer())
              } }
            >
              <Image  style = { s.image(22, 14) } source = { image }/>
            </TouchableOpacity>
            <Text
              style = { s.text(22, 30, 'bold', 'center', color.black) }
            ><Text style = {s.text(22, 30, 'bold', 'center', color.blue)}>Job</Text>Board</Text>
            <Text>          </Text>
          </View>
        </View>

        <View style = {{ ...s.middle, backgroundColor: this.props.jobs.length === 0 ? color.white : color.nearwhite }}>
          { this.props.jobs.length === 0 ? (
            <View>
              <Text style = { s.text(22, 30, 'bold', 'center', color.black) }>
                This section is empty yet.
              </Text>
              <View style = { s.br(10) } />
              <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>
                Create a first job to be able to view potential employees.
              </Text>
              <View style = { s.br(50) } />
              <Image style = { s.image(280, 280) } source = { telescope }/>
            </View>
          ) : (
            <ScrollView style = { s.scrollview }>
              { this.props.jobs.map((job, index) => (
                <TouchableOpacity
                  key = { index }
                  style = {{
                    padding: 10,
                    marginBottom: 10,
                    backgroundColor: color.white,
                    borderWidth: 1,
                    borderColor: color.gray,
                    width: '100%'
                  }}
                  onPress = { () => {
                    this.props.loadCandidates(
                      job,
                      this.props.access_token,
                      () => this.props.navigation.navigate('HirerOneJob'));
                  } }
                >
                  <View style = { s.leftrow }>
                    <Image style = { s.image(10, 12) } source = { geoposition }/>
                    <Text style = { s.text(13, 18, 'normal', 'left', color.black) }>
                      {} { job.address.locality }, { job.address.state}
                    </Text>
                  </View>

                  <Text style = { s.text(22, 30, 'normal', 'left', color.blue) }>
                    { job.title }
                  </Text>
                  <Text style = { s.text(16, 22, 'normal', 'left', color.black) }>
                    { job.description }
                  </Text>
                  <View style = {{ margin: 10, borderBottomWidth: 2, borderColor: color.gray}} />
                  <View style = { s.row }>
                    <View style = { s.leftrow }>
                      <Image style = { s.image(16, 16) } source = { clock }/>
                      <Text style = { s.text(13, 18, 'normal', 'left', color.black) }>
                        {} { 30 } days left
                      </Text>
                    </View>
                    <View style = { s.leftrow }>
                      <Image style = { s.image(16, 16) } source = { candidate }/>
                      <Text style = { s.text(13, 18, 'normal', 'left', color.black) }>
                        {} { job.candidates_count } Potential Candidates
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <View style = { s.footer }>
          <TouchableOpacity
            style = { s.buttonbox(color.blue, color.blue) }
            onPress = { () => this.props.navigation.navigate('HirerAddSearch') }
          >
            <Text style = {s.text(16, 22, 'normal', 'center', color.white)}> Add Search Criteria </Text>
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
      jobs: state.appState.jobs,
      access_token: state.appState.access_token
    };
  },
  (dispatch) => bindActionCreators(Actions, dispatch)
)(HirerJobs);
