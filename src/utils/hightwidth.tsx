import { Dimensions, ScaledSize } from 'react-native';

let window: ScaledSize = Dimensions.get('window');

export let SCREEN_WIDTH = window.width;
export let SCREEN_HEIGHT = window.height;

//  Listen for fold / rotate / resize
Dimensions.addEventListener('change', ({ window: newWindow }) => {
  SCREEN_WIDTH = newWindow.width;
  SCREEN_HEIGHT = newWindow.height;
});
