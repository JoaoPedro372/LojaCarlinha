import { Button, ButtonText } from "@gluestack-ui/themed";

export function ButtonRemove() {
    return(
        <Button
            size="xs"
            variant="solid"
            action="negative"
            w={"$12"}
            h={"$12"}
            rounded={"$full"}
        >
        <ButtonText mt={"$3"} fontSize={"$3xl"} color="white" fontWeight={'$extrabold'}>-</ButtonText>
        </Button>
    )
}