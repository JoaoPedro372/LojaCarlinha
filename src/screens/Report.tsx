import { Text, VStack, HStack, Button, ButtonText, Heading, View, FlatList } from "@gluestack-ui/themed";
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LabelProduct } from "../components/LabelProduct";
import { LabelResume } from "../components/LabelResume";

const Test = [
    {product: 'torta de frango', qtde: '3', price: '10,00'},
    {product: 'pastel', qtde: '2', price: '12,00'},
    {product: 'torta de frango', qtde: '3', price: '10,00'},
    {product: 'coxinha', qtde: '2', price: '16,00'},
    {product: 'empada', qtde: '3', price: '10,00'},
    {product: 'coca cola', qtde: '2', price: '12,00'},
    {product: 'pão de batata', qtde: '3', price: '10,00'},
    {product: 'pizza', qtde: '2', price: '12,00'},
    {product: 'bolo de pote', qtde: '2', price: '12,00'},
    {product: 'torta de frango', qtde: '3', price: '10,00'},
    {product: 'empada', qtde: '2', price: '12,00'},
    {product: 'torta de frango', qtde: '3', price: '10,00'},
    {product: 'coxinha', qtde: '2', price: '10,00'},
  ]


export function Report() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const onChangeStartDate = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStartPicker(false);
        setStartDate(currentDate);
    };

    const onChangeEndDate = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndPicker(false);
        setEndDate(currentDate);
    };

    const showStartDatePicker = () => {
        setShowStartPicker(true);
    };

    const showEndDatePicker = () => {
        setShowEndPicker(true);
    };


    return (
        <VStack flex={1} alignItems="center" bg="$warmGray700" pt={'$10'}>
            <HStack>
                <Heading color="white">Relatório</Heading>
            </HStack>
            <Button onPress={showStartDatePicker} w={'$60%'} bg={'$warmGray900'} mb={'$2'} mt={'$5'}>
                <ButtonText color="white">Escolher Data Inicial</ButtonText>
            </Button>
            {showStartPicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={onChangeStartDate}
                />
            )}

            <Text mb={'$10'} color="white" fontWeight='bold' fontSize={'$sm'}>
                Data Inicial: {startDate.toLocaleDateString()}
            </Text>

            <Button onPress={showEndDatePicker} w={'$60%'} bg={'$warmGray900'} mb={'$2'}>
                <ButtonText color="white">Escolher Data Final</ButtonText>
            </Button>
            {showEndPicker && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={onChangeEndDate}
                />
            )}

            <Text color="white" fontWeight={'bold'} fontSize={'$sm'} mb={'$5'}>
                Data Final: {endDate.toLocaleDateString()}
            </Text>

            <HStack flex={1} w={"$full"} h={"100%"} p={"$2"} pr={"$2"} >
                <VStack bg="$white" w={"100%"} h={"$90%"} rounded={"$2xl"} mr={"$2"} p={"$2"}>
                    <HStack justifyContent="space-between" mb={"$2"}>
                        <Heading>
                            PRODUTO
                        </Heading>

                        <Heading>
                            QUANTIDADE
                        </Heading>

                        <Heading>
                            VALOR
                        </Heading>
                    </HStack>
                    
                    <FlatList 
                            data={Test}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <LabelResume product={item.product} qtde={item.qtde} price={item.price}/>}
                    />

                    <HStack justifyContent="space-between" alignItems="flex-end" mt={"auto"} pt={"$2"} borderTopWidth={1}>
                        <Heading>Total</Heading>
                        <Text>R$128,00</Text>
                    </HStack>

                </VStack>
            </HStack>

            <HStack  justifyContent="space-between" gap={"$20"} p={"$4"} pt={'$0'}>
                <View alignItems="center">
                    <Heading color="white">
                        Dinheiro
                    </Heading>
                    
                    <View h={1} w={"100%"} bgColor="white" my={10} />

                    <Text color="white">R$10</Text>
                </View>

                <View alignItems="center">
                    <Heading color="white">
                        Pix
                    </Heading>

                    <View h={1} w={"100%"} bgColor="white" my={10} />
                    
                    <Text color="white">R$20</Text>
                </View>

                <View alignItems="center">
                    <Heading color="white">
                        Cartão
                    </Heading>

                    <View h={1} w={"100%"} bgColor="white" my={10} />
                    
                    <Text color="white">R$26</Text>
                </View>
            </HStack>
        </VStack>
    );
}
