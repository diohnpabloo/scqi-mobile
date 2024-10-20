import { Heading, HStack, Icon } from "@gluestack-ui/themed";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { useAuth } from "@hooks/useAuth";
import { BackButton } from "./BackButton";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/AppRoutes";

type Props = {
    title: string;
    showBackButton?: boolean
}

export function Header({ title, showBackButton }: Props) {
    const { user } = useAuth()
    const { tokens } = gluestackUIConfig

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleGoBack() {
        navigation.navigate("home")
    }

    return (
        <HStack bg="$gray400" pt="$16" pb="$5" px="$4" alignItems="center">
            {
                showBackButton && <BackButton onPress={handleGoBack}/> 
            }
            
            <Heading flex={1} color="$gray100" fontFamily="$heading" fontSize="$lg">{title}</Heading>

            {user.role === 'admin' &&
                <DrawerToggleButton
                    tintColor={tokens.colors.gray100}
                    pressColor={tokens.colors.paletBlue600}
                    accessibilityLabel="Menu Admin"
                />}
        </HStack>
    );
}