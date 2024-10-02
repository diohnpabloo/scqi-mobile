import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";

type AuthRoutes = {
    signin: undefined;
    signup: undefined;
}

export type AuthRoutesProps = NativeStackNavigationProp<AuthRoutes>

export function AuthRoutes() {
    const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen
                name="signin"
                component={SignIn}
            />
            <Screen
                name="signup"
                component={SignUp}
            />
        </Navigator>
    )
}