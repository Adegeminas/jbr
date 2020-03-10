import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import * as Actions from '../actions';
import { s } from '../libs/styles.js';

const logout_icon = require('../../assets/MainMenu/logout_icon.png');

class HirerLogout extends React.Component {
  componentDidMount() {
    this.props.logout();
  }

  static navigationOptions = {
    drawerLabel: 'Logout',
    drawerIcon: (<Image resizeMode = 'center' style = { s.image(48, 60) } source = { logout_icon }/>)
  };

  render() {
    return (
      <View />
    );
  }
}

export default connect(
  null,
  (dispatch) => bindActionCreators(Actions, dispatch)
)(HirerLogout);
