'use strict';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  Animated,
  Image
} from 'react-native';
import React, {
  Component
} from 'react';


export default class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      expanded: false,
      animation: new Animated.Value()
    };
  }

  toggle() {

    let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
      finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(
      this.state.animation, {
        toValue: finalValue
      }
    ).start();

  }

  setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  }

  setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  }

  render() {

    return (
      <Animated.View style={[styles.container, {height: this.state.animation}]} >
        <View style= {styles.headerContainer} onLayout={this.setMinHeight.bind(this)}> 
          <TouchableHighlight style={styles.button} onPress={this.toggle.bind(this)} underlayColor={this.props.underlayColor}>
            {this.props.header}
          </TouchableHighlight>
        </View>

        <View style={styles.body} onLayout={this.setMaxHeight.bind(this)}>{this.props.content}</View>
    </Animated.View>
    );
  }

}

var styles = StyleSheet.create({
  container: {},
  headerContainer: {},
  header: {},
  body: {}
});