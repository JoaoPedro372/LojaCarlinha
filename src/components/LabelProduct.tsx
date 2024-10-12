import { Box, HStack, Text } from "@gluestack-ui/themed";
import { ButtonAdd } from "./ButtonAdd";
import { ButtonRemove } from "./ButtonRemove";


type Props = {
    name: string,
    price: string
}
export function LabelProduct({name,price, ...rest}: Props){
    return(
        <HStack mb={"$4"} maxWidth={"95%"} >
            <Box 
                bg="$white" 
                h={"$12"}
                w={"69%"}
                alignItems="center" justifyContent="center"
                rounded={"$2xl"}
                mr={"$3"}
                p={"$2"}
            >
                <HStack  width={"$full"} justifyContent="space-between" alignItems="center">
                    <Text fontWeight={"bold"} textTransform="uppercase" flex={1} color="$black">{name}</Text>
                    <Text fontWeight={"bold"} color="$black">{price}</Text>
                </HStack>
            </Box>
            <HStack space={"md"}>
                <ButtonAdd />
                <ButtonRemove />
            </HStack>
        </HStack>
    )
}