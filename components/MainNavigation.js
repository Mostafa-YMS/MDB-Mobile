import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import Detail from '../Screens/Detail';
import Navbar from './Navbar';
import Search from '../Screens/Search';

const Stack = createNativeStackNavigator();
class MainNavigation extends React.PureComponent {
  render() {
    return (
      <>
        <Stack.Navigator headerMode={'screen'}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTransparent: true,
              header: ({navigation}) => (
                <Navbar navigation={navigation} main={true} />
              ),
            }}
          />
          <Stack.Screen
            name="Details"
            component={Detail}
            options={{
              // headerTransparent: true,
              headerStyle: {
                backgroundColor: 'transparent',
              },
              header: ({navigation}) => <Navbar navigation={navigation} />,
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              // headerTransparent: true,
              headerStyle: {
                backgroundColor: 'transparent',
              },
              header: ({navigation}) => <Navbar navigation={navigation} />,
            }}
          />
        </Stack.Navigator>
      </>
    );
  }
}

export default MainNavigation;
