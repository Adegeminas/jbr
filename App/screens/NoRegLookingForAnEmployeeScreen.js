import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text, Slider, ScrollView } from 'react-native';
import * as Actions from '../actions';
import { s, color } from '../libs/styles.js';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import * as api from '../libs/api';
import { TextField } from 'react-native-material-textfield';
import LocationSelector from '../components/LocationSelector.js';
import IndustrySelector from '../components/IndustrySelector.js';
import SkillsSelector from '../components/SkillsSelector.js';

class NoRegLookingForAnEmployeeScreen extends React.Component {
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
      profession: '',

      hard_skills: '',
      soft_skills: '',

      skills: [],

      search_radius: 5,
      hourly_rate: [100, 300]
    };
  }

  handleSearchButtonClick() {
    if (this.state.title.length <= 0) {
      return this.props.showError('enter_title');
    }

    if (this.state.description.length <= 0) {
      return this.props.showError('enter_description');
    }

    if (this.state.address.zip_code.length <= 0) {
      return this.props.showError('no-address');
    }

    if (this.state.industry.length <= 0 || this.state.industry.profession <= 0) {
      return this.props.showError('no-industry');
    }

    this.props.noRegHirerSearch({
      title: this.state.title,
      description: this.state.description,
      zip_code: this.state.address.zip_code,
      industry: this.state.industry,
      profession: this.state.profession,
      hard_skills: [], // this.state.hard_skills,
      soft_skills: [], // this.state.soft_skills,
      skills: this.state.skills,
      search_radius: this.state.search_radius,
      hourly_rate: this.state.hourly_rate
    });
  }

  render() {
    console.log(this.state.skills);

    return (
      <View style = { s.background }>
        <ScrollView
          style = { s.scrollview }
          keyboardShouldPersistTaps = 'always'
        >
          <View style = { s.header }>
            <View style = {{ ...s.row, marginLeft: -10 }}>
              <Text
                style = {{ ...s.text(30, 30, 'bold', 'center', color.black)}}
                onPress = { () => this.props.toNoRegSelectRoleScreen() }
              > ← </Text>
              <Text style = { s.text(22, 30, 'bold', 'center', color.black) }><Text style = {{color : color.blue}}>Job</Text>Board</Text>
              <Text style = { s.text(22, 30, 'bold', 'center', color.black) }>     </Text>
            </View>
            <View style = { s.br(10) }/>
            <Text style = { s.text(22, 30, 'normal', 'center', color.black) }>Looking for an employee?</Text>
            <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>Specify the parameters bellow and click on "search"</Text>
          </View>

          <View style = {{ ...s.middle_no_align }}>
            <View style = { s.flexinputbox }>
              <TextField
                label = <Text><Text style = {{ color: 'red'}}>* </Text>Job Title</Text>
                value = { this.state.title }
                onChangeText = { title => this.setState({ title }) }
              />
            </View>

            <TextField
              label = <Text><Text style = {{ color: 'red'}}>* </Text>Job Description</Text>
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

          <TouchableOpacity
            style = { s.buttonbox(color.blue, color.blue) }
            onPress = { () => this.handleSearchButtonClick() }
          >
            <Text style = { s.text(16, 22, 'normal', 'center', color.white) }> Search </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  null,
  (dispatch) => bindActionCreators(Actions, dispatch)
)(NoRegLookingForAnEmployeeScreen);
