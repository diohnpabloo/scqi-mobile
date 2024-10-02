import { Heading, VStack } from "@gluestack-ui/themed";

type Props = {
    title: string;
}

export function Header({ title }: Props) {
    return (
        <VStack bg="$gray400" pt="$16" pb="$5" px="$8" alignItems="center">
            <Heading color="$gray100" fontFamily="$heading" fontSize="$lg">{title}</Heading>
        </VStack>
    );
}