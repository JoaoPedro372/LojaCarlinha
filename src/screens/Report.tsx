import { Text, VStack, HStack, Button, ButtonText, Heading, View, FlatList } from "@gluestack-ui/themed";
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';  // Importando o Axios
import { LabelResumeReport } from "../components/LabelResumeReport";
import { LabelResume } from "../components/LabelResume";


export function Report() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [salesData, setSalesData] = useState([]);  // Estado para armazenar os dados das vendas
    const [total, setTotal] = useState(0);  // Estado para armazenar o total

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

    // Função para buscar os dados de vendas
    const fetchSalesData = async () => {
        try {
            const response = await axios.get('http://192.168.15.169:5000/vendas', {
                params: {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                },
            });
            setSalesData(response.data);  // Atualiza o estado com os dados recebidos da API
            calculateTotal(response.data);  // Calcula o total
        } catch (error) {
            console.error("Erro ao buscar dados de vendas:", error);
        }
    };

    // Função para calcular o total das vendas
    const calculateTotal = (data) => {
        const totalAmount = data.reduce((acc, item) => {
            // Como amountPaid é um número no seu banco, basta usar ele diretamente
            const amountPaid = item.amountPaid || 0;  // Se não tiver amountPaid, considera 0
            const quantity = parseInt(item.qtde, 10) || 0;  // Se a quantidade não for válida, considera 0
            return acc + (amountPaid * quantity);
        }, 0);
        setTotal(totalAmount.toFixed(2));  // Atualiza o total com duas casas decimais
    };

    // Efeito para carregar os dados sempre que as datas forem alteradas
    useEffect(() => {
        fetchSalesData();
    }, [startDate, endDate]);  // Recarrega os dados ao alterar as datas

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
                        <Heading>PRODUTO</Heading>
                        <Heading>QUANTIDADE</Heading>
                        <Heading>VALOR</Heading>
                    </HStack>

                    <FlatList 
                        data={salesData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            // Garantir que o preço esteja sendo exibido corretamente
                            const formattedPrice = item.amountPaid ? item.amountPaid.toFixed(2) : "0.00";  // Exibe o valor diretamente
                            return (
                                <LabelResumeReport
                                    product={item.product || item.productName}  // Verifique se o nome do produto é 'product' ou 'productName'
                                    qtde={item.qtde}
                                    amountPaid={formattedPrice}  // Exibindo o preço formatado
                                />
                            );
                        }}
                    />

                    <HStack justifyContent="space-between" alignItems="flex-end" mt={"auto"} pt={"$2"} borderTopWidth={1}>
                        <Heading>Total</Heading>
                        <Text>R${total}</Text>
                    </HStack>
                </VStack>
            </HStack>

            <HStack justifyContent="space-between" gap={"$20"} p={"$4"} pt={'$0'}>
                {/* Aqui você pode adicionar as seções de Dinheiro, Pix e Cartão, caso tenha dados específicos para cada forma de pagamento */}
            </HStack>
        </VStack>
    );
}
