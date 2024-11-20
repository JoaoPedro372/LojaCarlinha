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
    const [vendas, setVendas] = useState([]);
    


    const navigator = useNavigation<RoutesProps>()

    useEffect(() => {
        axios.get('http://192.168.15.12:5000/produtos') 
            .then(response => {
                console.log('Resposta da API:', response.data); // Exibindo a resposta para verificar
    
                // Verificando se a resposta é um array válido
                if (Array.isArray(response.data)) {
                    setProdutos(response.data); // Agora é seguro definir os produtos
                    console.log('Produtos recebidos:', response.data);
                } else {
                    console.error('Erro: Resposta da API não é um array válido');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
            });
    }, []);
    
    
    function handleSaveSale(paymentType: string) {
        vendas.forEach(sale => {
            const saleData = {
                productName: sale.product,
                qtde: sale.qtde,
                amountPaid: parseFloat(sale.price), // O valor total pago por esse produto
                dateTime: new Date().toISOString(), // A data e hora da venda
                paymentType: paymentType, // Agora, o tipo de pagamento é passado aqui
            };
    
            axios.post('http://192.168.15.12:5000/vendas', saleData)
                .then(response => {
                    console.log('Venda salva com sucesso:', response.data);
                    setVendas([]); // Limpa a lista de vendas após salvar
                })
                .catch(error => {
                    console.error('Erro ao salvar a venda:', error);
                });
        });
    }
    

    
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


    // Função para adicionar o produto ao resumo de vendas
    function handleAddProduct(product) {
        console.log('Adicionando produto:', product); // Adicionando log para ver se a função é chamada

        setVendas(prevVendas => {
            const productIndex = prevVendas.findIndex(item => item.product === product.name);

            if (productIndex >= 0) {
                // Se o produto já estiver no resumo, apenas atualiza a quantidade e o valor
                const updatedVendas = [...prevVendas];
                updatedVendas[productIndex].qtde += 1;
                updatedVendas[productIndex].price = (updatedVendas[productIndex].qtde * parseFloat(product.price)).toFixed(2); 
                console.log('Vendas atualizadas:', updatedVendas); // Log para verificar o que está sendo atualizado
                return updatedVendas;
            } else {
                // Se não existir, adiciona o produto com quantidade 1
                const newVendas = [...prevVendas, {
                    product: product.name,
                    qtde: 1,
                    price: parseFloat(product.price).toFixed(2), 
                }];
                console.log('Nova venda adicionada:', newVendas); // Log para verificar o produto adicionado
                return newVendas;
            }
        });
    }

    // Função para remover o produto do resumo de vendas
    function handleRemoveProduct(product) {
        setVendas(prevVendas => {
            const productIndex = prevVendas.findIndex(item => item.product === product.name);

            if (productIndex >= 0) {
                const updatedVendas = [...prevVendas];
                const updatedProduct = updatedVendas[productIndex];

                if (updatedProduct.qtde > 1) {
                    updatedProduct.qtde -= 1;
                    updatedProduct.price = (updatedProduct.qtde * parseFloat(product.price)).toFixed(2);
                } else {
                    updatedVendas.splice(productIndex, 1);
                }

                return updatedVendas;
            }

            return prevVendas;
        });
    }

    // Função para limpar a lista de vendas
    function handleClearSales() {
        setVendas([]); // Limpa o estado de vendas, removendo todos os produtos
    }


    return(
        <VStack alignItems="center" flex={1} pt={"$10"} bg="$warmGray700" >
            <ModalPayment showModal={showModal} setShowModal={setShowModal} paymentName={paymentName} handleSaveSale={handleSaveSale} />
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
                    data={produtos} // Agora 'produtos' é um array
                    keyExtractor={(item) => item._id.toString()} // Usando o _id como chave
                    renderItem={({ item }) => (
                        <LabelProduct 
                            name={item.name} 
                            price={item.price} 
                            onAdd={() => handleAddProduct(item)} 
                            onRemove={() => handleRemoveProduct(item)} 
                        />
                    )}
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
                            data={vendas}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <LabelResume product={item.product} qtde={item.qtde} price={item.price}/>}
                    />

                    <HStack justifyContent="space-between" alignItems="flex-end" mt={"auto"} pt={"$2"} borderTopWidth={1}>
                        <Heading>Total</Heading>
                        <Text>R${vendas.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2)}</Text>
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
                    <ButtonText fontSize={"$sm"} onPress={handleClearSales}>CANCELAR</ButtonText>
                </Button>
            </HStack>
            
        </VStack>
            
        
    )
    
}