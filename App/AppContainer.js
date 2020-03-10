import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions';
import { Alert } from 'react-native';

import HirerWelcomeScreen from './screens/HirerWelcomeScreen.js';
import WorkerWelcomeScreen from './screens/WorkerWelcomeScreen.js';

import LoginScreen from './screens/LoginScreen.js';
import WorkInProgressScreen from './screens/WorkInProgressScreen.js';

import NoRegSelectRoleScreen from './screens/NoRegSelectRoleScreen.js';
import NoRegLookingForAJobScreen from './screens/NoRegLookingForAJobScreen.js';
import NoRegLookingForAnEmployeeScreen from './screens/NoRegLookingForAnEmployeeScreen.js';
import NoRegResultsScreen from './screens/NoRegResultsScreen.js';

import GetStartedScreen from './screens/GetStartedScreen.js';
import VerificateEmailScreen from './screens/VerificateEmailScreen.js';

import HirerCompleteProfileScreen from './screens/HirerCompleteProfileScreen.js';
import HirerMainMenuScreen from './screens/HirerMainMenuScreen.js';

import WorkerUploadResumeScreen from './screens/WorkerUploadResumeScreen.js';
import WorkerCompleteProfileScreen from './screens/WorkerCompleteProfileScreen.js';
import WorkerMainMenuScreen from './screens/WorkerMainMenuScreen.js';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this._screens = {
      _HirerWelcomeScreen: HirerWelcomeScreen,
      _WorkerWelcomeScreen: WorkerWelcomeScreen,
      _LoginScreen: LoginScreen,
      _WorkInProgressScreen: WorkInProgressScreen,

      _NoRegSelectRoleScreen: NoRegSelectRoleScreen,
      _NoRegLookingForAJobScreen: NoRegLookingForAJobScreen,
      _NoRegLookingForAnEmployeeScreen: NoRegLookingForAnEmployeeScreen,
      _NoRegResultsScreen: NoRegResultsScreen,

      _GetStartedScreen: GetStartedScreen,
      _VerificateEmailScreen: VerificateEmailScreen,

      _HirerCompleteProfileScreen: HirerCompleteProfileScreen,
      _HirerMainMenuScreen: HirerMainMenuScreen,

      _WorkerUploadResumeScreen: WorkerUploadResumeScreen,
      _WorkerCompleteProfileScreen: WorkerCompleteProfileScreen,
      _WorkerMainMenuScreen: WorkerMainMenuScreen
    };
  }

  async componentDidMount() {
    await this.props.loadCache();

    if (this.props.state.places.length < 1000) {
      await this.props.loadPlaces();
    }
    if (this.props.state.taxonomies === null) {
      await this.props.loadTaxonomies();
    }
  }

  async componentDidUpdate() {
    if (this.props.state.places.length < 1000) {
      await this.props.loadPlaces();
    }

    if (this.props.state.taxonomies === null) {
      await this.props.loadTaxonomies();
    }

    if (this.props.error.type) {
      Alert.alert(
        this.props.error.type,
        this.props.trace || this.props.error.message,
        [
          {text: 'Close', onPress: () => {
            this.props.dismissError();
          }}
        ],
        { cancelable: false }
      );
    }

    this.props.saveCache(this.props.state);
  }

  render() {
    return React.createElement(this._screens['_' + this.props.currentScreen], null);
  }
}

export default connect(
  (state) => {
    return {
      state: state.appState,
      error: state.appState.error,
      trace: state.appState.trace,
      currentScreen: state.appState.currentScreen
    };
  },
  (dispatch) => bindActionCreators(Actions, dispatch)
)(AppContainer);
