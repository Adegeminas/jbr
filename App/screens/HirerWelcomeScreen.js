import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dimensions, TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native';
import * as Actions from '../actions';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const SCREEN_WIDTH = Dimensions.get('window').width;

const image0 = require('../../assets/WelcomeScreen/0.png');
const image1 = require('../../assets/WelcomeScreen/1.png');
const image2 = require('../../assets/WelcomeScreen/2.png');

const Screen = (props) => (
  <View style={ s.screen }>
    <View style = { s.imagebox }>
      <Image resizeMode = 'center' style = { s.image } source = { props.image }/>
    </View>

    <View style = { s.textbox }>
      <Text style = { s.blueText }> { props.blueText } </Text>
    </View>

    <View style = { s.textbox }>
      <Text style = { s.blackText }> { props.blackText } </Text>
    </View>
  </View>
);

class HirerWelcomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab : 0
    }
  }

  SCREENS = [
    <Screen
      blueText = { 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' }
      blackText = { 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.' }
      image = { image0 }
    />,
    <Screen
      blueText = { 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' }
      blackText = { 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.' }
      image = { image1 }
    />,
    <Screen
      blueText = { 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' }
      blackText = { 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.' }
      image = { image2 }
    />
  ];


  render() {
    return (
      <View style={s.container}>
        <Carousel
          ref={ ref => this.carouselRef = ref }
          data={ this.SCREENS }
          renderItem={ ({ item }) => item }
          onSnapToItem={ i => this.setState({ activeTab : i }) }
          sliderWidth={ SCREEN_WIDTH }
          itemWidth={ SCREEN_WIDTH }
          slideStyle={{ width : SCREEN_WIDTH }}
          inactiveSlideOpacity={ 1 }
          inactiveSlideScale={ 1 }
        />

        <View
          style={ s.tabBar }
        >
          <View style = { s.bottomView }>
            <Pagination
              dotsLength={ this.SCREENS.length }
              dotStyle={s.ww}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              activeDotIndex={ this.state.activeTab }
            />
          </View>

          <View style = { s.bottomView }>
            <TouchableOpacity
              onPress = { () => this.props.toStart('hirer') }
            >
              <Text style = {{ ...s.blueText, fontWeight: 'normal' }}>
                { this.state.activeTab === 2 ? 'Got It!' : 'Skip' }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const { height } = Dimensions.get('screen');

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 15 * height / 667
  },

  textbox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15 * height / 667
  },

  blueText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4A90E2',
    fontSize: 22 * height / 667,
    lineHeight: 30 * height / 667
  },

  blackText: {
    textAlign: 'center',
    fontSize: 16 * height / 667,
    lineHeight: 22 * height / 667
  },

  imagebox: {
    alignItems: 'center'
  },

  image: {
    width: 300 * height / 667,
    height: 306 * height / 667
  },

  ww:{
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: '#4A90E2'
  },
  container: {
    flex: 1,
    padding: 0,
    margin: 0
  },
  tabBar : {
    position : 'absolute',
    right : 0,
    bottom : 0,
    left : 0,
    borderTopWidth : 1,
    borderColor : '#4A90E2',
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  bottomView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabsContainer : {
    flexDirection : 'row',
    height : 50,
    paddingTop : 0,
    paddingBottom : 0
  }
});

export default connect(
  null,
  (dispatch) => bindActionCreators(Actions, dispatch)
)(HirerWelcomeScreen);
