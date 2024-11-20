import { Button, ButtonText } from "@gluestack-ui/themed";

type ButtonRemoveProps = {
    onPress: () => void; // Adiciona a função onPress
};

export function ButtonRemove({ onPress }: ButtonRemoveProps) {
    return (
        <Button
            size="xs"
            variant="solid"
            action="negative"
            w={"$12"}
            h={"$12"}
            rounded={"$full"}
            onPress={onPress}  // Chama a função onPress passada como prop
        >
            <ButtonText mt={"$3"} fontSize={"$3xl"} color="white" fontWeight={'$extrabold'}>-</ButtonText>
        </Button>
    );
}
