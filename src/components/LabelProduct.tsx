import { Box, HStack, Text } from "@gluestack-ui/themed";
import { ButtonAdd } from "./ButtonAdd";
import { ButtonRemove } from "./ButtonRemove";

export function LabelProduct({name, price}){
    return(
        <HStack mb={"$4"} maxWidth={"100%"} mr={"10%"}>
            <Box 
                bg="$red100" 
                h={"$12"}
                w={"69%"}
                alignItems="center" justifyContent="center"
                rounded={"$2xl"}
                mr={"$3"}
                p={"$2"}
            >
                <HStack  width={"$full"} justifyContent="space-between" alignItems="center">
                    <Text fontWeight={"bold"} textTransform="uppercase" flex={1}>{name}</Text>
                    <Text fontWeight={"bold"} >{price}</Text>
                </HStack>
            </Box>
            <HStack space={"md"}>
                <ButtonAdd />
                <ButtonRemove />
            </HStack>
        </HStack>
    )
}