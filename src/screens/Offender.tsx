import { Header } from "@components/Header";
import { Center, Heading, Image, Text, VStack } from "@gluestack-ui/themed";
import { useConsultation } from "@hooks/useConsultation";
import { api } from "../service/api";
import { formateData } from "../service/utils";

export function Offender() {
    const { consultationData } = useConsultation()


    return (
            <VStack flex={1} bg="$gray600">
                <Header title="Detalhes da pessoa" />

                <VStack flex={1} mt="$5" px="$4">
                    <Center>
                        <Heading color="$gray100" textTransform="uppercase" fontFamily="$heading" my="$2">Identificação</Heading>
                    </Center>

                    <Image
                        source={{ uri: `${api.defaults.baseURL}/offenders/${consultationData?.avatar}` }}
                        style={{ width: '100%', height: 300, borderRadius: 10, }}
                        resizeMode="center"
                        alt="Imagem infrator"
                    />

                    <VStack bg="$gray400" rounded="$md" px="$4" py="$10" mt="$10" gap="$2">
                        <Text color="$gray100">CPF: {consultationData?.cpf}</Text>
                        <Text color="$gray100">Nome: {consultationData?.name}</Text>
                        <Text color="$gray100">Apelido: {consultationData?.surname ? consultationData.surname : "Não cadastrado"}</Text>
                        <Text color="$gray100">Nome da mãe: {consultationData?.mother_name}</Text>
                        <Text color="$gray100">Data de nascimento: {consultationData?.date_of_birth ? formateData(consultationData?.date_of_birth) : "Não cadastrado"}</Text>
                    </VStack>
                </VStack>
            </VStack>
    )
}