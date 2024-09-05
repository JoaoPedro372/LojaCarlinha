import { Center, HStack, Text, VStack } from "@gluestack-ui/themed";
import { Logo } from "../../components/Logo";
import logoImg from "../../assets/logoloja.png"
import { LabelProduct } from "../../components/LabelProduct";

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
            <VStack pl={"$2"} pr={"$24"}>
                <LabelProduct />
            </VStack>
            
        </VStack>
            
        
    )
    
}