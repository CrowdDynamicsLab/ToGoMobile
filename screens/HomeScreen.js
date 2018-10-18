import React from 'react';
import PropTypes from 'prop-types';
import {Button, NavigatorIOS, Text,TouchableHighlight, View, StyleSheet,ScrollView} from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import Svg,{
    Circle,
    Ellipse,
    G,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';

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
    const data = [ 50, 10]

    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

    const pieData = data
        .filter(value => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(),
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
        }))
    return (

      <ScrollView>
        <Text style={{textAlign: 'center',  fontSize: 18}} > Choose the best answer </Text>
        <View style={styles.test}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <PieChart
                style={{flex: 1, height: 150}}
                data={ pieData }
            />
            <PieChart
                style={{flex: 1, height: 150}}
                data={ pieData }
            />
          </View>
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

class PieChartExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))

        return (
            <PieChart
                style={ { height: 200 } }
                data={ pieData }
            />
        )
    }

}

const styles = StyleSheet.create({
  test: {
    marginTop: 50,
  },
});
