import { ScrollView, useToast, VStack } from "@gluestack-ui/themed";
import { useForm, Controller } from "react-hook-form"

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { api } from "../service/api";
import { AppError } from "@utils/AppError";
import { ToastMessage } from "@components/ToastMessage";
import { useState } from "react";

type FormDataProps = {
    register: string
    name: string
    email: string
    password: string
}

export function UserRegistration() {
    const [isLoading, setIsloading] = useState(false)
    const { control, handleSubmit, reset } = useForm<FormDataProps>()

    const toast = useToast()

    async function handleRegisterNewUser({ register, name, email, password }: FormDataProps) {
        try {
            setIsloading(true)
            await api.post("users", { register, name, email, password })

            toast.show({
                placement: "top",
                render: ({ id }) => (
                    <ToastMessage
                        id={id}
                        title="Usuário cadastrado com sucesso!"
                        action="success"
                        onClose={() => toast.close(id)}
                    />
                )
            })

            reset()
        } catch (error) {
            setIsloading(false)
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Matrícula já está cadastrada."

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
            setIsloading(false)
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <Header
                title="Registrar usuário"
                showBackButton
            />
            <VStack flex={1} bg="$gray600" px="$2" pb="$16" >
                <VStack flex={1} gap="$4" mt="$20">

                    <Controller
                        control={control}
                        name="register"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Matrícula"
                                onChangeText={onChange}
                                value={value}
                                maxLength={8}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Nome"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="E-mail"
                                keyboardType="email-address"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                            />
                        )}
                    />

                    <Button
                        title="Criar"
                        onPress={handleSubmit(handleRegisterNewUser)}
                        isLoading={isLoading}
                    />
                </VStack>
            </VStack>
        </ScrollView>
    )
}