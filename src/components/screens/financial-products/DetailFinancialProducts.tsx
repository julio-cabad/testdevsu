import React, { useContext } from "react";
import { Image, Keyboard, Text, View } from "react-native";
import tw from "twrnc";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { StoreContext } from "../../../stores/Context.tsx";
import { observer } from "mobx-react-lite";
import Header from "../../palette/Header.tsx";
import Label from "../../palette/Label.tsx";
import { blueColor, grayColor, redColor } from "../../utils/Colors.tsx";
import SubmitButton from "../../palette/SubmitButton.tsx";

interface ComponentProps {

}

const DetailFinancialProducts: React.FC<ComponentProps> = () => {

  const { dataStore } = useContext(StoreContext);
  // @ts-ignore
  const { detailFinancialProducts } = dataStore;
  const { date_release, date_revision, description, id, logo, name } = detailFinancialProducts;

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header />
      <View style={tw`flex-1 p-6 flex-col items-center justify-between`}>

        <View>

          <View style={tw`mt-5`}>
            <Label text={`ID: ${id}`} color={blueColor} font={"700"} size={24} left={0} top={0} />
            <Label text={`Informacion extra`} color={"gray"} font={"400"} size={11} left={0} top={0} />
          </View>

          <View style={tw`mt-7 pl-3 pr-7 w-full flex-row items-center justify-between`}>
            <Label text={`Nombre`} color={"gray"} font={"400"} size={12} left={0} top={0} />
            <Label text={name} color={"gray"} font={"800"} size={12} left={0} top={0} />

          </View>

          <View style={tw`mt-2 pl-3 pr-7 w-full flex-row items-center justify-between`}>
            <Label text={`Descripción`} color={"gray"} font={"400"} size={12} left={0} top={0} />
            <Label text={description} color={"gray"} font={"800"} size={12} left={0} top={0} />
          </View>

          <View style={tw`mt-2 pl-3 pr-7 w-full flex-row`}>
            <Label text={`Logo`} color={"gray"} font={"400"} size={12} left={0} top={0} />
          </View>

          <View style={tw`mt-5 items-center justify-center flex-row w-full`}>
            <Image source={{ uri: logo }} width={260} height={150} resizeMode={"stretch"} />
          </View>

          <View style={tw`mt-5 pl-3 pr-7 w-full flex-row items-center justify-between`}>
            <Label text={`Fecha de liberación`} color={"gray"} font={"400"} size={12} left={0} top={0} />
            <Label text={date_release} color={"gray"} font={"800"} size={12} left={0} top={0} />
          </View>

          <View style={tw`mt-2 pl-3 pr-7 w-full flex-row items-center justify-between`}>
            <Label text={`Fecha de revisión`} color={"gray"} font={"400"} size={12} left={0} top={0} />
            <Label text={date_revision} color={"gray"} font={"800"} size={12} left={0} top={0} />
          </View>

        </View>

        <View style={tw`w-full`}>
          <SubmitButton bgColor={grayColor} textColor={blueColor} text={"Editar"} loading={false} top={0} />
          <SubmitButton bgColor={'red'} textColor={'white'} text={"Eliminar"} loading={false} top={15} />
        </View>



      </View>
    </View>
  )
    ;
};


export default observer(DetailFinancialProducts);
