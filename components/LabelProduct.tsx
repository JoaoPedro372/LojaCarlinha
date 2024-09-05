import { Box, HStack, Text } from "@gluestack-ui/themed";

export function LabelProduct(){
    return(
        <HStack flex={1}>
            <Box 
                bg="$red100" 
                h={"$12"} w={"$full"} 
                alignItems="center" justifyContent="center"
                rounded={"$2xl"}
            >
                <HStack space="4xl">
                    <Text>empada</Text>
                    <Text>10,00</Text>
                </HStack>
            </Box>
        </HStack>
    )
}