import { Button, ButtonText } from "@gluestack-ui/themed";

type ButtonAddProps = {
    onPress: () => void; // Adiciona a função onPress
};

export function ButtonAdd({ onPress }: ButtonAddProps) {
    return (
        <Button
            size="xs"
            variant="solid"
            action="positive"
            w={"$12"}
            h={"$12"}
            rounded={"$full"}
            onPress={onPress}  // Chama a função onPress passada como prop
        >
            <ButtonText fontSize={"$lg"} color="white" fontWeight={'$extrabold'}>+</ButtonText>
        </Button>
    );
}
