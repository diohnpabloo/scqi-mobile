import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { ScrollView, useToast, VStack } from "@gluestack-ui/themed";

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { AppError } from "@utils/AppError";

import { useConsultation } from "@hooks/useConsultation";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/AppRoutes";
import { ToastMessage } from "@components/ToastMessage";

export type FormDataProps = {
    cpf: string;
    name: string;
    surname: string;
    mother_name: string
    address: string
    date_of_birth: string;
    avatar?: string;
}

export function Consultation() {
    const [isLoading, setIsLoading] = useState(false)
    const { query, consultationData, isLoadingOffenderData } = useConsultation()

    const toast = useToast()

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    const { control, handleSubmit, reset } = useForm<FormDataProps>();

    async function handleQuery({ cpf, name, surname, mother_name, date_of_birth }: FormDataProps) {

        try {
            setIsLoading(true)

            await query(cpf, name, surname, mother_name, date_of_birth)

            reset()

        } catch (error) {
            setIsLoading(false)
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Erro ao realizar a consulta"

            toast.show({
                placement: "top",
                render: ({ id }) => (
                    <ToastMessage
                        id={id}
                        title={title}
                        action="error"
                        onClose={() => toast.close(id)}
                    />
                )
            })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (consultationData && consultationData.length > 0) {
            navigation.navigate("listoffenders")
        }
    }, [consultationData, navigation])
    
    return (
        <VStack flex={1} bg="$gray600" >
            <Header
                title="Consultas"
                showBackButton
            />
            <ScrollView>
                <VStack flex={1} px="$2" gap="$2" alignItems="center" mt="$20">
                    <Controller
                        control={control}
                        name="cpf"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="CPF"
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
                        isLoading={isLoading}
                    />
                </VStack>
            </ScrollView>

        </VStack>
    );
}