import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import * as Actions from '../actions';
import * as api from '../libs/api.js';
import { s, color } from '../libs/styles.js';
import * as DocumentPicker from 'expo-document-picker';

const image = require('../../assets/ResumeScreen/0.png');
const image1 = require('../../assets/ResumeScreen/1.png');
const image2 = require('../../assets/ResumeScreen/2.png');

class WorkerUploadResumeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      loaded: false,
      fileName: ''
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
    const upload = await api.uploadPdf(result, this.props.access_token);

    if (upload.length === 0) {
      this.setState({ loaded: true, pdfSelected: true, fileName: result.name });
      this.props.fileUploaded(result);
    }
  }

  render() {
    return (
      <View style = {{ ...s.background, marginTop: 10 }}>
        <View style = { s.header }>
          <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>COMPLETE PROFILE</Text>
          <View style = { s.br(10) }/>
          <Text style = { s.text(22, 30, 'bold', 'center', color.black) }>Resume</Text>
          <View style = { s.br(10) }/>
          <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>
            This will speed up your job search and filling out a profile form.
          </Text>
          <View style = { s.br(10) }/>
        </View>

        <View
          style = {{
            ...s.middle,
            borderWidth: 3,
            borderRadius: 5,
            borderStyle: 'dashed',
            borderColor: color.gray
          }}
        >
          <TouchableOpacity
            onPress = { () => this.handleGalery() }
          >
            <View style = {{ marginTop: 20 }}>
              <Image
                resizeMode = 'center'
                style = { s.image(230, 230) }
                source = {
                  this.state.loaded ? image2 : this.state.pdfSelected ? image1 : image
                }
              />
            </View>
            <View style = {{ marginTop: 20 }}>
              <Text style = { s.text(22, 30, 'bold', 'center', color.black) }> { this.state.loaded ?
                this.state.fileName :
                this.state.pdfSelected ?
                  '' :
                  'Upload Resume (*.pdf)' }
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style = {{ ...s.footer, marginTop: 20, marginBottom: 0 }}>
          <TouchableOpacity
            style = { this.state.loaded ? s.buttonbox(color.blue, color.white) : s.buttonbox(color.gray, color.gray) }
            onPress = { () => this.state.loaded ? this.props.toWorkerCompleteProfileScreen() : null }
          >
            <Text style = { s.text(22, 30, 'bold', 'center', color.white) }> Start Analizing </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style = { s.buttonbox(color.white, color.white) }
            onPress = { () => this.props.toWorkerCompleteProfileScreen() }
          >
            <Text style = { s.text(22, 30, 'bold', 'center', color.blue)}> Skip </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(
  state => {
    return {
      access_token: state.appState.access_token,
      pdf: state.appState.pdf
    };
  },
  (dispatch) => bindActionCreators(Actions, dispatch)
)(WorkerUploadResumeScreen);
