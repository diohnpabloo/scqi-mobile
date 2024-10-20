import { Platform } from "react-native";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Box, Icon } from "@gluestack-ui/themed";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { ConsultationContextProvider } from "@contexts/ConsultationContext";

import { House, Search, Ellipsis } from "lucide-react-native";

import { Home } from "@screens/Home";
import { Consultation } from "@screens/Consultation";
import { Others } from "@screens/Others";
import { Offender } from "@screens/Offender";
import { ListOffenders } from "@screens/ListOffenders";

type AppRoutes = {
    home: undefined;
    consultation: undefined;
    others: undefined;
    offender: {offenderName: string};
    listoffenders: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {

    const { tokens } = gluestackUIConfig;

    return (
        <ConsultationContextProvider>
            <Box flex={1} bg="$gray700">
                <Navigator screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: tokens.colors.paletBlue600,
                    tabBarInactiveTintColor: tokens.colors.gray200,
                    tabBarStyle: {
                        backgroundColor: tokens.colors.gray600,
                        borderTopWidth: 0,
                        height: Platform.OS === 'android' ? 'auto' : 96,
                        paddingBottom: tokens.space[10],
                        paddingTop: tokens.space[6],
                    }

                }}>
                    <Screen
                        name="home"
                        component={Home}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Icon as={House} color={color} size="xl" />
                            )
                        }}
                    />
                    <Screen
                        name="consultation"
                        component={Consultation}
                        options={{
                            tabBarIcon: ({ color }) => <Icon as={Search} color={color} size="xl" />,
                        }}
                    />

                    <Screen
                        name="others"
                        component={Others}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Icon as={Ellipsis} color={color} size="xl" />
                            )
                        }}
                    />

                    <Screen
                        name="offender"
                        component={Offender}
                        options={{
                            tabBarButton: () => null
                        }}
                    />
                    <Screen
                        name="listoffenders"
                        component={ListOffenders}
                        options={{
                            tabBarButton: () => null
                        }}
                    />

                </Navigator>
            </Box>
        </ConsultationContextProvider>
    );
}