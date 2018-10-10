import React from 'react';
import PropTypes from 'prop-types';
import {Button, NavigatorIOS, Text, View, StyleSheet,ScrollView} from 'react-native';

export default class NavigatorIOSApp extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MyScene,
          title: 'Welcome to the experiment',
          passProps: {index: 1},
        }}
        style={{flex: 1}}
      />
    );
  }
}

class MyScene extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    navigator: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this._onForward = this._onForward.bind(this);
  }

  _onForward() {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: MyScene,
      title: 'Question ' + (nextIndex - 1),
      passProps: {index: nextIndex},
    });
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.test}>
        <Button
          onPress={this._onForward}
          title="Continue"
          color="#841584"
        />
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    marginTop: 50,
  },
});
