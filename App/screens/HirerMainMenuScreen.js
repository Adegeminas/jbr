import React from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, Text, ScrollView, SafeAreaView, View } from 'react-native';
import { createDrawerNavigator, DrawerItems, DrawerActions } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { s, color } from '../libs/styles';

import HirerProfile from '../components/HirerProfile.js';
import HirerJobs from '../components/HirerJobs.js';
import HirerNotifications from '../components/HirerNotifications.js';
import HirerAddSearch from '../components/HirerAddSearch.js';
import HirerOneJob from '../components/HirerOneJob.js';
import HirerCandidate from '../components/HirerCandidate.js';
import HirerLogout from '../components/HirerLogout.js';

const DrawerWithLogoutButton = ({ items, ...props }) => (
  <ScrollView style = {{ paddingTop: s.topPadding}}>
    <TouchableOpacity style = { styles.logout }
      onPress = { () => {
        props.navigation.dispatch(DrawerActions.toggleDrawer())
      } }
    >
      <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', margin: 0 }}>
        <Text
          style = { s.text(22, 30, 'bold', 'center', color.black) }
        ><Text style = {{color : '#4A90E2'}}>  x       Job</Text>Board</Text>
      </View>
    </TouchableOpacity>

    <SafeAreaView style = { styles.container }>
      <DrawerItems
        { ...props }
        items = { items.filter(item =>
          (item !== 'HirerAddSearch') &&
          (item !== 'HirerOneJob') &&
          (item !== 'HirerCandidate')) }
      />
    </SafeAreaView>


  </ScrollView>
);

// <TouchableOpacity style = { styles.logout }
//   onPress = { () => {
//     store.dispatch(Actions.logout());
//   } }
// >
//   <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', margin: 0, paddingLeft: 0 }}>
//     <Image style = {{ ...s.image(30, 30) }} source = { logout_icon }/>
//     <Text style = { {fontSize: 14, fontWeight: 'bold', marginLeft: 18 * s.height / 667 } }> Logout </Text>
//   </View>
// </TouchableOpacity>

const { height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 18 * height / 667
  },
  logout: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10 * height / 667,
    marginTop: 8 * height / 667
  }
});

const navigator = createDrawerNavigator({
  HirerProfile,
  HirerJobs,
  HirerOneJob,
  HirerAddSearch,
  HirerNotifications,
  HirerCandidate,
  HirerLogout
}, {
  contentComponent: DrawerWithLogoutButton
});

export default createAppContainer(navigator);
