import React from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import SkillView from './SkillView.js';
import GeneralSelector from './GeneralSelector.js';

class SkillsSelector extends React.Component {
  constructor(props) {
    super(props);

    this.skillIds = this.props.skillIds || [];
    this.skillMap = {};
    this.reversedMap = {};

    this.props.skills.forEach(s => {
      this.skillMap[s.title] = s.id;
      this.reversedMap[s.id] = s.title;
    });


    this.state = {
      selectedSkills: this.skillIds.map(id => this.reversedMap[id])
    };
  }

  handleSelect(selected) {
    this.setState({
      selectedSkills: [...this.state.selectedSkills, selected]
    });

    setTimeout(function () {
      this.props.onRefresh(this.state.selectedSkills.map(name => this.skillMap[name]));
    }.bind(this), 10);
  }

  render() {
    const data = this.props.skills.map(skill => skill.title).filter(skill => !this.state.selectedSkills.some(selected =>
      skill === selected));

    return (
      <View>
        <GeneralSelector
          title = { 'Skills' }
          default = { '' }
          data = { data }
          onSelect = { this.handleSelect.bind(this) }
          flag
          flag2 = { String(Math.random())}
        />
        <View style = {{
          marginTop: 20,
          flex: 1,
          flexDirection: 'row',
          overflow: 'scroll',
          flexWrap:'wrap'
        }}>
          { this.state.selectedSkills.map(skill =>
            (<SkillView
              key = { skill }
              name = { skill }
              onDelete = { skill => {
                this.setState({
                  selectedSkills: this.state.selectedSkills.filter(s => s !== skill)
                });
              } }
            />
            ))}
        </View>
      </View>
    );
  }
}


export default connect(
  (state) => {
    return {
      skills: state.appState.taxonomies?.skills || []
    };
  },
  (dispatch) => bindActionCreators(Actions, dispatch)
)(SkillsSelector);
