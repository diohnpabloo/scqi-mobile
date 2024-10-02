import { Button, Text } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Button> & {
    title: string;
    isActive?: boolean;
}

export function SearchType({ title, isActive, ...rest }: Props) {
    return (
        <Button
            minWidth="$33"
            h="$10"
            bg={isActive ? "$paletBlue600" : "$gray500"}
            rounded="$full"
            justifyContent="center"
            alignItems="center"
            borderColor="$paletBlue700"
            borderWidth={isActive ? 1 : 0}
            {...rest}
        >
            <Text
                color="$gray100"
                textTransform="uppercase"
                fontSize="$lg"
                fontFamily="$body"
            >{title}
            </Text>
        </Button>
    );
}