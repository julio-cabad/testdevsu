import React from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import ListFinancialProducts from "../screens/financial-products/ListFinancialProducts.tsx";
import AddFinancialProduct from "../screens/financial-products/AddFinancialProduct.tsx";


interface ComponentProps {
}


const Stack = createStackNavigator();

const Routes: React.FC<ComponentProps> = () => {


  return (
    <Stack.Navigator
      initialRouteName={"ListFinancialProducts"}
      screenOptions={{
        headerShown: false,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
        headerMode: "float"
      }}>
      <Stack.Screen name="Login" component={ListFinancialProducts} />
      <Stack.Screen name="AddFinancialProduct" component={AddFinancialProduct} />
    </Stack.Navigator>
  );
};

export default Routes;
