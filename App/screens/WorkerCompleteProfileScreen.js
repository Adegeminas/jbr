import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dimensions, TouchableOpacity, View,
  Text, ScrollView, TextInput, Image } from 'react-native';
import * as Actions from '../actions';
import * as api from '../libs/api';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { s, color } from '../libs/styles.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextField } from 'react-native-material-textfield';
import LocationSelector from '../components/LocationSelector.js';
import IndustrySelector from '../components/IndustrySelector.js';
import SkillsSelector from '../components/SkillsSelector.js';

const calendar = require('../../assets/ProfileScreen/calendar.png');
const male = require('../../assets/ProfileScreen/male.png');
const female = require('../../assets/ProfileScreen/female.png');
const neutral = require('../../assets/ProfileScreen/both.png');
const cancel = require('../../assets/MainMenu/cancel.png');
const plus = require('../../assets/MainMenu/plus.png');
const { height } = Dimensions.get('screen');

class WorkerCompleteProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      first_name: '',
      last_name: '',
      phone: '',
      address: {
        state: '',
        zip_code: '',
        locality: ''
      },
      skills: [],
      industry: '',
      profession: '',
      avatar: 'male',
      hourly_rate: [150, 300],
      experience: [],
      current_job_title: '',
      current_job_description: '',
      current_job_start: new Date().toDateString(),
      current_job_end: null,
      start_show: false,
      end_show: false
    };
  }

  render() {
    return (
      <View style = { s.background }>
        { this.state.step === 1 ? (
          <ScrollView style = { s.scrollview } keyboardShouldPersistTaps = {'always'}>
            <View style = { s.header }>
              <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>COMPLETE PROFILE</Text>
              <View style = { s.br(10) }/>
              <Text style = { s.text(13, 16, 'normal', 'left', 'gray')}>Select Profile Pic</Text>
              <View style = { s.imagesContainer }>
                <TouchableOpacity
                  style = {{ ...s.roleContainer, backgroundColor: this.state.avatar === 'male' ? '#4A90E2' : '#E4EBF1' }}
                  onPress = { () => {
                    this.setState({ avatar: 'male' })
                  } }
                >
                  <Image
                    style = { s.image(140, 140) }
                    source = { male }
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style = {{ ...s.roleContainer, backgroundColor: this.state.avatar === 'female' ? '#4A90E2' : '#E4EBF1' }}
                  onPress = { () => {
                    this.setState({ avatar: 'female' })
                  } }
                >
                  <Image
                    style = { s.image(140, 140) }
                    source = { female }
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style = {{ ...s.roleContainer, backgroundColor: this.state.avatar === 'neutral' ? '#4A90E2' : '#E4EBF1' }}
                  onPress = { () => {
                    this.setState({ avatar: 'neutral' })
                  } }
                >
                  <Image
                    style = { s.image(140, 140) }
                    source = { neutral }
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style = { s.middle_no_align }>
              <View style = { s.leftrow }>
                <View style = {{ ...s.flexinputbox }}>
                  <TextField
                    label = <Text><Text style = {{ color: 'red'}}>* </Text>First Name</Text>
                    value = { this.state.first_name }
                    onChangeText = { first_name => this.setState({ first_name }) }
                  />
                </View>
                <View style = {{ ...s.flexinputbox, marginLeft: 10 }}>
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
                index = { this.state.address.zip_code || '' }
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
                jobType = { this.state.profession || '' }
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

              <View style = { s.br(10) }/>
              <Text style = { s.text(13, 16, 'normal', 'left', 'gray') }>Latest job position</Text>
              <View style = { s.br(10) }/>

              { this.state.experience.map((job, index) => (
                <View
                  style = {{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    borderColor: 'gray',
                    padding: 7,
                    marginBottom: 10
                  }}
                  key = { index }
                >
                  <View>
                    <Text style = { s.text(16, 22, 'normal', 'left', color.black) }> { job.title }</Text>
                    <View style = { s.row }>
                      <Text style = { s.text(14, 18, 'normal', 'left', 'gray') }> { job.start } -</Text>
                      <Text style = { s.text(14, 18, 'normal', 'left', 'gray') }> { job.end || 'Now' } </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress = { () => this.setState({
                      experience: this.state.experience.filter((j, i) => i !== index)
                    }) }
                  >
                    <Image style = { s.image(20, 20) } source = { cancel }/>
                  </TouchableOpacity>
                </View>
              ))}

              <View style = { s.middleColumn}>
                <TouchableOpacity
                  style = {{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderStyle: 'dashed',
                    borderRadius: 5,
                    borderColor: color.blue,
                    padding: 7,
                    marginBottom: 10
                  }}
                  onPress = { () => this.setState({ step: 2}) }
                >
                  <Image style = { s.image(20, 20) } source = { plus }/>
                  <Text style = {{color: '#4A90E2'}}> Add Position </Text>
                </TouchableOpacity>
              </View>


              <View style = {{ ...s.inputbox, borderColor: color.white }}>
                <Text style = {{ color: 'gray'}}>
                  Pay Rate Range
                </Text>

                <View style = { s.br(10) } />

                <View
                  style = {{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text style = { s.text(16, 22, 'normal', 'left', color.black) }>
                    Start from { this.state.hourly_rate[0] } </Text>
                  <Text style = { s.text(16, 22, 'normal', 'left', color.black) }>
                    to { this.state.hourly_rate[1] } $ </Text>
                </View>

                <View style = {{
                  paddingLeft: 10,
                  paddingRight: 10
                }}>
                  <MultiSlider
                    values = { this.state.hourly_rate }
                    min = { 10 }
                    max = { 500 }
                    isMarkersSeparated
                    sliderLength = { 260 * height / 667 }
                    onValuesChange = { api.debounce(values => this.setState({
                      hourly_rate: [Math.floor(values[0]), Math.floor(values[1])]
                    }), 100)}
                  />
                </View>

              </View>
            </View>

            <View style = { s.footer }>
              <TouchableOpacity
                style = {{ ...s.buttonbox(color.blue, color.blue), marginTop: 0, marginBottom: 0 }}
                onPress = { () => this.props.updateProfile({
                  first_name: this.state.first_name,
                  last_name: this.state.last_name,
                  phone: this.state.phone,
                  zip_code: this.state.address.zip_code,
                  industry_id: this.state.industry,
                  industry: this.state.industry,
                  profession: this.state.profession,
                  avatar: this.state.avatar,
                  hourly_rate: this.state.hourly_rate,
                  experience: this.state.experience,
                  skills: this.state.skills
                }, this.props.access_token) }
              >
                <Text style = {{ color: 'white' }}> Complete </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )


          :


          (
            <View
              style = {{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                width: '100%'
              }}
            >
              <View style = { s.header }>
                <View style = {{ ...s.row, marginLeft: -20 }}>
                  <Text
                    style = {{ ...s.text(30, 30, 'bold', 'center', color.black)}}
                    onPress = { () => this.setState({ step: 1 }) }
                  > ← </Text>
                  <Text style = { s.text(22, 30, 'bold', 'center', color.black) }>
                    <Text style = {{color : color.blue}}>Job</Text>Board</Text>
                  <Text style = { s.text(22, 30, 'bold', 'center', color.black) }>     </Text>
                </View>
                <View style = { s.br(10) }/>
                <Text style = { s.text(22, 30, 'normal', 'center', color.black) }>Add Position</Text>
                <Text style = { s.text(16, 22, 'normal', 'center', color.black) }> Lorem ipsum about position adding </Text>
              </View>

              <View style = {{ flex: 1 }}>
                <TextField
                  value = { this.state.current_job_title }
                  label = 'Job Title'
                  onChangeText = { current_job_title => this.setState({ current_job_title }) }
                />

                <TextField
                  value = { this.state.current_job_description }
                  label = 'Job Description'
                  onChangeText = { current_job_description => this.setState({ current_job_description }) }
                />

                <View style = { s.inputbox }>
                  <Text style = {{ color: 'gray'}}>
                    Job Start
                  </Text>
                  <TouchableOpacity
                    style = { s.row }
                    onPress = { () => this.setState({ start_show: true }) }
                  >
                    <TextInput
                      style = { s.input }
                      placeholder = ''
                      value = { this.state.current_job_start }
                    />
                    <Image
                      style = { s.image(20, 20) }
                      source = { calendar }
                    />
                  </TouchableOpacity>
                </View>

                <View style = { s.inputbox }>
                  <Text style = {{ color: 'gray'}}>
                    Job End
                  </Text>
                  <TouchableOpacity
                    style = { s.row }
                    onPress = { () => this.setState({ end_show: true }) }
                  >
                    <TextInput
                      style = { s.input }
                      placeholder = ''
                      value = { this.state.current_job_end }
                    />
                    <Image
                      style = { s.image(20, 20) }
                      source = { calendar }
                    />
                  </TouchableOpacity>
                </View>

                { this.state.start_show && (<DateTimePicker value = { (new Date()) }
                  onChange = { (event, current_job_start) => {
                    current_job_start = current_job_start || this.state.current_job_start;
                    this.setState({
                      start_show: false,
                      current_job_start: current_job_start?.toDateString() || null
                    });
                  } }
                />)}

                { this.state.end_show && (<DateTimePicker value = { (new Date()) }
                  onChange = { (event, current_job_end) => {
                    current_job_end = current_job_end || this.state.current_job_end;
                    this.setState({
                      end_show: false,
                      current_job_end: current_job_end?.toDateString() || null
                    });
                  } }
                />)}
              </View>

              <View style = { s.footer }>
                <TouchableOpacity
                  style = { s.buttonbox(color.blue, color.blue) }
                  onPress = { () => this.setState({
                    step: 1,
                    current_job_title: '',
                    current_job_description: '',
                    current_job_start: new Date().toDateString(),
                    current_job_end: null,
                    experience: [...this.state.experience, {
                      title: this.state.current_job_title,
                      start: this.state.current_job_start || '01.01.2019',
                      end: this.state.current_job_end || null
                    } ]
                  }) }
                >
                  <Text style = { s.text(16, 22, 'bold', 'center', color.white) }> Add </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
)(WorkerCompleteProfileScreen);
