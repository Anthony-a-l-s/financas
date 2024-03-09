import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header'
import HistoricoList from '../../components/HistoricoList';

import {
    Background,
    ListBalance,
    Area,
    Title,
    List
} from './styles';

import api from '../../services/api'
import { format } from 'date-fns'
import { useIsFocused } from '@react-navigation/native';
import BalanceItem from '../../components/BalanceItem';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function Home() {

    const isFocused = useIsFocused();
    const [listBalance, setListBalance] = useState([]);
    const [dateMovements, setDatemovements] = useState(new Date())
    const [movements, setMovements] = useState([])



    useEffect(() => {
        let isActive = true;

        async function getMovements() {

            let dateFormated = format(dateMovements, 'dd/MM/yyyy')

            const receives = await api.get('/receives',{
                params: {
                    date: dateFormated
                }
            })
            const balance = await api.get('/balance', {
                params: {
                    date: dateFormated
                }
            })
            if (isActive) {
                setListBalance(balance.data);
                setMovements(receives.data);
            }
        }

        getMovements();

        return () => isActive = false


    }, [isFocused, dateMovements])

    async function hadleDelete(id){
        try{
            api.delete('/receives/delete',{
                params:{
                    item_id: id
                }
            })
            setDatemovements(new Date());
        }catch(err){
            console.log(err)
        }
    }

    return (
        <Background>
            <Header title='Minhas movimentações' />

            <ListBalance
                data={listBalance}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.tag}
                renderItem={({ item }) => (<BalanceItem data={item} />)}
            />

            <Area>
                <TouchableOpacity>
                    <Icon name='event' color="#121212" size={30} />
                </TouchableOpacity>
                <Title>Ultimas movimentações</Title>
            </Area>

            <List
                data={movements}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <HistoricoList data={item} deleteItem={hadleDelete}/>}
                contentContainerStyle={{paddingBottom: 20}}
            />

        </Background>

    )
}