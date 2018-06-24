'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroImage,
  ViroConstants,
  ViroBox,
  Viro3DObject,
  ViroMaterials,
  ViroARPlaneSelector,
  ViroAmbientLight,
  ViroNode,
  ViroAnimations,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroText 
          text={this.state.text} 
          scale={[.5, .5, .5]} 
          position={[0, 0, -1]} 
          style={styles.helloWorldTextStyle} 
        />

        <ViroImage 
          scale={[.5, .5, .5]} 
          position={[0, 0.5, -1]}
          height={0.5}
          width={0.5}
          source={require('./res/img/pororo.jpg')}
        />
        
        <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} animation={{name: "rotate", run: true, loop: true}}/>

        <ViroNode position={[0, -1, 0]} dragType="FixedDistance" onDrag={()=>{}} >
          <Viro3DObject
            source={require('./res/3d/t90a/t-90a(Elements_of_war).obj')}
            position={[0, -2.0, -2]}
            scale={[.5, .5, .5]}
            type="OBJ" />
        </ViroNode> 

        <ViroNode position={[0,0,-1]} dragType="FixedToWorld" onDrag={()=>{}} >
          <ViroBox
            scale={[.05, .05, .05]} 
            position={[0, 0, -0.3]}
            rotation={[0, 45, 0]}
            height={2}
            length={2}
            width={2}
            materials={["grid"]}
          />
        </ViroNode>

      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/img/pororo.jpg'),
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250, //.25 seconds
  },
});


module.exports = HelloWorldSceneAR;
