import { FlatList } from "react-native"
import { VStack } from "@gluestack-ui/themed"

import { useConsultation } from "@hooks/useConsultation"

import { Header } from "@components/Header"
import { OffenderCard } from "@components/OffenderCard"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/AppRoutes"


export function ListOffenders() {
    const { consultationData } = useConsultation()
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleOpenOffenderDetails(offenderName: string) {
        navigation.navigate("offender", {offenderName})
    }

    return (
        <VStack flex={1} bg="$gray600">
            <Header title="Lista de infratores" />
            <FlatList
                data={consultationData}
                keyExtractor={(item) => item.cpf || item.name || Math.random().toString(36)}
                renderItem={({ item }) => (
                    <OffenderCard
                        data={item} onPress={() => {
                            if(item.name) {
                                handleOpenOffenderDetails(item.name)
                            }
                        }}
                    />
                )}
            />
        </VStack>
    )
}