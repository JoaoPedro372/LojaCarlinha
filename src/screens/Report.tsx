import { Text, VStack, HStack, Button, ButtonText, Heading } from "@gluestack-ui/themed";
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';


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
                    
                    <HStack justifyContent="space-between">
                        <Text>Torta de frango</Text>
                        <Text>3</Text>
                        <Text>R$30,00</Text>
                    </HStack>
                </VStack>
            </HStack>

            <HStack  justifyContent="space-between" gap={"$10"} p={"$4"} pt={'$0'}>
                <Button w={"$25%"} h={"$16"} bg="$success500" pl={0} pr={0}>
                    <ButtonText fontSize={"$sm"} >DINHEIRO</ButtonText>
                    <ButtonText fontSize={"$sm"} >10</ButtonText>
                </Button>

                <Button w={"$25%"} h={"$16"} bg="$primary500" pl={0} pr={0}>
                    <ButtonText fontSize={"$sm"}>PIX</ButtonText>
                </Button>

                <Button w={"$25%"} h={"$16"} bg="$black" pl={0} pr={0}>
                    <ButtonText fontSize={"$sm"}>CARTÃO</ButtonText>
                </Button>
            </HStack>
        </VStack>
    );
}
