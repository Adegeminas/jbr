import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity, View,
  Text, Slider } from 'react-native';
import * as Actions from '../actions';
import { s, color } from '../libs/styles.js';
import * as api from '../libs/api';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import LocationSelector from '../components/LocationSelector.js';
import IndustrySelector from '../components/IndustrySelector.js';

class NoRegLookingForAJobScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: {
        state: '',
        zip_code: '',
        locality: ''
      },
      industry: '',
      profession: '',

      search_radius: 5,
      hourly_rate: [100, 300]
    };
  }

  handleSearchButtonClick() {
    if (this.state.address.zip_code.length <= 0) {
      return this.props.showError('no-address');
    }

    if (this.state.industry.length <= 0 || this.state.industry.profession <= 0) {
      return this.props.showError('no-industry');
    }

    this.props.noRegWorkerSearch({
      industry: this.state.industry,
      profession: this.state.profession,
      search_radius: this.state.search_radius,
      hourly_rate: this.state.hourly_rate,
      zip_code: this.state.address.zip_code
    });
  }

  render() {
    return (
      <View style = { s.background }>
        <View style = { s.header }>
          <View style = {{ ...s.row, marginLeft: -20 }}>
            <Text
              style = {{ ...s.text(30, 30, 'bold', 'center', color.black)}}
              onPress = { () => this.props.toNoRegSelectRoleScreen() }
            > ← </Text>
            <Text style = { s.text(22, 30, 'bold', 'center', color.black) }>
              <Text style = {{color : color.blue}}>Job</Text>Board</Text>
            <Text style = { s.text(22, 30, 'bold', 'center', color.black) }>     </Text>
          </View>
          <View style = { s.br(10) }/>
          <Text style = { s.text(22, 30, 'normal', 'center', color.black) }>Looking for a job?</Text>
          <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>
            Specify the parameters bellow and click on "search"
          </Text>
        </View>

        <View style = {{ ...s.middle_no_align }}>
          <View style = { s.br(20)} />

          <LocationSelector
            required
            onSelect = { location => {
              this.setState({
                address: {
                  state: location.state,
                  zip_code: location.zip_code,
                  locality: location.locality
                }
              })
            }}
          />

          <View style = { s.middleColumn}>
            <View style = {{ ...s.inputbox, borderBottomWidth: 0 }}>
              <Text style = {{ color: 'gray'}}>
                Search Radius
              </Text>

              <Text>
                { this.state.search_radius } miles
              </Text>

              <Slider
                style = { s.slider }
                minimumValue = { 1 }
                maximumValue = { 30 }
                maximumTrackTintColor = '#282828'
                step = { 0 }
                onValueChange = { api.debounce(search_radius => this.setState({
                  search_radius: Math.floor(search_radius)
                }), 100)}
                value = { this.state.search_radius }
              />

            </View>
          </View>

          <IndustrySelector
            required
            onSelect = { taxonomy => {
              this.setState({
                industry: taxonomy.industry_id,
                profession: taxonomy.jobtype_id
              });
            }}
          />

          <View style = { s.br(20) }/>

          <Text style = {{ color: 'gray'}}>
            Pay Rate Range
          </Text>

          <View
            style = {{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text>Start from {this.state.hourly_rate[0]} </Text>
            <Text>to {this.state.hourly_rate[1]} $ </Text>
          </View>

          <MultiSlider
            values = {[this.state.hourly_rate[0], this.state.hourly_rate[1]]}
            min = { 5 }
            max = { 500 }
            isMarkersSeparated
            sliderLength = { 280 * s.height / 667 }
            onValuesChange = { api.debounce(values => this.setState({
              hourly_rate: [Math.floor(values[0]), Math.floor(values[1])]
            }), 100)}
          />
        </View>

        <TouchableOpacity
          style = { s.buttonbox(color.blue, color.blue) }
          onPress = { () => this.handleSearchButtonClick() }
        >
          <Text style = { s.text(16, 22, 'normal', 'center', color.white) }> Search Job </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  null,
  (dispatch) => bindActionCreators(Actions, dispatch)
)(NoRegLookingForAJobScreen);
