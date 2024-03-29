import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(()=>{

        async function loadingStorage(){
            
            const storageUser = await AsyncStorage.getItem('@finToken');
            console.log(storageUser);
            if(storageUser){
                const response = await api.get('/me', {
                    headers:{
                        'Authorization': `Bearer ${storageUser}`
                    }
                })
                .catch(()=> {
                    console.log('deu ruim')
                    setUser(null);
                })
                api.defaults.headers['Authorization'] = `Bearer ${storageUser}`;
                setUser(response.data);
                setLoading(false);

            }
            setLoading(false);
            
        }

        loadingStorage();
    },[])


    async function signUp(email, password, nome) {
        setLoadingAuth(true);
        try {
            const response = await api.post('/users', {
                name: nome,
                password: password,
                email: email,
            })
            setLoadingAuth(false);
            navigation.goBack();


        } catch (err) {
            console.log('ERRO AO CADASTRAR', err)
            setLoadingAuth(false);
        }
    }

    async function signIin(email, password) {
        setLoadingAuth(true);

        try {
            const response = await api.post('/login', {
                email: email,
                password: password
            })

            const { id, name, token } = response.data;

            const data = {
                id,
                name,
                token,
                email,
            };

            await AsyncStorage.setItem('@finToken', token)

            api.defaults.headers['Authorization'] = `Bearer ${token}`


            setUser({
                id,
                name,
                email,
            })

            setLoadingAuth(false)

        } catch (err) {
            console.log('ERRO AO LOGAR ', err)
            setLoadingAuth(false)
        }
    }

    async function signOut(){
        await AsyncStorage.clear()
        .then(()=>{
            setUser(null);
        })
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, signUp, signIin, signOut, loadingAuth, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;