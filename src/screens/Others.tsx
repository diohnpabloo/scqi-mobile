import { Header } from "@components/Header";
import { VStack, Text, Pressable, HStack, Icon } from "@gluestack-ui/themed";
import { useAuth } from "@hooks/useAuth";
import { LogOut } from "lucide-react-native";

export function Others() {
    const { SignOut } = useAuth()

    return (
        <VStack flex={1} bg="$gray600">
            <Header title="Outros" />

            <VStack flex={1} mt="$10" px="$2">
                <Pressable onPress={SignOut}>
                    <HStack
                        width="$full"
                        gap="$5"
                        alignItems="center"
                    >
                        <Icon
                            as={LogOut}
                            color="$white"
                            size="xl" />
                        <Text
                            color="$gray100"
                            fontFamily="$body"
                            fontSize="$md"
                        >
                            Sair
                        </Text>
                    </HStack>
                </Pressable>
            </VStack>
        </VStack>
    );
}