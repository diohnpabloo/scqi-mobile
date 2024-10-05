import { GestureHandlerRootView } from "react-native-gesture-handler"
import { createDrawerNavigator, DrawerNavigationProp } from "@react-navigation/drawer"

import { AppRoutes } from "./AppRoutes"
import { ConsultationContextProvider } from "@contexts/ConsultationContext"
import { OffenderRegistration } from "@screens/OffenderRegistration"

import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { Box } from "@gluestack-ui/themed"

type AdminRoutes = {
    feed: undefined
    consultation: undefined
    offender: undefined
    user_registration: undefined
    offender_registration: undefined
    others: undefined
}

export type AdminNavigatorRoutesProps = DrawerNavigationProp<AdminRoutes>

const { Navigator, Screen } = createDrawerNavigator<AdminRoutes>()

export function AdminRoutes() {
    const { tokens } = gluestackUIConfig;

    return (
        <GestureHandlerRootView>
            <ConsultationContextProvider>
                <Box flex={1} bg="$gray700" >
                    <Navigator screenOptions={{
                        headerShown: false,
                        drawerActiveBackgroundColor: "transparent",
                        drawerInactiveBackgroundColor: "transparent",
                        drawerActiveTintColor: tokens.colors.paletBlue600,
                        drawerInactiveTintColor: tokens.colors.gray200,
                        drawerHideStatusBarOnOpen: true,
                        drawerStyle: {
                            backgroundColor: tokens.colors.gray600,
                            width: "50%"
                        },

                    }}>
                        <Screen
                            name="feed"
                            component={AppRoutes}
                            options={{ drawerLabel: "Início" }}
                        />
                        <Screen
                            name="offender_registration"
                            component={OffenderRegistration}
                            options={{ drawerLabel: "Registrar infrator" }}
                        />
                    </Navigator>
                </Box>
            </ConsultationContextProvider>
        </GestureHandlerRootView>
    )
}