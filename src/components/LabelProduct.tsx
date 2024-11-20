import { Box, HStack, Text } from "@gluestack-ui/themed";
import { ButtonAdd } from "./ButtonAdd";
import { ButtonRemove } from "./ButtonRemove";

type Props = {
    name: string;
    price: string;
    onAdd: () => void;
    onRemove: () => void;
};

export function LabelProduct({ name, price, onAdd, onRemove }: Props) {
    return (
        <HStack mb={"$4"} maxWidth={"100%"} pr={'$6%'}>
            <Box 
                bg="$white" 
                h={"$12"}
                w={"69%"}
                alignItems="center" 
                justifyContent="center"
                rounded={"$2xl"}
                mr={"$3"}
                p={"$2"}
            >
                <HStack width={"$full"} justifyContent="space-between" alignItems="center">
                    <Text fontWeight={"bold"} textTransform="uppercase" flex={1} color="$black">
                        {name}
                    </Text>
                    <Text fontWeight={"bold"} color="$black">
                        R${price}
                    </Text>
                </HStack>
            </Box>
            <HStack space={"md"}>
                <ButtonAdd onPress={onAdd} />
                <ButtonRemove onPress={onRemove} />
            </HStack>
        </HStack>
    );
}
