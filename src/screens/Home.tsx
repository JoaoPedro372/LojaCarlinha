import { Button, ButtonText, FlatList, Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { Logo } from "../components/Logo";
import logoImg from "../../assets/logoloja.png";
import { LabelProduct } from "../components/LabelProduct";
import { LabelResume } from "../components/LabelResume";

import { useNavigation } from "@react-navigation/native";
import { RoutesProps } from "../routes/AppRoutes"; 
import { IconToReport } from "../components/IconToReport";
import { useEffect, useState } from "react";
import { ModalPayment } from "../components/ModalPayment";

import axios from 'axios';

  const Resume = [
    {product: 'torta de frango', qtde: '3', price: '10,00'},
    
  ]

  

export function Home() {

    const [showModal, setShowModal] = useState(false);
    const [paymentName, setPaymentName] = useState('');
    const [produtos, setProdutos] = useState([]);

    const navigator = useNavigation<RoutesProps>()

    useEffect(() => {
        axios.get('http://192.168.15.16:5000/produtos') // rodar cd apiLoja || rodar comando node index.js || inserir IP da sua máquina || antes de tudooooo, rodar npm install
            .then(response => {
                setProdutos(response.data);
                console.log('log do response', response.data); // Verifica o conteúdo retornado
            })
            .catch(error => console.error(error));
    }, []);

    function handleReportScreen() {
        return (
            navigator.navigate('Report')
        )
    }

    function handleOpenModal(paymentType: string) {
        return(
            setShowModal(true),
            setPaymentName(paymentType)
        )

    };

    // function handleOpenModalPix(paymentType: string) {
    //     return(
    //         setShowModal(true),
    //         setPaymentName(paymentType)
    //     )
    // };

    // function handleOpenModalCard(paymentType: string) {
    //     return(
    //         setShowModal(true),
    //         setPaymentName(paymentType)
    //     )
    // };

    return(
        <VStack alignItems="center" flex={1} pt={"$10"} bg="$warmGray700" >
            <ModalPayment showModal={showModal} setShowModal={setShowModal} paymentName={paymentName}/>
            <HStack w={'$100%'} justifyContent="center" pt={'$3'}>
                <Logo 
                    source={logoImg}
                    tintColor={"$white"}
                    alt="nada nao"
                    w="$20"
                    h="$20"
                    mb={'$5'}
                />
                <HStack position="absolute" right={0} pt={'$3'}>

                    <Button rounded={"$full"} bg="$warmGray700" onPress={() => handleReportScreen()}>
                        <IconToReport />
                    </Button>
                    
                </HStack>
                
            </HStack>
            
            <VStack pl={"$2"} pr={"$2"} maxHeight={"30%"} mb={"$5"}>
                <FlatList 
                    data={produtos} // Remova os colchetes extras
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => <LabelProduct name={item.name} price={item.price}/>}
                />
            </VStack>

            <HStack flex={1} w={"$full"} h={"100%"} p={"$2"} pr={"$2"} >
                <VStack bg="$white" w={"100%"} h={"$100%"} rounded={"$2xl"} mr={"$2"} p={"$2"}>
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
                            data={Resume}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <LabelResume product={item.product} qtde={item.qtde} price={item.price}/>}
                    />

                    <HStack justifyContent="space-between" alignItems="flex-end" mt={"auto"} pt={"$2"} borderTopWidth={1}>
                        <Heading>Total</Heading>
                        <Text>R$128,00</Text>
                    </HStack>

                </VStack>
            </HStack>
            
            <HStack  justifyContent="space-between" gap={"$2"} p={"$4"}>
                <Button w={"$25%"} h={"$12"} bg="$success500" pl={0} pr={0} onPress={() => handleOpenModal('Dinheiro')}>
                    <ButtonText fontSize={"$sm"} >DINHEIRO</ButtonText>
                </Button>

                <Button w={"$25%"} h={"$12"} bg="$primary500" pl={0} pr={0} onPress={() => handleOpenModal('Pix')}>
                    <ButtonText fontSize={"$sm"}>PIX</ButtonText>
                </Button>

                <Button w={"$25%"} h={"$12"} bg="$black" pl={0} pr={0} onPress={() => handleOpenModal('Cartão')}>
                    <ButtonText fontSize={"$sm"}>CARTÃO</ButtonText>
                </Button>

                <Button w={"$25%"} h={"$12"} bg="$error500" pl={0} pr={0}>
                    <ButtonText fontSize={"$sm"}>CANCELAR</ButtonText>
                </Button>
            </HStack>
            
        </VStack>
            
        
    )
    
}