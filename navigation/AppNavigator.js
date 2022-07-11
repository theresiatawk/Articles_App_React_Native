import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthScreen from "../screens/user/AuthScreen";
import ArticlesScreen from "../screens/articles/ArticlesScreen";

const ArticlesNavigator = createStackNavigator({
    Articles: ArticlesScreen
}); 

const AuthNavigator = createStackNavigator({
    User: AuthScreen
}); 

const MainNavigator = createSwitchNavigator({
    Authentication: AuthNavigator,
    Articles: ArticlesNavigator
});

export default createAppContainer(MainNavigator);