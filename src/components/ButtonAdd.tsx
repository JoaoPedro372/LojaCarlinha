import { Button, ButtonText } from "@gluestack-ui/themed";

export function ButtonAdd() {
    return(
        <Button
        size="xs"
        variant="solid"
        action="positive"
        w={"$12"}
        h={"$12"}
        rounded={"$full"}
        >
        <ButtonText fontSize={"$lg"} color="white" fontWeight={'$extrabold'}>+</ButtonText>
        </Button>
    )
}