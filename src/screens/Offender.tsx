import { useEffect, useState } from "react";

import { Image, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { Header } from "@components/Header";
import { Button } from "@components/Button";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/AppRoutes";

import { ConsultationDTO } from "@dtos/ConsultationDTO";
import { api } from "../service/api";

import { formatCPF, formateDate } from "@utils/Formats";
import { Dimensions } from "react-native";

type RouteParamsProps = {
    offenderName: string
}

const { width } = Dimensions.get('window')
export function Offender() {
    const [offender, setOffender] = useState<ConsultationDTO>({} as ConsultationDTO)
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    const route = useRoute()
    const { offenderName } = route.params as RouteParamsProps

    async function fetchOffenderDetails() {
        try {
            const { data } = await api.get(`/offenders/${offenderName}`)
            console.log(data)
            setOffender(data)

        } catch (error) {
            console.log(error)
        }
    }

    function handleNewQuery() {
        navigation.navigate("consultation")
    }

    useEffect(() => {
        fetchOffenderDetails()
    }, [offenderName])
    return (
        <VStack flex={1} bg="$gray600">
            <Header title="Detalhes da pessoa" />
            <ScrollView>

                <VStack flex={1} mt="$2" px="$4">
                    <Image
                        source={{ uri: `https://offendersimage.s3.us-east-2.amazonaws.com/${offender?.avatar}` }}
                        style={{ width: '100%', height: 350, borderRadius: 10, }}
                        resizeMode="center"
                        alt="Imagem infrator"
                    />

                    <VStack  bg="$gray400" rounded="$md" px="$4" py="$10" mt="$5" gap="$2">
                        <Text color="$gray100">CPF: {offender.cpf ? formatCPF(offender.cpf) : "Não cadastrado"}</Text>
                        <Text color="$gray100">Nome: {offender?.name}</Text>
                        <Text color="$gray100">Apelido: {offender?.surname ? offender.surname : "Não cadastrado"}</Text>
                        <Text color="$gray100">Nome da mãe: {offender?.mother_name}</Text>
                        <Text color="$gray100">
                            Data de nascimento: {offender.date_of_birth ? formateDate(offender.date_of_birth) : "Não cadastrado"}
                        </Text>
                        <Text color="$gray100">Endereço: {offender?.address}</Text>
                    </VStack>

                    <Button title="Nova consulta" mt="$2" onPress={handleNewQuery} />
                </VStack>
            </ScrollView>
        </VStack>
    )
}