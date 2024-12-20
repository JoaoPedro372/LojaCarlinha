import { Box, HStack, Text } from "@gluestack-ui/themed";
import { ButtonAdd } from "./ButtonAdd";
import { ButtonRemove } from "./ButtonRemove";


type Props = {
    product: string,
    qtde: number,
    amountPaid: number
}
export function LabelResumeReport({product,qtde, amountPaid, ...rest}: Props){
    return(
        <HStack mb={"$2"} maxWidth={"100%"}>
            
                <HStack  width={"$full"} justifyContent="space-between" gap={'$24'} alignItems="center">
                    <Text  textTransform="uppercase" flex={1} color="$black" fontSize={'$sm'}>{product}</Text>
                    <Text  color="$black" fontSize={'$sm'}>{qtde}</Text>
                    <Text  color="$black" fontSize={'$sm'}>R$:{amountPaid}</Text>
                </HStack>
            
        </HStack>
    )
}