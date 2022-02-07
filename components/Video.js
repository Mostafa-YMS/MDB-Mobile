import React from 'react';
import VideoPlayer from 'react-native-video-controls';

export const Video = ({showVideo, navigation}) => {
  return (
    <VideoPlayer
      source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
      onBack={() => {
        showVideo();
      }}
    />
  );
};
