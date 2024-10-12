import { Button, ButtonText, Center, FlatList, Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { Logo } from "../components/Logo";
import logoImg from "../../assets/logoloja.png"
import { LabelProduct } from "../components/LabelProduct";


const products = [
    { name: 'empada', price: '10,00' },
    { name: 'coxinha', price: '8,00' },
    { name: 'pastel', price: '12,00' },
    { name: 'empada', price: '10,00' },
    { name: 'coxinha', price: '8,00' },
    { name: 'pastel', price: '12,00' },
    { name: 'empada', price: '10,00' },
    { name: 'coxinha', price: '8,00' },
    { name: 'pastel', price: '12,00' },
    { name: 'empada', price: '10,00' },
    { name: 'coxinha', price: '8,00' },
    { name: 'pastel', price: '12,00' },
    { name: 'empada', price: '10,00' },
    { name: 'coxinha', price: '8,00' },
    { name: 'pastel', price: '12,00' },
    { name: 'empada', price: '10,00' },
    { name: 'coxinha', price: '8,00' },
    { name: 'pastel', price: '12,00' },
    { name: 'empada', price: '10,00' },
    { name: 'coxinha', price: '8,00' },
    { name: 'pastel', price: '12,00' },
  ];

  const Resume = [
    {product: 'torta de frango', qtde: '3', price: 'R$:10,00'},
    {product: 'torta de costas', qtde: '2', price: 'R$:12,00'},
    {product: 'torta de lado', qtde: '1', price: 'R$:8,00'}
  ]

export function Home() {
    return(
        <VStack alignItems="center" flex={1} pt={"$10"} bg="$warmGray700" >
            <Logo 
                source={logoImg}
                tintColor={"$white"}
                alt="nada nao"
                w="$32"
                h="$32"
                mb={"$5"}
            />
            <VStack pl={"$2"} pr={"$2"} maxHeight={"36%"} mb={"$10"}>
                <FlatList 
                    data={products}
                    keyExtractor={(item, index) => index.toString()}
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
                    
                    <HStack justifyContent="space-between">
                        <Text>Torta de frango</Text>
                        <Text>3</Text>
                        <Text>R$30,00</Text>
                    </HStack>
                </VStack>
            </HStack>
            
            <HStack  justifyContent="space-between" gap={"$2"} p={"$4"}>
                <Button w={"$25%"} h={"$16"} bg="$success500" pl={0} pr={0}>
                    <ButtonText fontSize={"$sm"} >DINHEIRO</ButtonText>
                </Button>

                <Button w={"$25%"} h={"$16"} bg="$primary500" pl={0} pr={0}>
                    <ButtonText fontSize={"$sm"}>PIX</ButtonText>
                </Button>

                <Button w={"$25%"} h={"$16"} bg="$black" pl={0} pr={0}>
                    <ButtonText fontSize={"$sm"}>CARTÃO</ButtonText>
                </Button>

                <Button w={"$25%"} h={"$16"} bg="$error500" pl={0} pr={0}>
                    <ButtonText fontSize={"$sm"}>CANCELAR</ButtonText>
                </Button>
            </HStack>
            
        </VStack>
            
        
    )
    
}