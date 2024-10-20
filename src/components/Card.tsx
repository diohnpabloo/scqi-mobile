import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Icon, Text, VStack } from "@gluestack-ui/themed";

import { UserSearch } from "lucide-react-native";

type Props = TouchableOpacityProps;

export function Card({ ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <VStack bg="$gray400" p="$10" rounded="$md" alignItems="center" gap="$2">
                <Icon as={UserSearch} color="$white" size="xl" />
                <Text color="$white">Pessoa</Text>
            </VStack>
        </TouchableOpacity>
    );
}