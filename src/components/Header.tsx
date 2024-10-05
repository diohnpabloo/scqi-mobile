import { Heading, HStack } from "@gluestack-ui/themed";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { useAuth } from "@hooks/useAuth";

type Props = {
    title: string;
}

export function Header({ title }: Props) {
    const { user } = useAuth()
    const { tokens } = gluestackUIConfig

    return (
        <HStack bg="$gray400" pt="$16" pb="$5" px="$8" alignItems="center">
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