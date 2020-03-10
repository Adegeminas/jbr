import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {TouchableOpacity, View, Text, ScrollView, Image } from 'react-native';
import * as Actions from '../actions';
import { s, color } from '../libs/styles.js';

const bell = require('../../assets/MainMenu/bell.png');

class WorkerJob extends React.Component {
  constructor() {
    super();

    this.state = {
      fullView: false,
      title: 'Roofer needed',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      pay_rate: [50, 1300],
      address: {
        state: 'GA',
        zip_code: '12387',
        locality: 'Atlanta'
      },
      skills: [],
      hard_skills: [
        'Roofing activities',
        'Safety requrements',
        'Comprehensive understanding',
        'Skills in writter',
        'Tools and equipment'
      ],
      soft_skills: [
        'Communication',
        'Conflict Resolution',
        'Time Management',
        'Self-Improvement'
      ]
    };
  }

  static navigationOptions = {
    drawerLabel: 'Test Job Notification Screen'
  };

  render() {
    return (
      <View style = { s.background }>
        <ScrollView
          style = { s.scrollview }
          keyboardShouldPersistTaps = 'always'
        >
          <View style = {{ ...s.header }}>
            <View style = {{ ...s.row, marginLeft: -10 }}>
              <Text
                style = {{ ...s.text(30, 30, 'bold', 'center', color.black)}}
                onPress = { () => this.props.navigation.navigate('WorkerProfile') }
              > ← </Text>
              <Text style = { s.text(22, 30, 'bold', 'center', color.black) }>
                <Text style = {{color : color.blue}}>Job</Text>Board</Text>
              <Text style = { s.text(22, 30, 'bold', 'center', color.black) }>     </Text>
            </View>
          </View>

          <View style = {{ ...s.middle }}>
            <View style = { s.br(10) } />
            <Image style = {{ ...s.image(108, 98), alignSelf: 'center' }} source = { bell }/>
            <View style = { s.br(10) } />
            <View style = { s.textbox }>
              <Text style = { s.text(16, 22, 'bold', 'center', color.black) }>
                The employer responded with a suitable job.</Text>
              <View style = { s.br(10) } />
              <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>Pay Rate Range</Text>

              <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>
                ${ this.state.pay_rate[0] } - ${ this.state.pay_rate[1] }
              </Text>

              <View style = { s.br(10) } />

              <Text style = { s.text(22, 30, 'bold', 'center', color.black) }>
                { this.state.title }
              </Text>
              <View style = { s.br(10) } />
              <Text style = { s.text(16, 22, 'normal', 'center', color.black) }> { this.state.description }</Text>
              <View style = { s.br(10) } />
              <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>
                {this.state.address.locality}, {this.state.address.state} - {this.state.address.zip_code} - 4 miles radius
              </Text>
            </View>

            { this.state.fullView ?
              (<View style = { s.textbox }>
                <View style = { s.br(10) } />
                <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>
                  Top 5 Skills Needed
                </Text>
                <Text style = {{ textAlign: 'center' }}> { this.state.hard_skills.join(' ,')} </Text>
                <Text> </Text>
                <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>
                  Top 5 Behavioral Skills Needed
                </Text>
                <Text style = {{ textAlign: 'center' }}> { this.state.soft_skills.join(' ,')} </Text>
                <TouchableOpacity
                  style = { s.buttonbox(color.white, color. white) }
                  onPress = { () => this.setState({
                    fullView: false
                  }) }
                >
                  <Text style = { s.text(16, 22, 'normal', 'center', color.blue) }>Collapse</Text>
                </TouchableOpacity>
              </View>)
              :
              (<TouchableOpacity
                style = { s.buttonbox(color.white, color. white) }
                onPress = { () => this.setState({ fullView: true }) }
              >
                <Text style = { s.text(16, 22, 'normal', 'center', color.blue) }>
                  Review
                </Text>
              </TouchableOpacity>)
            }
          </View>

          <View style = { s.footer }>
            <TouchableOpacity
              style = { s.buttonbox(color.blue, color.blue) }
              onPress = { () => this.props.navigation.navigate('WorkerOfferAccept') }
            >
              <Text style = { s.text(16, 22, 'normal', 'center', color.white) }> Interesting </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style = { s.buttonbox(color.white, color.blue) }
              onPress = { () => null }
            >
              <Text style = { s.text(16, 22, 'normal', 'center', color.blue) }> Not Interesting </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  (state) => {
    return {
      profile: state.appState.profile
    };
  },
  (dispatch) => bindActionCreators(Actions, dispatch)
)(WorkerJob);
