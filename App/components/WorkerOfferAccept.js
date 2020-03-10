import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import * as Actions from '../actions';
import { s, color} from '../libs/styles.js';
import { TextField } from 'react-native-material-textfield';

const email = require('../../assets/MainMenu/email.png');
const phone = require('../../assets/MainMenu/phone.png');
const message = require('../../assets/MainMenu/message.png');

const offer_id = 'bad25ee2-0e18-4ca3-b438-5c9c8386bd54';

class WorkerOfferAccept extends React.Component {
  constructor() {
    super();

    this.state = {
      via: 'email',
      value: ''
    };
  }

  static navigationOptions = {
    drawerLabel: 'Offer Accept Screen'
  };

  render() {
    return (
      <View style = {{ ...s.background_no_align, width: '100%' }}>
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

        <View style = {  s.middle_no_align }>
          <Text style = { s.text(22, 30, 'bold', 'center', color.black) }>Interesting job?</Text>
          <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>
            Suspendisse neque mi, maximus eget ante sed, egestas pretium magna.
          </Text>

          <View style = { s.br(20) }/>

          <View style = {{ alignSelf: 'flex-start'}}>
            <Text style = { s.text(13, 16, 'normal', 'left', 'gray')}>Select contact method</Text>
          </View>

          <View style = { s.imagesContainer }>
            <TouchableOpacity
              style = {{ ...s.roleContainer, backgroundColor: this.state.via === 'email' ? '#4A90E2' : '#E4EBF1' }}
              onPress = { () => {
                this.setState({ via: 'email' })
              } }
            >
              <Image
                style = { s.image(40, 35) }
                source = { email }
              />
            </TouchableOpacity>

            <TouchableOpacity
              style = {{ ...s.roleContainer, backgroundColor: this.state.via === 'phone' ? '#4A90E2' : '#E4EBF1' }}
              onPress = { () => {
                this.setState({ via: 'phone' })
              } }
            >
              <Image
                style = { s.image(40, 35) }
                source = { phone }
              />
            </TouchableOpacity>

            <TouchableOpacity
              style = {{ ...s.roleContainer, backgroundColor: this.state.via === 'message' ? '#4A90E2' : '#E4EBF1' }}
              onPress = { () => {
                this.setState({ via: 'message' })
              } }
            >
              <Image
                style = { s.image(40, 35) }
                source = { message }
              />
            </TouchableOpacity>
          </View>

          <View style = { s.br(20) }/>

          <TextField
            label = { this.state.via === 'email' ? 'Enter Your Contact Email' : 'Enter Your Contact Phone'}
            keyboardType = { this.state.via === 'email' ? 'email-address' : 'phone-pad'}
            value = { this.state.job_title }
            onChangeText = { job_title => this.setState({ job_title }) }
          />

          <TextField
            label = 'Enter Your Message'
            keyboardType = { this.state.via === 'email' ? 'email-address' : 'phone-pad'}
            value = { this.state.job_description }
            onChangeText = { job_description => this.setState({ job_description }) }
          />

        </View>

        <View style = { s.footer }>
          <TouchableOpacity
            style = { s.buttonbox(color.blue, color.blue) }
            onPress = { () => this.props.acceptOffer(offer_id, this.state, this.props.access_token) }
          >
            <Text style = { s.text(16, 22, 'bold', 'center', color.white) }> Send </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(
  state => {
    return {
      profile: state.appState.profile,
      access_token: state.appState.access_token
    };
  },
  (dispatch) => bindActionCreators(Actions, dispatch)
)(WorkerOfferAccept);
