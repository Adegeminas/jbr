import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text, ScrollView, Image } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import * as Actions from '../actions';
import { s, color } from '../libs/styles.js';
import { TextField } from 'react-native-material-textfield';
import LocationSelector from '../components/LocationSelector.js';
import IndustrySelector from '../components/IndustrySelector.js';

const image = require('../../assets/MainMenu/0.png');
const profile_icon = require('../../assets/MainMenu/profile_icon.png');

class HirerProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: this.props.profile.first_name,
      last_name: this.props.profile.last_name,
      phone: this.props.profile.phone,
      address: {
        state: this.props.profile && this.props.profile.address && this.props.profile.address.state || '',
        locality: this.props.profile && this.props.profile.address && this.props.profile.address.locality || '',
        zip_code: this.props.profile && this.props.profile.address && this.props.profile.address.zip_code || ''
      },
      industry_id: this.props.profile.id,
      company_name: this.props.profile?.profile?.company_name || '',
      company_phone: this.props.profile?.profile?.company_phone || ''
    };
  }

  static navigationOptions = {
    drawerLabel: 'My profile',
    drawerIcon: (<Image resizeMode = 'center' style = { s.image(63, 63) } source = { profile_icon }/>)
  };

  render() {
    return (
      <View style = { s.background }>
        <ScrollView style = { s.scrollview } keyboardShouldPersistTaps = {'always'}>
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
            <Text style = { s.text(22, 30, 'normal', 'center', color.black) }>Welcome { this.props.profile.first_name }</Text>
            <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>
              Suspendisse neque mi, maximus eget ante sed, egestas pretium magna.
            </Text>
          </View>

          <View style = { s.middle_no_align }>
            <View style = { s.leftrow }>
              <View style = {{ ...s.flexinputbox }}>
                <TextField
                  label = 'First Name'
                  value = { this.state.first_name }
                  onChangeText = { first_name => this.setState({ first_name }) }
                />
              </View>
              <View style = {{ ...s.flexinputbox, marginLeft: 5 }}>
                <TextField
                  label = 'Last Name'
                  value = { this.state.last_name }
                  onChangeText = { last_name => this.setState({ last_name }) }
                />
              </View>
            </View>

            <View style = {{ ...s.flexinputbox }}>
              <TextField
                label = 'Phone'
                keyboardType = 'phone-pad'
                value = { this.state.phone }
                onChangeText = { phone => this.setState({ phone }) }
              />
            </View>

            <LocationSelector
              index = { this.state.address.zip_code }
              onSelect = { location => {
                this.setState({
                  address: {
                    state: location.state,
                    zip_code: location.zip_code,
                    locality: location.locality
                  }
                });
              }}
            />

            <View style = {{ ...s.flexinputbox }}>
              <TextField
                label = 'Company Name'
                value = { this.state.company_name }
                onChangeText = { company_name => this.setState({ company_name }) }
              />
            </View>

            <View style = {{ ...s.flexinputbox }}>
              <TextField
                label = 'Company Phone'
                keyboardType = 'phone-pad'
                value = { this.state.company_phone }
                onChangeText = { company_phone => this.setState({ company_phone }) }
              />
            </View>
          </View>

          <View style = { s.footer }>
            <TouchableOpacity
              style = { s.buttonbox(color.blue, color.blue) }
              onPress = { () => this.props.updateProfile({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                phone: this.state.phone,
                zip_code: this.state.address.zip_code,
                industry_id: this.state.industry_id,
                company_name: this.state.company_name,
                company_phone: this.state.company_phone
              }, this.props.access_token) }
            >
              <Text style = { s.text(16, 22, 'bold', 'center', color.white) }> Update </Text>
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
      access_token: state.appState.access_token,
      profile: state.appState.profile
    };
  },
  (dispatch) => bindActionCreators(Actions, dispatch)
)(HirerProfile);
