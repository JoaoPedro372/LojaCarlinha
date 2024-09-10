import { Box, HStack, Text } from "@gluestack-ui/themed";
import { ButtonAdd } from "./ButtonAdd";
import { ButtonRemove } from "./ButtonRemove";

export function LabelProduct({name, price}){
    return(
        <HStack mb={"$4"} >
            <Box 
                bg="$red100" 
                h={"$12"}  
                alignItems="center" justifyContent="center"
                rounded={"$2xl"}
                mr={"$3"}
            >
                <HStack width="74%" justifyContent="space-between" alignItems="center">
                    <Text fontWeight={"bold"} textTransform="uppercase">{name}</Text>
                    <Text fontWeight={"bold"}>{price}</Text>
                </HStack>
            </Box>
            <HStack space={"md"}>
                <ButtonAdd />
                <ButtonRemove />
            </HStack>
        </HStack>
    )
}