import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";
import { USER_ROLES } from "@utils/roles";

import { AuthRoutes } from "@routes/AuthRoutes";
import { AppRoutes } from "./AppRoutes";
import { Loading } from "@components/Loading";
import { AdminRoutes } from "./AdminRoutes";


export function Routes() {
    const { user, isLoadingUserData } = useAuth()
    if (isLoadingUserData) {
        return <Loading />
    }

    function AccessRoute() {
        switch(user.role) {
            case USER_ROLES.ADMIN:
                return <AdminRoutes />
            case USER_ROLES.CUSTOMER:
                return <AppRoutes />
                default: <AppRoutes />
        }
    }

    return (
        <NavigationContainer>
            {user.id ? <AccessRoute /> : <AuthRoutes />}
        </NavigationContainer>
    )
}