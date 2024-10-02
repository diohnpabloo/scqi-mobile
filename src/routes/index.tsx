import { NavigationContainer } from "@react-navigation/native";


import { AuthRoutes } from "@routes/AuthRoutes";
import { AppRoutes } from "./AppRoutes";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";
import { useConsultation } from "@hooks/useConsultation";
import { OffenderRegistration } from "@screens/OffenderRegistration";


export function Routes() {
    const { user, isLoadingUserData } = useAuth()
    if (isLoadingUserData) {
        return <Loading />
    }

    return (
        <NavigationContainer>
            {user.id ? <OffenderRegistration /> : <AuthRoutes />}
        </NavigationContainer>
    )
}