import { Text, VStack, HStack, Button, ButtonText, Heading, FlatList, View } from "@gluestack-ui/themed";
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { LabelResumeReport } from "../components/LabelResumeReport";

// Função para ajustar a data para o fuso horário local
const adjustToLocalTimezone = (date) => {
    const localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
    return localDate;
};

// Ajuste de datas para início e fim do dia
const getStartOfDay = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(0, 0, 0, 0); // 00:00:00 do dia
    return adjustedDate;
};

const getEndOfDay = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(23, 59, 59, 999); // 23:59:59 do dia
    return adjustedDate;
};

export function Report() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [salesData, setSalesData] = useState([]);
    const [total, setTotal] = useState(0);
    const [paymentTotals, setPaymentTotals] = useState({ cash: "0.00", pix: "0.00", card: "0.00" });

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

    const showStartDatePicker = () => setShowStartPicker(true);
    const showEndDatePicker = () => setShowEndPicker(true);

    // Função para buscar os dados de vendas
    const fetchSalesData = async () => {
        try {
            const localStartDate = getStartOfDay(startDate);
            const localEndDate = getEndOfDay(endDate);

            const response = await axios.get('http://192.168.15.4:5000/vendas', {
                params: {
                    startDate: localStartDate.toISOString(),
                    endDate: localEndDate.toISOString(),
                },
            });

            filterSalesByDate(response.data); // Filtra os dados com base nas datas
        } catch (error) {
            console.error("Erro ao buscar dados de vendas:", error);
        }
    };

    // Função para filtrar os dados de vendas dentro do intervalo de datas selecionado
    const filterSalesByDate = (data) => {
        const localStartDate = getStartOfDay(startDate);
        const localEndDate = getEndOfDay(endDate);

        const filtered = data.filter(item => {
            const itemDate = new Date(item.dateTime);
            return itemDate >= localStartDate && itemDate <= localEndDate;
        });

        setSalesData(filtered);
        calculateTotal(filtered); // Atualiza o total geral
        calculatePaymentTotals(filtered); // Calcula os totais por forma de pagamento
    };

    // Função para calcular o total das vendas
    const calculateTotal = (data) => {
        const totalAmount = data.reduce((acc, item) => {
            const amountPaid = item.amountPaid || 0;
            return acc + amountPaid;
        }, 0);

        setTotal(totalAmount.toFixed(2));
    };

    // Função para calcular os totais por forma de pagamento
    const calculatePaymentTotals = (data) => {
        const totals = data.reduce(
            (acc, item) => {
                const amountPaid = item.amountPaid || 0;
                switch (item.paymentType) {
                    case "Dinheiro":
                        acc.cash += amountPaid;
                        break;
                    case "Pix":
                        acc.pix += amountPaid;
                        break;
                    case "Cartão":
                        acc.card += amountPaid;
                        break;
                    default:
                        break;
                }
                return acc;
            },
            { cash: 0, pix: 0, card: 0 }
        );

        setPaymentTotals({
            cash: totals.cash.toFixed(2),
            pix: totals.pix.toFixed(2),
            card: totals.card.toFixed(2),
        });
    };

    useEffect(() => {
        fetchSalesData();
    }, [startDate, endDate]);

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

            <HStack flex={1} w={"$full"} h={"100%"} p={"$2"} pr={"$2"}>
                <VStack bg="$white" w={"100%"} h={"$90%"} rounded={"$2xl"} mr={"$2"} p={"$2"}>
                    <HStack justifyContent="space-between" mb={"$2"}>
                        <Heading>PRODUTO</Heading>
                        <Heading>QUANTIDADE</Heading>
                        <Heading>VALOR</Heading>
                    </HStack>

                    <FlatList
                        data={salesData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <LabelResumeReport
                                product={item.productName || item.product}
                                qtde={item.qtde}
                                amountPaid={item.amountPaid ? item.amountPaid.toFixed(2) : "0.00"}
                            />
                        )}
                    />

                    <HStack justifyContent="space-between" alignItems="flex-end" mt={"auto"} pt={"$2"} borderTopWidth={1}>
                        <Heading>Total</Heading>
                        <Text>R${total}</Text>
                    </HStack>
                </VStack>
            </HStack>

            <HStack justifyContent="space-between" gap={"$20"} p={"$4"} pt={'$0'}>
                <View alignItems="center">
                    <Heading color="white">Dinheiro</Heading>
                    <View h={1} w={"100%"} bgColor="white" my={10} />
                    <Text color="white">R${paymentTotals.cash}</Text>
                </View>

                <View alignItems="center">
                    <Heading color="white">Pix</Heading>
                    <View h={1} w={"100%"} bgColor="white" my={10} />
                    <Text color="white">R${paymentTotals.pix}</Text>
                </View>

                <View alignItems="center">
                    <Heading color="white">Cartão</Heading>
                    <View h={1} w={"100%"} bgColor="white" my={10} />
                    <Text color="white">R${paymentTotals.card}</Text>
                </View>
            </HStack>
        </VStack>
    );
}
