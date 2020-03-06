import React from 'react';
import Routes from './src/routes';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized webSocket'
]);

export default function App() {
  return <Routes /> 
}


