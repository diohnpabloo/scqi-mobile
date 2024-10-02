import { Platform } from "react-native";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@gluestack-ui/themed";

import { House, Search, Menu } from "lucide-react-native";

import { Home } from "@screens/Home";
import { Consultation } from "@screens/Consultation";
import { Others } from "@screens/Others";
import { Offender } from "@screens/Offender";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { ConsultationContextProvider } from "@contexts/ConsultationContext";

type AppRoutes = {
    home: undefined;
    consultation: undefined;
    others: undefined;
    offender: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {

    const { tokens } = gluestackUIConfig;

    return (
        <ConsultationContextProvider>
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
                            <Icon as={Menu} color={color} size="xl" />
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

            </Navigator>
        </ConsultationContextProvider>
    );
}