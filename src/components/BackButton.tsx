import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Icon } from "@gluestack-ui/themed";
import { ChevronLeft } from "lucide-react-native"

type Props = TouchableOpacityProps
export function BackButton({...rest }: Props) {
    return (
        <TouchableOpacity
            style={{ marginRight: 20 }}
            {...rest}
        >
            <Icon as={ChevronLeft} color="$gray100" size="xl" />
        </TouchableOpacity>
    )
}