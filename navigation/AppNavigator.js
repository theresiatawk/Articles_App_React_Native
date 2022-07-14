import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import StartupScreen from "../screens/StartupScreen";
import AuthScreen from "../screens/user/AuthScreen";
import ArticlesScreen from "../screens/articles/ArticlesScreen";
import { Platform } from "react-native";
import Colors from "../constants/Colors";

const ArticlesNavigator = createStackNavigator(
  {
    Articles: ArticlesScreen,
  },
  {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
        
    }
  }
);

const AuthNavigator = createStackNavigator({
  User: AuthScreen,
}, 
{
    defaultNavigationOptions: {
        headerTitle: "Authentication",
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
        
    }
  });

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Authentication: AuthNavigator,
  Articles: ArticlesNavigator,
});

export default createAppContainer(MainNavigator);
