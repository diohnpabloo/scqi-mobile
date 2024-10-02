import { Text } from "@gluestack-ui/themed";
import { Button as GlueStackButton, ButtonSpinner } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof GlueStackButton> & {
    title?: string;
    variant?: 'solid' | 'outline';
    isLoading?: boolean;
}

export function Button({ title, isLoading, variant = 'solid', ...rest }: Props) {
    return (
        <GlueStackButton
            w="$full"
            h="$14"
            bg={variant === "outline" ? "transparent" : "$paletBlue700"}
            borderWidth={variant === "outline" ? "$1" : "$0"}
            borderColor="$paletBlue700"
            rounded="$sm"
            $active-bg="$paletBlue600"
            disabled={isLoading}
            {...rest}
        >
            {isLoading ? <ButtonSpinner /> :
                <Text
                    color={variant === "outline" ? "$paletBlue700" : "$gray100"}
                    fontFamily="$heading"
                    fontSize="$sm"
                >{title}</Text>
            }

        </GlueStackButton>
    );
}