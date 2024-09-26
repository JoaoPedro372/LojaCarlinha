import { Button, Center, FlatList, HStack, Text, VStack } from "@gluestack-ui/themed";
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
                w="$32"
                h="$32"
                mb={"$5"}
            />
            <VStack pl={"$2"} pr={"$2"} maxHeight={"43%"}>
                <FlatList 
                    data={products}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <LabelProduct name={item.name} price={item.price}/>}
                />
            </VStack>

            <HStack flex={1} w={"$full"} h={"100%"} p={"$2"} pr={"$2"}>
                <VStack bg="$red100" w={"72%"} h={"$full"} rounded={"$2xl"} mr={"$2"}>
                
                </VStack>
                <VStack  w={"26%"} h={"$full"} justifyContent="space-between">
                    <Button w={"$full"} h={"$16"} bgColor="$darkBlue800"/>
                    <Button w={"$full"} h={"$16"} action="positive"/>
                    <Button w={"$full"} h={"$16"} bgColor="$red700"/>
                </VStack>
            </HStack>
            
        </VStack>
            
        
    )
    
}