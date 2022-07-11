import React from 'react';
import {View, Text, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';

const AuthScreen = props => {
    return (<View style = {styles.screen}><Text>Authentication Screen</Text></View>);
}

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    }
});

export default AuthScreen;