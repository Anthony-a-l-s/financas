import React from 'react';
import { View, ActivityIndicatorBase } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignIn from '../pages/Signin';
import SignUp from '../pages/SignUp';

const AuthStack = createNativeStackNavigator();


export default function AuthRoutes() {

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name='SignIn'
                component={SignIn}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen
                name='SignUp'
                component={SignUp}
                options={{
                    headerStyle:{
                        backgroundColor: '#3b3dbf',
                        borderBottomWidth: 1,
                        borderBottomColor: '#00b94a'
                    },
                    headerTintColor: '#fff',
                    headerTitle: 'Voltar',
                    headerBackTitleVisible: false,
                }}
            />
        </AuthStack.Navigator>
    );
}