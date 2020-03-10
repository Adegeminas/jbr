import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity, View,
  Text, ScrollView,  Slider } from 'react-native';
import * as Actions from '../actions';
import * as api from '../libs/api';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { s, color } from '../libs/styles.js';
import { TextField } from 'react-native-material-textfield';
import LocationSelector from '../components/LocationSelector.js';
import IndustrySelector from '../components/IndustrySelector.js';
import SkillsSelector from '../components/SkillsSelector.js';

class HirerAddSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      address: {
        state: '',
        zip_code: '',
        locality: ''
      },
      industry: '',
      industry_id: '',
      profession: '',

      hard_skills: '',
      soft_skills: '',

      search_radius: 5,
      hourly_rate: [100, 300],
      skills: []
    };
  }

  static navigationOptions = {
    drawerLabel: () => null
  };

  render() {
    return (
      <View style = { s.background }>
        <ScrollView style = { s.scrollview } keyboardShouldPersistTaps = {'always'}>
          <View style = { s.header }>
            <View style = {{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <TouchableOpacity
                onPress = { () => {
                  this.props.navigation.navigate('HirerJobs')
                } }
              >
                <Text style = { s.text(22, 30, 'bold', 'center', color.black) }>←</Text>
              </TouchableOpacity>
              <Text
                style = { s.text(22, 30, 'bold', 'center', color.black) }
              ><Text style = {{color : '#4A90E2'}}>Job</Text>Board</Text>
              <Text>     </Text>
            </View>
          </View>

          <View style = { s.middle_no_align }>
            <View style = { s.flexinputbox }>
              <TextField
                label = 'Job Title'
                value = { this.state.title }
                onChangeText = { title => this.setState({ title }) }
              />
            </View>

            <TextField
              label = 'Job Description'
              value = { this.state.description }
              onChangeText = { description => this.setState({ description }) }
            />

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

            <View style = { s.middleColumn}>
              <View style = {{ ...s.inputbox, borderBottomWidth: 0 }}>
                <Text style = {{ color: 'gray', marginBottom: 10}}>
                  Search Radius
                </Text>

                <Text style = {{ marginBottom: 10}}>
                  { this.state.search_radius } miles
                </Text>

                <Slider
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
                  industry_id: taxonomy.industry_id,
                  industry: taxonomy.industry_id,
                  profession: taxonomy.jobtype_id
                });
              }}
            />

            <SkillsSelector
              skillIds = { this.state.skills }
              onRefresh = { skills => this.setState({ skills })}
            />

            <Text style = {{ color: 'gray', marginTop: 20}}>
              Pay Rate Range
            </Text>

            <View
              style = {{
                marginTop: 10,
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Text>Start from {this.state.hourly_rate[0]} </Text>
              <Text>to {this.state.hourly_rate[1]} $ </Text>
            </View>

            <View
              style = {{
                paddingLeft: 10
              }}
            >
              <MultiSlider
                values = {[this.state.hourly_rate[0], this.state.hourly_rate[1]]}
                min = { 5 }
                max = { 500 }
                isMarkersSeparated
                sliderLength = { s.width * 0.8 }
                onValuesChange = { api.debounce(values => this.setState({
                  hourly_rate: [Math.floor(values[0]), Math.floor(values[1])]
                }), 100)}
              />
            </View>
          </View>
        </ScrollView>

        <View style = { s.footer }>
          <TouchableOpacity
            style = { s.buttonbox(color.blue, color.blue) }
            onPress = { () => {
              this.props.createJob({ ...this.state, zip_code: this.state.address.zip_code }, this.props.access_token, () => {
                this.props.navigation.navigate('HirerJobs');
              });
            }}
          >
            <Text style = { s.text(16, 22, 'normal', 'center', color.white)}> Save Search Criteria </Text>
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
      access_token: state.appState.access_token
    };
  },
  (dispatch) => bindActionCreators(Actions, dispatch)
)(HirerAddSearch);
