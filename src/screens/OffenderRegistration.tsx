import { useCallback, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { HStack, ScrollView, Text, useToast, VStack } from "@gluestack-ui/themed";

import { Controller, useForm } from "react-hook-form";
import { FormDataProps } from "./Consultation";
import photoDefault from "@assets/userPhotoDefault.png"

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { UserPhoto } from "@components/UserPhoto";

import * as ImagePicker from "expo-image-picker"
import { AppError } from "@utils/AppError";
import { api } from "../service/api";
import { ToastMessage } from "@components/ToastMessage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/AppRoutes";

export function OffenderRegistration() {
    const [isLoading, setIsLoading] = useState(false)
    const [photo, setPhoto] = useState('')
    const [photoObject, setPhotoObject] = useState<ImagePicker.ImagePickerAsset | null>(null)

    const { control, handleSubmit, reset } = useForm<FormDataProps>()

    const toast = useToast()
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function resetForm() {
        reset()
        setPhoto('')
        setPhotoObject(null)
        setIsLoading(false)
    }

    useFocusEffect(useCallback(() => {
        resetForm()
    }, []))

    async function handleOffenderPhotoSelect() {
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [8, 4],
                allowsEditing: true,
            })
            if (photoSelected.canceled) {
                return
            }

            if (!photoSelected.assets[0].uri) {
                throw new AppError("Nenhuma foto selecionada.")
            }

            setPhotoObject(photoSelected.assets[0])
            setPhoto(photoSelected.assets[0].uri)
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Nenhuma foto selecionada."
            Alert.alert("Imagem", title)
        }
    }

    async function handleRegistration({ cpf, name, surname, mother_name, date_of_birth, address }: FormDataProps) {
        try {
            setIsLoading(true)
            if (!photoObject) {
                throw new AppError("Nenhuma foto selecionada.")
            }
            const fileExtension = photoObject.uri.split(".").pop()

            const photoFile = {
                name: `${name}.${fileExtension}`.toLowerCase(),
                uri: photoObject.uri,
                type: `${photoObject.type}/${fileExtension}`
            } as any;

            const offenderInformationUploadForm = new FormData()
            offenderInformationUploadForm.append('cpf', cpf || '')
            offenderInformationUploadForm.append('name', name || "Não cadastrado")
            offenderInformationUploadForm.append('surname', surname || "Não cadastrado")
            offenderInformationUploadForm.append('mother_name', mother_name || "Não cadastrado")
            offenderInformationUploadForm.append('address', address || "Não cadastrado")
            offenderInformationUploadForm.append('date_of_birth', date_of_birth || "Não cadastrado")
            offenderInformationUploadForm.append('avatar', photoFile)

            await api.post("offenders", offenderInformationUploadForm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            toast.show({
                placement: "top",
                render: ({ id }) => (
                    <ToastMessage
                        id={id}
                        title="Infrator cadastrado com sucesso"
                        action="success"
                        onClose={() => toast.close(id)}

                    />
                )
            })

            resetForm()
            navigation.navigate("home")

        } catch (error) {
            setIsLoading(false)
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possível registrar o infrator."

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

    return (
        <VStack flex={1} bg="$gray600" >
            <Header
                title="Registro de infrator"
                showBackButton
            />
            <ScrollView>
                <VStack px="$2" mt="$10" gap="$4">
                    <Controller
                        control={control}
                        name="cpf"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="CPF"
                                onChangeText={onChange}
                                value={value}
                                keyboardType="number-pad"
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
                        name="surname"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Apelido"
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
                                placeholder="Nome da mãe"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="address"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Endereço: Rua, nº - Bairro"
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
                                placeholder="Data de nascimento ex: 16/07/1998"
                                onChangeText={onChange}
                                value={value}
                                keyboardType="numbers-and-punctuation"
                            />
                        )}
                    />

                    <HStack alignItems="center" gap="$2">
                        <UserPhoto
                            source={photo.length === 0 ? photoDefault : { uri: photo }}
                            alt="Imagem do infrator"
                            size="xl"
                        />
                        <TouchableOpacity onPress={handleOffenderPhotoSelect}>
                            <Text color="$paletBlue600">Adicionar imagem</Text>
                        </TouchableOpacity>
                    </HStack>


                    <Button
                        title="Cadastrar"
                        onPress={handleSubmit(handleRegistration)}
                        isLoading={isLoading}
                    />
                </VStack>
            </ScrollView>
        </VStack >
    )
}