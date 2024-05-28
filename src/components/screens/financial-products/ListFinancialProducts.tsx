import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import tw from "twrnc";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import Loading from "../../palette/Loading.tsx";
import { StoreContext } from "../../../stores/Context.tsx";
import { observer } from "mobx-react-lite";
import Header from "../../palette/Header.tsx";
import NoData from "../../palette/NoData.tsx";
import SubmitButton from "../../palette/SubmitButton.tsx";
import { blueColor, yellowColor } from "../../utils/Colors.tsx";

interface ComponentProps {

}


const ListFinancialProducts: React.FC<ComponentProps> = () => {

  const { dataStore } = useContext(StoreContext);
  // @ts-ignore
  const { financialProductsList } = dataStore;

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    try {
      dataStore?.FinancialProductsList();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleAddFinancialProduct = () => navigation.navigate("AddFinancialProduct");

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header />
      {financialProductsList?.length > 0 && <View style={tw`flex-1 p-6`}>

      </View>}
      {financialProductsList?.length === 0 && <NoData text={"Sin registros"} />}
      <View style={tw`w-full p-6`}>
        <SubmitButton bgColor={yellowColor} textColor={blueColor} text={"Agregar"} loading={false} top={0}
                      onPress={handleAddFinancialProduct} />
      </View>

      <Loading isLoading={!financialProductsList} labelText={"Cargando..."} />
    </View>
  );
};


export default observer(ListFinancialProducts);
