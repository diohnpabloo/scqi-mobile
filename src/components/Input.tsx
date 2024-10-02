import { Input as GlueStackInput, InputField, FormControl, FormControlError, FormControlErrorText } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof InputField> & {
    errorMessage?: string | null;
}

export function Input({ errorMessage = null, ...rest }: Props) {
    const invalid = !!errorMessage

    return (
        <FormControl w="$full" isInvalid={invalid}>
            <GlueStackInput
                h="$14"
                borderWidth="$0"
                borderRadius="$md"
                $invalid={{
                    borderWidth: 1,
                    borderColor: "$red500"
                }}
                $focus={{
                    borderWidth: 1,
                    borderColor: invalid ? "$red500" : "$paletBlue600"
                }}
            >
                <InputField
                    px="$4"
                    bg="$gray700"
                    color="$white"
                    fontFamily="$body"
                    placeholderTextColor="$gray300"
                    {...rest}
                />
            </GlueStackInput>

            <FormControlError>
                <FormControlErrorText color="$red500">
                    {errorMessage}
                </FormControlErrorText>
            </FormControlError>
        </FormControl>
    );
}