import { Spinner, Center } from "@gluestack-ui/themed";

export function Loading() {
    return (
        <Center flex={1} bg="$gray700">
            <Spinner size="large" />
        </Center>
    )
}