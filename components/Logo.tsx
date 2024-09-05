import { Image } from "@gluestack-ui/themed";
import { ComponentProps } from "react";


type Props = ComponentProps<typeof Image>

export function Logo({ ...rest }: Props){
    return(
        <Image 
            {...rest}
        />
    )
}