import { useState } from "react"
import { Center, Heading, Image, ScrollView, useToast, VStack } from "@gluestack-ui/themed";
import Logo from "@assets/logo.png"

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";


import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";
import { ToastMessage } from "@components/ToastMessage";


type FormData = {
    register: string;
    password: string;
};

const signInSchema = yup.object({
    register: yup.string().required('Informe a matrícula.'),
    password: yup.string().required('Informe a senha.'),
})

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false)
    const { user, SignIn } = useAuth()
    const toast = useToast()

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(signInSchema)
    });


    async function handleSignIn({ register, password }: FormData) {
        try {
            setIsLoading(true)
            await SignIn(register, password)
        } catch (error) {
            setIsLoading(false)
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possível fazer login!"

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
        }


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
                    <Heading color="$gray100">Acesse sua conta</Heading>

                    <Controller
                        control={control}
                        name="register"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Matrícula"
                                keyboardType="number-pad"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.register?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Button
                        title="Acessar"
                        onPress={handleSubmit(handleSignIn)}
                        isLoading={isLoading}
                    />
                </Center>

            </VStack>
        </ScrollView>
    )
}