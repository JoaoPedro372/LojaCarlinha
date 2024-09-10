import { Center, FlatList, HStack, Text, VStack } from "@gluestack-ui/themed";
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

export function Home() {
    return(
        <VStack alignItems="center" flex={1} pt={"$10"} bg="$pink900" >
            <Logo 
                source={logoImg}
                alt="nada nao"
                w="$40"
                h="$40"
                mb={"$5"}
            />
            <VStack pl={"$2"} pr={"$2"} maxHeight={"50%"}>
                <FlatList 
                    data={products}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <LabelProduct name={item.name} price={item.price}/>}
                />
            </VStack>
            
        </VStack>
            
        
    )
    
}