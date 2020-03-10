import React from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import * as Actions from '../actions';
import store from '../store.js';

import WorkerProfile from '../components/WorkerProfile.js';
import WorkerJob from '../components/WorkerJob.js';
import WorkerOfferAccept from '../components/WorkerOfferAccept.js';

const DrawerWithLogoutButton = ({ items, ...props }) => (
  <ScrollView>
    <SafeAreaView style = { styles.container }>
      <DrawerItems
        { ...props }
        items = { items }
      />
    </SafeAreaView>

    <TouchableOpacity style = { styles.logout }
      onPress = { () => {
        store.dispatch(Actions.logout());
      } }
    >
      <Text> Logout </Text>
    </TouchableOpacity>
  </ScrollView>
);

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
  WorkerProfile,
  WorkerJob,
  WorkerOfferAccept
}, {
  contentComponent: DrawerWithLogoutButton
});

export default createAppContainer(navigator);
