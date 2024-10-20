import { useState } from "react";
import { Alert } from "react-native";
import { ScrollView, useToast, VStack } from "@gluestack-ui/themed";
import { Controller, useForm } from "react-hook-form"

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from "@components/Input";

import { api } from "../service/api";
import { AppError } from "@utils/AppError";
import { ToastMessage } from "@components/ToastMessage";

type FormDataProps = {
    register: string
    is_paid: string
}

export function UpdateIsPaid() {
    const [isLoading, setIsLoading] = useState(false)
    const { control, handleSubmit, reset } = useForm<FormDataProps>()

    const toast = useToast()

    async function updatedPropUser({ register, is_paid }: FormDataProps) {
        try {
            setIsLoading(true)

            const isPaidBoolean = is_paid.toLowerCase() === 'true'
            await api.patch("users", { register, is_paid: isPaidBoolean })

            toast.show({
                placement: 'top',
                render: (({ id }) => (
                    <ToastMessage
                        id={id}
                        title="Status de pagamento atualizado com sucesso."
                        action="success"
                        onClose={() => toast.close(id)}
                    />
                ))
            })

            reset()

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possível atualizar o status de pagamento."

            toast.show({
                placement: 'top',
                render: (({ id }) => (
                    <ToastMessage
                        id={id}
                        title={title}
                        action="error"
                        onClose={() => toast.close(id)}
                    />
                ))
            })

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <VStack flex={1} bg="$gray600">
            <Header
                title="Atualizar pagamento"
                showBackButton
            />

            <ScrollView>
                <VStack px="$2" mt="$10" gap="$4">
                    <Controller
                        control={control}
                        name="register"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Matrícula"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="is_paid"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="true ou false"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Button
                        title="Atualizar"
                        onPress={handleSubmit(updatedPropUser)}
                        isLoading={isLoading}
                    />
                </VStack>
            </ScrollView>
        </VStack>
    )
}