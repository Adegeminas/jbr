import React from 'react';
import { View, Text } from 'react-native';
import GeneralSelector from './GeneralSelector.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class IndustrySelector extends React.Component {
  constructor(props) {
    super(props);

    this.required = this.props.required;
    this.mapArray = this.props.industries;
    this.map = {};
    this.industries = [];
    this.jobTypes = [];
    this.reversedMap = {};

    this.industriesMap = {};
    this.jobTypesMap = {};
    this.jobIdsMap = {};

    this.mapArray.forEach(industry => {
      const industryTitle = industry.title;
      const industryJobTypes = industry.professions;

      this.map[industryTitle] = industryJobTypes.map(profession => profession.title);
      this.industries.push(industryTitle);
      this.industriesMap[industryTitle] = industry.id;

      industryJobTypes.forEach(jobType => {
        this.jobTypes.push(jobType.title);
        this.reversedMap[jobType.title] = industryTitle;
        this.jobTypesMap[jobType.title] = jobType.id;
        this.jobIdsMap[jobType.id] = jobType.title;
      });
    });

    this.state = {
      currentJobType: this.jobIdsMap[this.props.jobType] || '',
      currentIndustry: this.reversedMap[this.jobIdsMap[this.props.jobType]] || '',
      currentIndustryJobTypes: this.jobTypes,
      jobTypeNeedUpdate: 1,
      industryNeedUpdate: 1
    }
  }

  onSelectIndustry(selectedIndustry) {
    this.setState({
      currentIndustry: selectedIndustry,
      currentIndustryJobTypes: this.map[selectedIndustry],
      currentJobType: '',
      jobTypeNeedUpdate: String(Math.random())
    });

    const taxonomy = {
      industry_id: this.industriesMap[selectedIndustry],
      jobtype_id: this.jobTypesMap[this.map[selectedIndustry][0]]
    };

    this.props.onSelect(taxonomy);
  }

  onSelectJobType(jobType) {
    const newIndustry = this.reversedMap[jobType];

    this.setState({
      currentIndustry: newIndustry,
      currentJobType: jobType,
      currentIndustryJobTypes: this.map[newIndustry]
    });

    const taxonomy = {
      industry_id: this.industriesMap[this.reversedMap[jobType]],
      jobtype_id: this.jobTypesMap[jobType]
    };

    this.props.onSelect(taxonomy);
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
          title = { this.required ? <Text><Text style = {{ color: 'red'}}>* </Text>Industry</Text> : 'Industry'}
          default = { this.state.currentIndustry }
          data = { this.industries }
          onSelect = { (selected) => this.onSelectIndustry(selected) }
          flag = { this.state.industryNeedUpdate }
          flag2 = { String(Math.random())}
        />
        <GeneralSelector
          title = { this.required ? <Text><Text style = {{ color: 'red'}}>* </Text>Profession</Text> : 'Profession'}
          default = { this.state.currentJobType }
          data = { this.state.currentIndustryJobTypes }
          onSelect = { (selected) => this.onSelectJobType(selected) }
          flag = { this.state.jobTypeNeedUpdate }
          flag2 = { String(Math.random())}
        />
      </View>
    );
  }
}

export default connect(
  (state) => {
    return {
      industries: state.appState.taxonomies?.main || []
    };
  },
  (dispatch) => bindActionCreators(Actions, dispatch)
)(IndustrySelector);
