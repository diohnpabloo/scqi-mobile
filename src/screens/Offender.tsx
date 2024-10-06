import { Header } from "@components/Header";
import { Center, Heading, Image, Text, VStack } from "@gluestack-ui/themed";
import { useConsultation } from "@hooks/useConsultation";
import { api } from "../service/api";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/AppRoutes";

export function Offender() {
    const { consultationData } = useConsultation()
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleNewQuery() {
        navigation.navigate("consultation")
    }

    return (
            <VStack flex={1} bg="$gray600">
                <Header title="Detalhes da pessoa" />

                <VStack flex={1} mt="$2" px="$4">
                    <Center>
                        <Heading color="$gray100" textTransform="uppercase" fontFamily="$heading" my="$2">Identificação</Heading>
                    </Center>

                    <Image
                        source={{ uri: `${api.defaults.baseURL}/offenders/${consultationData?.avatar}` }}
                        style={{ width: '100%', height: 300, borderRadius: 10, }}
                        resizeMode="center"
                        alt="Imagem infrator"
                    />

                    <VStack bg="$gray400" rounded="$md" px="$4" py="$10" mt="$5" gap="$2">
                        <Text color="$gray100">CPF: {consultationData?.cpf}</Text>
                        <Text color="$gray100">Nome: {consultationData?.name}</Text>
                        <Text color="$gray100">Apelido: {consultationData?.surname ? consultationData.surname : "Não cadastrado"}</Text>
                        <Text color="$gray100">Nome da mãe: {consultationData?.mother_name}</Text>
                        <Text color="$gray100">Data de nascimento: {consultationData?.date_of_birth}</Text>
                    </VStack>
                    
                    <Button title="Nova consulta" mt="$2" onPress={handleNewQuery}/>
                </VStack>
            </VStack>
    )
}