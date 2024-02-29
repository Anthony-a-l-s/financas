import React,{useState} from 'react';

import { Background, Input, SubmitButton, SubmitText } from './styles'
import { SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Header from '../../components/Header'


export default function New() {
    const [labelInput, setLabelInput] = useState('');
    const [valueInput, setValuelInput] = useState('');
    const [type, setType] = useState('');
    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <Background>
                <Header title='Registrando' />

                <SafeAreaView style={{ marginTop: 14, alignItems: 'center' }}>
                    <Input
                        placeholder='Descrição desse registro'
                        value={labelInput}
                        onChangeText={(text)=>setLabelInput(text)}
                    />
                    <Input
                        placeholder='Valor desejado'
                        keyboardType='numeric'
                        value={valueInput}
                        onChangeText={(text)=>setValuelInput(text)}
                    />


                    <SubmitButton>
                        <SubmitText>Registrar</SubmitText>
                    </SubmitButton>
                </SafeAreaView>

            </Background>
        </TouchableWithoutFeedback>
    );
}