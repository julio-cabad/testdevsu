import React, { useCallback, useContext, useRef, useState } from "react";
import { Image, View } from "react-native";
import tw from "twrnc";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { StoreContext } from "../../../stores/Context.tsx";
import { observer } from "mobx-react-lite";
import Header from "../../palette/Header.tsx";
import Label from "../../palette/Label.tsx";
import { blueColor, grayColor } from "../../utils/Colors.tsx";
import SubmitButton from "../../palette/SubmitButton.tsx";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import DeletePicker from "../../palette/DeletePicker.tsx";
import axios from "axios";
import { checkIcon, errorIcon } from "../../utils/Icons";
import { StateType } from "../../utils/Const.tsx";
import MobileAlertsMessages from "../../palette/MobileAlertsMessages.tsx";
import Loading from "../../palette/Loading.tsx";

interface ComponentProps {

}

const DetailFinancialProducts: React.FC<ComponentProps> = () => {

  const { dataStore } = useContext(StoreContext);
  // @ts-ignore
  const { detailFinancialProducts, BASE_URL } = dataStore;
  const { date_release, date_revision, description, id, logo, name } = detailFinancialProducts;

  const [isVisible, setIsVisible]: StateType<boolean> = useState(false);
  const [loading, setIsLoading]: StateType<boolean> = useState(false);
  const [isOK, setIsOK]: StateType<boolean> = useState(false);
  const [msjText, setMsjText]: StateType<object> = useState({ head: "AVISO", body: "" });
  const [icon, setIcon] = useState<JSX.Element | null>(null);

  const bottomSheetDeleteRef = useRef<BottomSheetModal>(null);
  const handlePresentDeletePress = useCallback(() => bottomSheetDeleteRef.current?.present(), []);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleConfirm = () => {
    setIsVisible(false);
    isOK && navigation.navigate("ListFinancialProducts");
  };

  const handleDelete = async () => {
    bottomSheetDeleteRef.current?.close();
    const url = `${BASE_URL}/bp/products/${id}`;
    setIsLoading(true);
    try {
      await axios.delete(url);
      setIsLoading(false);
      setIsOK(true);
      setIcon(checkIcon);
      await dataStore?.FinancialProductsList();
      setIsVisible(true);
      setMsjText({ ...msjText, head: "PODUCTO ELIMINADO", body: `El producto ${name} exitosamente` });
    } catch (e) {
      setIsLoading(false);
      setIcon(errorIcon);
      setIsVisible(true);
      setMsjText({ ...msjText, head: "AVISO", body: "Ha ocurrido un error, intentelo nuevamente" });
    }
  };

  return (
    <BottomSheetModalProvider>
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
            <SubmitButton bgColor={grayColor} textColor={blueColor} text={"Editar"} loading={false} top={0}
                          onPress={() => navigation.navigate("EditFinancialProducts")} />
            <SubmitButton bgColor={"red"} textColor={"white"} text={"Eliminar"} loading={false} top={15}
                          onPress={handlePresentDeletePress} />
          </View>
        </View>
      </View>
      <DeletePicker bottomSheetModalRef={bottomSheetDeleteRef} name={name} handleDelete={handleDelete} />
      <MobileAlertsMessages isVisible={isVisible} body={msjText.body} head={msjText.head} textButton={"CONFIRMAR"}
                            icon={icon} handleOnPress={handleConfirm} />
      <Loading isLoading={loading} labelText={""} />
    </BottomSheetModalProvider>
  );
};


export default observer(DetailFinancialProducts);
