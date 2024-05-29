import React, { useCallback, useContext, useEffect } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
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
import { arrowIcon } from "../../utils/Icons";

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
  const handleDetailFinancialProducts = (detail) => {
    dataStore?.DetailFinancialProducts(detail);
    navigation.navigate("DetailFinancialProducts");
  };

  const Item = React.memo(({ item }) => {

    const { name, id } = item;

    return (
      <TouchableOpacity onPress={() => handleDetailFinancialProducts(item)}
                        style={tw`p-3 border-b border-slate-200 flex-row items-center justify-between`}>
        <View>
          <Text style={tw`text-gray-900 font-semibold`}>{name}</Text>
          <Text style={tw`text-slate-500 text-xs`}>{`ID: ${id}`}</Text>
        </View>
        {arrowIcon}
      </TouchableOpacity>
    );
  });

  const renderItem = useCallback(({ item }) => {
    return <Item item={item} />;
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header />
      {financialProductsList?.length > 0 &&
        <View style={tw`flex-1 p-6`}>
          <TextInput style={[tw`border rounded-lg px-2 border-slate-400 w-full`]} placeholder={"Buscar"} />
          <View style={tw`border border-slate-200 rounded-xl mt-5`}>
            <FlatList
              data={financialProductsList}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={financialProductsList.length + 5}
              removeClippedSubviews={true}
            />
          </View>
        </View>}
      {financialProductsList?.length === 0 &&
        <View style={tw`flex-1 p-6`}>
          <NoData text={"Sin registros"} />
          <SubmitButton bgColor={yellowColor} textColor={blueColor} text={"Agregar"} loading={false} top={0}
                        onPress={handleAddFinancialProduct} />
        </View>
      }

      {financialProductsList?.length > 0 &&
        <View style={tw`p-6`}>
          <SubmitButton bgColor={yellowColor} textColor={blueColor} text={"Agregar"} loading={false} top={0}
                        onPress={handleAddFinancialProduct} />
        </View>
      }


      <Loading isLoading={!financialProductsList} labelText={"Cargando..."} />
    </View>
  );
};


export default observer(ListFinancialProducts);
