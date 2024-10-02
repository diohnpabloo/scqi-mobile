import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { VStack } from "@gluestack-ui/themed";

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

import { useConsultation } from "@hooks/useConsultation";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/AppRoutes";

export type FormDataProps = {
    cpf: string;
    name: string;
    surname: string;
    mother_name: string
    date_of_birth: string;
    avatar?: string;
}

export function Consultation() {
    const [isLoading, setIsLoading] = useState(false)
    const [searchSelected, setSearchSelected] = useState('cpf');
    const { query, consultationData, isLoadingOffenderData } = useConsultation()

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    const { control, handleSubmit } = useForm<FormDataProps>();

    async function handleQuery({ cpf, name, surname, mother_name, date_of_birth }: FormDataProps) {

        try {
            await query(cpf, name, surname, mother_name, date_of_birth)

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Erro ao realizar a consulta"
            Alert.alert("Consulta", title)
        }
    }

    useEffect(() => {
        if (consultationData) {
            navigation.navigate("offender")
        }
    }, [consultationData])
    return (
        <VStack flex={1} bg="$gray600" >
            <Header
                title="Consultas"
            />


            <VStack flex={1} px="$2" gap="$2" alignItems="center" justifyContent="center">
                <Controller
                    control={control}
                    name="cpf"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder={searchSelected.toUpperCase()}
                            keyboardType="number-pad"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="nome"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="surname"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="apelido"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="mother_name"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Nome da Mãe"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="date_of_birth"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Data de nascimento"
                            onChangeText={onChange}
                            keyboardType="numbers-and-punctuation"
                            value={value}
                        />
                    )}
                />


                <Button
                    title="Consultar"
                    style={{ marginTop: 20 }}
                    onPress={handleSubmit(handleQuery)}
                    isLoading={isLoadingOffenderData}
                />
            </VStack>

        </VStack>
    );
}