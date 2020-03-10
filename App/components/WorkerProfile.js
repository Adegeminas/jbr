import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dimensions, TouchableOpacity, View, Text, ScrollView, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import * as Actions from '../actions';
import { s as new_s, color } from '../libs/styles.js';
import * as api from '../libs/api';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import LocationSelector from '../components/LocationSelector.js';
import IndustrySelector from '../components/IndustrySelector.js';
import SkillsSelector from '../components/SkillsSelector.js';
import * as DocumentPicker from 'expo-document-picker';
const calendar = require('../../assets/ProfileScreen/calendar.png');
const male = require('../../assets/ProfileScreen/male.png');
const female = require('../../assets/ProfileScreen/female.png');
const neutral = require('../../assets/ProfileScreen/both.png');
const cancel = require('../../assets/MainMenu/cancel.png');
const plus = require('../../assets/MainMenu/plus.png');
const pdf = require('../../assets/MainMenu/pdf.png');
const edit = require('../../assets/ProfileScreen/edit.png');
const upload = require('../../assets/ProfileScreen/upload.png');
const remove = require('../../assets/ProfileScreen/remove.png');
const avatar = { male, female, neutral }
const { height } = Dimensions.get('screen');

class HirerProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      current_job_title: '',
      current_job_description: '',
      current_job_start: new Date().toDateString(),
      current_job_end: null,

      start_show: false,
      end_show: false,

      selected: false,
      loaded: false,
      fileName: '',

      first_name: this.props.profile.first_name,
      last_name: this.props.profile.last_name,
      phone: this.props.profile.phone,
      address: {
        state: this.props?.profile?.address?.state || '',
        locality: this.props?.profile?.address?.locality || '',
        zip_code: this.props?.profile?.address?.zip_code || ''
      },
      industry: this.props?.profile?.profile?.industry?.id || '',
      industry_id: this.props?.profile?.profile?.industry?.id || '',
      profession: this.props?.profile?.profile?.profession?.id || '',
      avatar: this.props?.profile.profile.avatar,
      hourly_rate: this.props?.profile.profile.hourly_rate,
      experience: this.props?.profile.profile.experience || [],
      skills: this.props?.profile?.profile?.skills?.map(skill => skill.id) || []
    };
  }

  handleGalery = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf'
    });

    if (!result.cancelled) {
      this.pdfSelected(result);
    }
  }

  pdfSelected = async result => {
    const uploadResult = await api.uploadPdf(result, this.props.access_token);

    if (uploadResult.length === 0) {
      this.setState({ loaded: true, pdfSelected: true, fileName: result.name });
      this.props.fileUploaded(result);
    }
  }

  nextAvatar() {
    let nextAvatar = 'male';

    switch (this.state.avatar) {
      case 'male':
        nextAvatar = 'female'
        break;
      case 'female':
        nextAvatar = 'neutral'
        break;
      default:
        nextAvatar = 'male'
        break;
    }

    this.setState({
      avatar: nextAvatar
    })
  }

  static navigationOptions = { drawerLabel: 'Worker Profile Screen' };

  render() {
    return (
      <View
        style = {{
          ...new_s.background
        }}
      >
        { this.state.step === 1 ?
          (<ScrollView style = { new_s.scrollview } keyboardShouldPersistTaps = {'always'}>
            <Text style = {{ ...new_s.text(22, 30, 'bold', 'center', color.black), marginBottom: 20 }}>Account Settings</Text>

            <View
              style = {{
                backgroundColor: color.blue,
                borderWidth: 1,
                borderRadius: 100,
                borderColor: color.white,
                width: 130 * height / 667,
                height: 130 * height / 667,
                alignSelf: 'center'
              }}
            >
              <Image
                style = {{ ...new_s.image(130, 130), resizeMode: 'stretch', alignSelf: 'center' }}
                source = { avatar[this.state.avatar] }
              />
              <TouchableOpacity
                onPress = { () => this.nextAvatar() }
                style = {{
                  position: 'absolute',
                  left: '80%',
                  top: '10%',
                  width: 20 * height / 667,
                  height: 16 * height / 667,
                  backgroundColor: color.white,
                  borderWidth: 1,
                  borderColor: color.white,
                  borderRadius: 100
                }}
                source = { edit }
              >
                <Image
                  style = {{ ...new_s.image(13, 13), resizeMode: 'cover', alignSelf: 'center' }}
                  source = { edit }
                />
              </TouchableOpacity>
            </View>

            <View style = { new_s.br(20) }/>

            <View style = { new_s.row }>
              <View style = {{ flex: 1, marginRight: 10 }}>
                <TextField
                  value = { this.state.first_name }
                  label = 'First Name'
                  onChangeText = { first_name => this.setState({ first_name }) }
                />
              </View>
              <View style = {{ flex: 1 }}>
                <TextField
                  value = { this.state.last_name }
                  label = 'Last Name'
                  onChangeText = { last_name => this.setState({ last_name }) }
                />
              </View>
            </View>


            <TextField
              label = 'Phone Number'
              keyboardType='phone-pad'
              value = { this.state.phone }
              formatText = { text => text.replace(/[^+\d]/g, '') }
              onChangeText = { phone => this.setState({ phone }) }
            />

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

            <IndustrySelector
              jobType = { this.state.profession }
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

            <View style = { new_s.br(10) }/>

            <Text style = { new_s.text(13, 16, 'normal', 'left', color.truegray) }>Latest job position</Text>

            <View style = { new_s.br(10) }/>

            { this.state.experience.map((job, index) => (
              <View
                key = { index }
                style = {{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  borderColor: color.truegray,
                  padding: 7,
                  marginBottom: 10
                }}
              >
                <View>
                  <Text style = { new_s.text(16, 22, 'normal', 'left', color.black) }> { job.title }</Text>
                  <View style = { new_s.row }>
                    <Text style = { new_s.text(14, 18, 'normal', 'left', color.truegray) }> { job.start } -</Text>
                    <Text style = { new_s.text(14, 18, 'normal', 'left', color.truegray) }> { job.end || 'Now' } </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress = { () => this.setState({
                    experience: this.state.experience.filter((j, i) => i !== index)
                  }) }
                >
                  <Image style = { new_s.image(20, 20) } source = { cancel }/>
                </TouchableOpacity>
              </View>
            ))}


            <TouchableOpacity
              style = {{
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
              onPress = { () => this.setState({ step: 2 }) }
            >
              <Image style = { new_s.image(20, 20) } source = { plus }/>
              <Text style = {{ color: color.blue }}> Add Position </Text>
            </TouchableOpacity>

            <View style = { new_s.br(10) } />

            <Text style = { new_s.text(13, 16, 'normal', 'left', color.truegray) }>
              Resume File
            </Text>

            <View>
              <View style = { new_s.row }>
                <View style = {{ flexDirection: 'row' }}>
                  <Image style = { new_s.image(50, 60) } source = { pdf }/>
                  <View style = {{ justifyContent: 'center' }}>
                    <Text> {this.props.pdf?.name || 'Not loaded yet'} </Text>
                    { this.props.pdf && (<Text> {this.props.pdf?.size} bytes</Text>)}
                  </View>
                </View>

                <View style = {{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style = {{ }}
                    onPress = { () => this.handleGalery() }
                  >
                    <Image style = { new_s.image(30, 30) } source = { upload }/>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style = {{ }}
                    onPress = { () => this.props.removePDF() }
                  >
                    <Image style = { new_s.image(30, 30) } source = { remove }/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style = {{ ...new_s.inputbox, borderColor: color.white }}>
              <Text style = {{ color: color.truegray }}>
                Pay Rate Range
              </Text>

              <View style = { new_s.br(10) } />

              <View style = { new_s.row }>
                <Text style = { new_s.text(16, 22, 'normal', 'left', color.black) }> Start from { this.state.hourly_rate[0] } </Text>
                <Text style = { new_s.text(16, 22, 'normal', 'left', color.black) }> to { this.state.hourly_rate[1] } $ </Text>
              </View>


              <MultiSlider
                style = {{ paddingLeft: 30 }}
                values = { this.state.hourly_rate }
                min = { 10 }
                max = { 500 }
                isMarkersSeparated
                sliderLength = { 280 * height / 667 }
                onValuesChange = { api.debounce(values => this.setState({
                  hourly_rate: [Math.floor(values[0]), Math.floor(values[1])]
                }), 100)}
              />
            </View>

            <View style = {{ ...new_s.footer, justifyContent: 'flex-end', width: '100%' }}>
              <TouchableOpacity
                style = {{ ...new_s.buttonbox(color.blue, color.blue), marginBottom: 3 }}
                onPress = { () => this.props.updateProfile({
                  first_name: this.state.first_name,
                  last_name: this.state.last_name,
                  phone: this.state.phone,
                  zip_code: this.state.address.zip_code,
                  industry_id: this.state.industry_id,
                  industry: this.state.industry,
                  profession: this.state.profession,
                  avatar: this.state.avatar,
                  hourly_rate: this.state.hourly_rate,
                  experience: this.state.experience,
                  skills: this.state.skills
                }, this.props.access_token) }
              >
                <Text style = { new_s.text(16, 22, 'bold', 'center', color.white) }> Update Profile </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style = {{ ...new_s.buttonbox(color.white, color.white), marginBottom: 3 }}
                onPress = { () => this.props.logout() }
              >
                <Text style = { new_s.text(16, 22, 'bold', 'center', color.blue) }> Logout </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          ) : (
            <View
              style = {{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                width: '100%'
              }}
            >
              <View style = { new_s.header }>
                <View style = {{ ...new_s.row, marginLeft: -20 }}>
                  <Text
                    style = {{ ...new_s.text(30, 30, 'bold', 'center', color.black)}}
                    onPress = { () => this.setState({ step: 1 }) }
                  > ← </Text>
                  <Text style = { new_s.text(22, 30, 'bold', 'center', color.black) }>
                    <Text style = {{color : color.blue}}>Job</Text>Board</Text>
                  <Text style = { new_s.text(22, 30, 'bold', 'center', color.black) }>     </Text>
                </View>
                <View style = { new_s.br(10) }/>
                <Text style = { new_s.text(22, 30, 'normal', 'center', color.black) }>Add Position</Text>
                <Text style = { new_s.text(16, 22, 'normal', 'center', color.black) }> Lorem ipsum about position adding </Text>
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

                <View style = { new_s.inputbox }>
                  <Text style = {{ color: 'gray'}}>
                    Job Start
                  </Text>
                  <TouchableOpacity
                    style = { new_s.row }
                    onPress = { () => this.setState({ start_show: true }) }
                  >
                    <TextInput
                      style = { new_s.input }
                      placeholder = ''
                      value = { this.state.current_job_start }
                    />
                    <Image
                      style = { new_s.image(20, 20) }
                      source = { calendar }
                    />
                  </TouchableOpacity>
                </View>

                <View style = { new_s.inputbox }>
                  <Text style = {{ color: 'gray'}}>
                    Job End
                  </Text>
                  <TouchableOpacity
                    style = { new_s.row }
                    onPress = { () => this.setState({ end_show: true }) }
                  >
                    <TextInput
                      style = { new_s.input }
                      placeholder = ''
                      value = { this.state.current_job_end }
                    />
                    <Image
                      style = { new_s.image(20, 20) }
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

              <View style = {{ ...new_s.footer, width: '100%', flexDirection: 'row' }}>
                <TouchableOpacity
                  style = {{ ...new_s.buttonbox(color.blue, color.blue), width: '100%' }}
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
                  <Text style = { new_s.text(16, 22, 'bold', 'center', color.white) }> Add </Text>
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
      profile: state.appState.profile,
      pdf: state.appState.pdf
    };
  },
  (dispatch) => bindActionCreators(Actions, dispatch)
)(HirerProfile);
