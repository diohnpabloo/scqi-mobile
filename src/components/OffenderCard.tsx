import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { Box, Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { ConsultationDTO } from "@dtos/ConsultationDTO";
import { Image } from "@gluestack-ui/themed";
import { formatCPF, formateDate } from "@utils/Formats";

type Props = TouchableOpacityProps & {
    data: ConsultationDTO
}

export function OffenderCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <VStack bg="$gray400" p="$5" rounded="$md" mt="$5" gap="$2">
                <Heading color="$paletBlue600" fontSize="$2xl">Identificação do infrator</Heading>
                <HStack alignItems="center" gap="$2">
                    <Image
                        source={{uri: `https://offendersimage.s3.us-east-2.amazonaws.com/${data?.avatar}`}}
                        style={{ width: 100, height: 130}}
                        alt="Imagem do infrator"
                    />
                    <VStack gap="$1">
                        <Heading color="$white" fontSize="$sm" textTransform="uppercase">{data.name}</Heading>
                        <Text color="$gray200" fontSize="$xs">CPF: {data.cpf ? formatCPF(data.cpf): "Não cadastrado"}</Text>
                        <Text color="$gray200" fontSize="$xs">Apelido: {data.surname ? data.surname : "Não cadastrado" }</Text>
                        <Text color="$gray200" fontSize="$xs">Mãe: {data.mother_name ? data.mother_name : "Não cadastrado" }</Text>
                        <Text color="$gray200" fontSize="$xs">Nascimento: {data.date_of_birth ? formateDate(data.date_of_birth) : "Não cadastrado"}</Text>
                        <Text color="$gray200" fontSize="$xs">Endereço: {data.address ? data.address : "Não cadastrado" }</Text>
                    </VStack>
                </HStack>
            </VStack>
        </TouchableOpacity >
    )
}