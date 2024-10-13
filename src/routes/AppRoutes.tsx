import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { Report } from "../screens/Report";

type  AppTypeRoutes = {
    Home: undefined;
    Report: undefined;
};

export type RoutesProps = NativeStackNavigationProp<AppTypeRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppTypeRoutes>();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="Home" component={Home} />
            <Screen name="Report" component={Report} />
        </Navigator>
    );
}