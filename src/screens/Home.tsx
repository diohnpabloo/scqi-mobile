import { Center, Heading, HStack, Text, VStack } from "@gluestack-ui/themed";

import UserDefault from "@assets/userPhotoDefault.png";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/AppRoutes";

import { Header } from "@components/Header";
import { UserPhoto } from "@components/UserPhoto";
import { Card } from "@components/Card";
import { useAuth } from "@hooks/useAuth";
import { useConsultation } from "@hooks/useConsultation";

export function Home() {
    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const { user } = useAuth()

    function handleNewQuery() {
        navigation.navigate('consultation');
    }


    return (

        <VStack flex={1} bg="$gray600">
            <Header
                title="Painel principal"
            />
            <VStack mt="$8">
                <Center gap="$2">
                    <UserPhoto
                        source={UserDefault}
                        alt="Foto do usuário"
                    />
                    <Heading color="$gray100">{user.name}</Heading>

                    <Text color="$gray300">{user.email}</Text>

                    <Text color="$gray300">Matrícula: {user.register}</Text>
                </Center>
            </VStack>

            <Center mt="$20" gap="$2">
                <Heading color="$white">Painel de Consulta</Heading>

                <Card
                    onPress={handleNewQuery}
                />
            </Center>
        </VStack>
    );
}