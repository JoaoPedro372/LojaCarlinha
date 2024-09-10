import { Center, Spinner } from "@gluestack-ui/themed";

export function Loading() {
   return (
    <Center flex={1} bg="black">
        <Spinner color={'red'}/>
    </Center>
   )
}