import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./AppRoutes";

export function Routes() {
    return(
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
     );
};