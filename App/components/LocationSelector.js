import React from 'react';
import { View, Text } from 'react-native';
import GeneralSelector from './GeneralSelector.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class LocationSelector extends React.Component {
  constructor(props) {
    super(props);

    this.required = this.props.required;
    this.mapArray = this.props.places;
    this.map = {};
    this.cities = [];
    this.indexes = [];
    this.reversedMap = {};

    this.mapArray.forEach(city => {
      const cityName = Object.keys(city)[0];
      const cityIndexes = city[cityName];

      this.map[cityName] = cityIndexes;
      this.cities.push(cityName);

      cityIndexes.forEach(index => {
        this.indexes.push(index);
        this.reversedMap[index] = cityName;
      });
    });

    this.state = {
      currentIndex: this.props.index || '',
      currentCity: this.reversedMap[this.props.index] || '',
      currentCityIndexes: this.indexes,
      indexNeedUpdate: 1,
      cityNeedUpdate: 1
    }
  }

  onSelectLocation(selectedCity) {
    this.setState({
      currentCity: selectedCity,
      currentCityIndexes: this.map[selectedCity],
      currentIndex: '',
      indexNeedUpdate: String(Math.random())
    });

    const address = {
      state: selectedCity.split(',')[1].split(' ')[1],
      zip_code: this.map[selectedCity][0],
      locality: selectedCity.split(',')[0]
    };

    this.props.onSelect(address);
  }

  onSelectZip(index) {
    const newCity = this.reversedMap[index];

    this.setState({
      currentCity: newCity,
      currentIndex: index,
      currentCityIndexes: this.map[newCity]
    });

    const address = {
      state: this.reversedMap[index].split(',')[1].split(' ')[1],
      zip_code: index,
      locality: this.reversedMap[index].split(',')[0]
    };

    this.props.onSelect(address);
  }

  render() {
    return (
      <View
        style = {{
          flexDirection: 'row',
          width: '100%'
        }}
      >
        <GeneralSelector
          title = { this.required ? <Text><Text style = {{ color: 'red'}}>* </Text>Location</Text> : 'Location'}
          default = { this.state.currentCity }
          data = { this.cities }
          onSelect = { (selected) => this.onSelectLocation(selected) }
          flag = { this.state.cityNeedUpdate }
          flag2 = { String(Math.random())}
        />
        <GeneralSelector
          title = { this.required ? <Text><Text style = {{ color: 'red'}}>* </Text>Zip Code</Text> : 'Zip Code'}
          default = { this.state.currentIndex }
          data = { this.state.currentCityIndexes }
          onSelect = { (selected) => this.onSelectZip(selected) }
          flag = { this.state.indexNeedUpdate }
          flag2 = { String(Math.random())}
        />
      </View>
    );
  }
}

export default connect(
  (state) => {
    return {
      places: state.appState.places
    };
  },
  (dispatch) => bindActionCreators(Actions, dispatch)
)(LocationSelector);
