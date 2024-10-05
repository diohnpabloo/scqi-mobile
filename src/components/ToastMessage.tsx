import {
    ToastDescription,
    ToastTitle,
    Toast,
    Pressable,
    Icon,
    VStack
} from "@gluestack-ui/themed";
import { X } from "lucide-react-native";

type Props = {
    id: string,
    title: string,
    description?: string
    action?: "error" | "success"
    onClose: () => void
};

export function ToastMessage({ id, title, description, action, onClose }: Props) {
    return (
        <Toast
            nativeID={`toast-${id}`}
            action="success"
            bgColor={action === "success" ? "$green500" : "$red500"}
        >
            <VStack w="$full" space="xs">
                <Pressable alignSelf="flex-end" onPress={onClose}>
                    <Icon as={X} color="$gray100" size="lg" />
                </Pressable>

                <ToastTitle color="$white" fontFamily="$heading">{title}</ToastTitle>
                {description && <ToastDescription color="$white" fontFamily="$body">{description}</ToastDescription>}
            </VStack>
        </Toast>
    )
}