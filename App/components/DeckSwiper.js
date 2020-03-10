import React from 'react';
import { View, Text, TouchableOpacity, Image, Modal, Alert, TouchableHighlight } from 'react-native';
import Swiper from 'react-native-realistic-deck-swiper';
import {s, color} from '../libs/styles.js';
const info = require('../../assets/MainMenu/info.png');
const male = require('../../assets/ProfileScreen/male.png');
const no = require('../../assets/MainMenu/icon_no.png');
const yes = require('../../assets/MainMenu/icon_yes.png');
const maybe = require('../../assets/MainMenu/icon_maybe.png');

class DeckSwiper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      worker: null,
      modalVisible: false,
      reaction: null
    }
  }

  setModalVisible = (visible, reaction) => {
    this.setState({ modalVisible: visible, reaction });
  }

  handleSwipeStart = item => {
    this.setState({
      worker: this.props.workers[item]
    });
  }

  handleSwiped = ({vx, vy}) => {
    if (Math.abs(vx) < Math.abs(vy)) {
      return this.handleMaybe();
    }

    if (vx < 0) {
      return this.handleNo();
    }

    return this.handleYes();
  }

  handleMaybe = () => {
    console.log('Maybe ', this.state.worker);
    this.setModalVisible(true, 'You have marked candidate as possible!');

    setTimeout(function () {
      this.setModalVisible(false);
    }.bind(this), 1000);
  }

  handleYes = () => {
    console.log('Yes', this.state.worker);
    this.setModalVisible(true, 'You have invited candidate!');

    setTimeout(function () {
      this.setModalVisible(false);
    }.bind(this), 1000);
  }

  handleNo = () => {
    console.log('No', this.state.worker);
    this.setModalVisible(true, 'You have abandoned candidate!');

    setTimeout(function () {
      this.setModalVisible(false);
    }.bind(this), 1000);
  }

  renderCard = worker => {
    return (
      <View
        style={{
          width: 300,
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: 20
        }}
      >
        <View style = {{ ...s.row, width: '100%', alignItems: 'flex-start' }}>
          <Text style = { s.text(16, 22, 'bold', 'center', color.black) }>
            { worker.index + '/' + this.props.workers.length }
          </Text>
          <View
            style = {{
              backgroundColor: color.random(),
              borderRadius: 100
            }}
          >
            <Image style = { [s.image(100, 100), { resizeMode: 'stretch' } ] } source = { male }/>
          </View>
          <TouchableOpacity
            onPress = { () => this.props.openCandidateScreen(worker) }
          >
            <Image  style = { s.image(20, 20) } source = { info }/>
          </TouchableOpacity>
        </View>
        <Text style = { s.text(22, 30, 'normal', 'center', color.black) }>{ worker.first_name + ' ' + worker.last_name }</Text>
        <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>{ Math.floor(Math.random() * 20) } miles radius</Text>
        <View
          style = {{
            marginTop: 10,
            marginBottom: 10,
            width: '100%',
            borderBottomWidth: 2,
            borderColor: color.gray
          }}
        />
        <Text style = { s.text(12, 16, 'normal', 'center', color.darkgray) }>Profile last update: 05-06-2019</Text>
        <View style = { s.br(10) }/>
        <Text style = { s.text(12, 16, 'normal', 'center', color.black) }>Pay Rate Range</Text>
        <Text style = { s.text(16, 22, 'normal', 'center', color.black) }>$50 - $1300</Text>
        <View style = { s.br(10) } />
        <View style = { s.smallbuttonbox(color.blue, color.blue) }>
          <Text style = { s.text(14, 18, 'normal', 'center', color.white) }>
            Profile 54% match!
          </Text>
        </View>
      </View>)
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 5 * s.height / 667,
          minHeight: 450 * s.height / 667
        }}
      >

        <Modal
          animationType = 'none'
          transparent
          visible = { this.state.modalVisible }
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: '90%',
              left: '10%',
              height: 40 * s.height / 667,
              width: '80%',
              backgroundColor: 'white',
              borderWidth: 1,
              borderRadius: 50
            }}
          >
            <Text> { this.state.reaction } </Text>
          </View>
        </Modal>

        <Swiper
          cardsData = { this.props.workers.map((worker, index) => ({
            ...worker,
            index: index + 1
          })) }
          rotationMultiplier = { 0 }
          onSwipeStart = { this.handleSwipeStart }
          onSwiped = { this.handleSwiped }
          renderCard = { this.renderCard }
          containerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          style={{
            margin: 20,
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5
          }}
        />
        <View style = {{
          flex: 1,
          backgroundColor: 'white',
          borderWidth: 0.2,
          borderColor: 'gray',
          width: 80,
          height: 80,
          borderRadius: 50,
          position: 'absolute',
          top: '30%',
          left: '-10%',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image resizeMode = { 'stretch' } source = { no }/>
        </View>
        <View style = {{
          flex: 1,
          backgroundColor: 'white',
          borderWidth: 0.2,
          borderColor: 'gray',
          width: 80,
          height: 80,
          borderRadius: 50,
          position: 'absolute',
          top: '30%',
          left: '85%',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image resizeMode = { 'stretch' } source = { yes }/>
        </View>
        <View style = {{
          flex: 1,
          backgroundColor: 'white',
          borderWidth: 0.2,
          borderColor: 'gray',
          width: 80,
          height: 80,
          borderRadius: 50,
          position: 'absolute',
          top: '80%',
          left: '40%',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image resizeMode = { 'stretch' } source = { maybe }/>
        </View>
      </View>
    );
  }
}

export default DeckSwiper;
