import React, { useContext } from 'react';
import { View } from 'react-native';
import { } from './styles'
import {
    Container,
    Message,
    Name,
    NewLink,
    NewText,
    LogoutButton,
    LogoutText
} from './styles';

import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth'
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
    const navigation = useNavigation();
    const { user, signOut } = useContext(AuthContext);
    return (
        <Container>
            <Header title='Meu perfil' />

            <Message>Hey, bem vindo de volta</Message>

            <Name numberOfLines={1}>
                {user && user.name}
            </Name>

            <NewLink onPress={()=> navigation.navigate('Registrar')}>
                <NewText>Fazer registro</NewText>
            </NewLink>

            <LogoutButton onPress={()=> signOut()}>
                <LogoutText>Sair</LogoutText>
            </LogoutButton>
        </Container>
    );
}