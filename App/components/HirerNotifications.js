import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text, ScrollView, Image } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import * as Actions from '../actions';
import {s, color} from '../libs/styles.js';

const image = require('../../assets/MainMenu/0.png');
const bell_icon = require('../../assets/MainMenu/bell_icon.png');

class HirerNotifications extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: (<Image resizeMode = 'center' style = { s.image(48, 60) } source = { bell_icon }/>)
  };

  render() {
    return (
      <View style = { s.background }>
        <ScrollView>
          <View style = { s.header }>
            <View style = {{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <TouchableOpacity
                onPress = { () => {
                  this.props.navigation.dispatch(DrawerActions.openDrawer())
                } }
              >
                <Image resizeMode = 'center' style = { s.image(20, 20) } source = { image }/>
              </TouchableOpacity>
              <Text
                style = { s.text(22, 30, 'bold', 'center', color.black) }
              ><Text style = {{color : '#4A90E2'}}>Job</Text>Board</Text>
              <Text>     </Text>
            </View>
            <View style = {s.br(10)}/>
            <Text style = { s.text(22, 30, 'normal', 'center', color.black) }>Notifications</Text>
            <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>
              Suspendisse neque mi, maximus eget ante sed, egestas pretium magna.
            </Text>
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
)(HirerNotifications);
