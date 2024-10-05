import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { HStack, ScrollView, Text, VStack } from "@gluestack-ui/themed";

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

export function OffenderRegistration() {
    const [isLoading, setIsLoading] = useState(false)
    const [photo, setPhoto] = useState('')
    const [photoObject, setPhotoObject] = useState<ImagePicker.ImagePickerAsset | null>(null)
    const { control, handleSubmit } = useForm<FormDataProps>()

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

    async function handleRegistration({ cpf, name, surname, mother_name, date_of_birth }: FormDataProps) {
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
            offenderInformationUploadForm.append('cpf', cpf)
            offenderInformationUploadForm.append('name', name)
            offenderInformationUploadForm.append('surname', surname)
            offenderInformationUploadForm.append('mother_name', mother_name)
            offenderInformationUploadForm.append('date_of_birth', date_of_birth)
            offenderInformationUploadForm.append('avatar', photoFile)

            await api.post("offenders", offenderInformationUploadForm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

        } catch (error) {
            setIsLoading(false)
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possível registrar o infrator."
            Alert.alert("Registro", title)
        }
    }

    return (
        <VStack flex={1} bg="$gray600" >
            <Header title="Registro de infrator" />
            <ScrollView >
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
                        name="date_of_birth"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Data de nascimento ex: 16071998"
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