import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import * as Actions from '../actions';
import { s, color } from '../libs/styles.js';
import { TextField } from 'react-native-material-textfield';
import LocationSelector from '../components/LocationSelector.js';
import IndustrySelector from '../components/IndustrySelector.js';

class HirerCompleteProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: this.props.profile.first_name || '',
      last_name: this.props.profile.last_name || '',
      phone: this.props.profile.phone || '',
      address: {
        state: '',
        zip_code: '',
        locality: ''
      },
      industry_id: '',
      company_name: '',
      company_phone: ''
    };
  }

  render() {
    return (
      <View style = {{ ...s.background }}>
        <ScrollView style = { s.scrollview } keyboardShouldPersistTaps = {'always'}>
          <View style = { s.header }>
            <View style = { s.br(10) }/>
            <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>COMPLETE PROFILE</Text>
            <View style = { s.br(10) }/>
            <Text style = {s.text(16, 22, 'normal', 'center', color.black) }>
              Suspendisse neque mi, maximus eget ante sed, egestas pretium magna.
            </Text>
          </View>

          <View style = {{ ...s.middle_no_align }}>
            <View style = { s.leftrow }>
              <View style = {{ ...s.flexinputbox }}>
                <TextField
                  label = <Text><Text style = {{ color: 'red'}}>* </Text>First Name</Text>
                  value = { this.state.first_name }
                  onChangeText = { first_name => this.setState({ first_name }) }
                />
              </View>
              <View style = {{ ...s.flexinputbox, marginLeft: 5 }}>
                <TextField
                  label = <Text><Text style = {{ color: 'red'}}>* </Text>Last Name</Text>
                  value = { this.state.last_name }
                  onChangeText = { last_name => this.setState({ last_name }) }
                />
              </View>
            </View>

            <View style = {{ ...s.flexinputbox }}>
              <TextField
                label = <Text><Text style = {{ color: 'red'}}>* </Text>Phone</Text>
                keyboardType = 'phone-pad'
                value = { this.state.phone }
                onChangeText = { phone => this.setState({ phone }) }
              />
            </View>

            <LocationSelector
              required
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

            <IndustrySelector
              required
              onSelect = { taxonomy => {
                this.setState({
                  industry_id: taxonomy.industry_id,
                  profession: taxonomy.jobtype_id
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
              <Text style = {{ color: 'white' }}> Complete </Text>
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
)(HirerCompleteProfileScreen);
