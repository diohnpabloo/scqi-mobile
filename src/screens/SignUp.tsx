import { Center, Heading, Image, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import Logo from "@assets/logo.png"

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";


export function SignUp() {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <VStack flex={1} bg="$gray600" px="$8" pb="$16">
                <Center>
                    <Image
                        source={Logo}
                        alt="Logo do aplicativo"
                        w="$72"
                        h="$72"
                    />
                </Center>

                <Center gap="$4">
                    <Heading color="$gray100">Crie sua conta</Heading>

                    <Input
                        placeholder="CPF"
                        keyboardType="number-pad"
                    />

                    <Input
                        placeholder="Nome"
                    />

                    <Input
                        placeholder="E-mail"
                        keyboardType="email-address"
                    />

                    <Input
                        placeholder="Senha"
                        secureTextEntry
                    />

                    <Button
                        title="Criar e acessar"
                    />
                </Center>

                <Center flex={1} justifyContent="flex-end" gap="$4">
                    <Button
                        title="Voltar para o login"
                        variant="outline"
                        onPress={handleGoBack}
                    />
                </Center>
            </VStack>
        </ScrollView>
    )
}