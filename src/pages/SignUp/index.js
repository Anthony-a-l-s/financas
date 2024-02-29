import React, { useContext, useState } from 'react';
import { Platform, ActivityIndicator } from 'react-native';

import {
    Background,
    Container,
    AreaInput,
    Input,
    SumbitButton,
    SubmitText
} from '../Signin/styles';

import { AuthContext } from '../../contexts/auth';



export default function SignUp() {

    const { signUp, loadingAuth } = useContext(AuthContext)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSignUp() {
        if(nome === '' || email === '' || password === '') return;
        signUp(email, password, nome);
    }
    return (
        <Background
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled
        >
            <Container>

                <AreaInput>
                    <Input
                        placeholder='Nome'
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder='Seu email '
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder='Sua senha'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </AreaInput>

                <SumbitButton onPress={handleSignUp}>
                    {loadingAuth ? (
                        <ActivityIndicator size={20} color='#fff' />
                    ) : (
                        <SubmitText>Cadastrar</SubmitText>
                    )}
                </SumbitButton>

            </Container>
        </Background>
    );
}