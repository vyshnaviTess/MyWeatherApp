// __mocks__/react-native-gesture-handler.js
import React, {forwardRef} from 'react';

export const GestureHandlerRootView = ({children}) => <>{children}</>;

export const PanGestureHandler = forwardRef(({children}, ref) => {
  return <div ref={ref}>{children}</div>;
});

export const State = {};

export const TouchableOpacity = 'TouchableOpacity';

export default {};
