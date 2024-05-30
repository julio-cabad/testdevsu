import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Keyboard, Text, View } from "react-native";
import tw from "twrnc";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import Header from "../../palette/Header.tsx";
import { Formik } from "formik";
import { addFinancialProductSchema, initialFinancialProductsValues } from "../../utils/YupSchemas.tsx";
import EditText from "../../palette/EditText.tsx";
import DateInput from "../../palette/DateInput.tsx";
import SubmitButton from "../../palette/SubmitButton.tsx";
import { blueColor, grayColor, yellowColor } from "../../utils/Colors.tsx";
import CalendarSheetPicker from "../../palette/CalendarSheetPicker.tsx";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StoreContext } from "../../../stores/Context.tsx";
import { observer } from "mobx-react-lite";
import { StateType } from "../../utils/Const.tsx";
import axios from "axios";
import { checkIcon, errorIcon } from "../../utils/Icons";
import MobileAlertsMessages from "../../palette/MobileAlertsMessages.tsx";
import Loading from "../../palette/Loading.tsx";


interface ComponentProps {

}


const EditFinancialProducts: React.FC<ComponentProps> = () => {

  const { dataStore } = useContext(StoreContext);
  // @ts-ignore
  const { detailFinancialProducts, BASE_URL } = dataStore;

  const { date_release, date_revision, description, id, logo, name } = detailFinancialProducts;

  const [isVisible, setIsVisible]: StateType<boolean> = useState(false);
  const [loading, setIsLoading]: StateType<boolean> = useState(false);
  const [isOK, setIsOK]: StateType<boolean> = useState(false);
  const [msjText, setMsjText]: StateType<object> = useState({ head: "AVISO", body: "" });
  const [icon, setIcon] = useState<JSX.Element | null>(null);
  const [initialFinancialProductsValues, setInitialFinancialProductsValues] = useState(null);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    setInitialFinancialProductsValues({
      ...initialFinancialProductsValues, id, date_release, date_revision, description, logo, name
    });
  }, [detailFinancialProducts]);

  const bottomSheetCalendarRef = useRef<BottomSheetModal>(null);
  const handlePresentCalendarPress = useCallback(() => bottomSheetCalendarRef.current?.present(), []);

  const handleConfirm = () => {
    setIsVisible(false);
    isOK && navigation.navigate("ListFinancialProducts");
  };

  const onSubmit = async (values: any, { resetForm }) => {

    Keyboard.dismiss();

    const url = `${BASE_URL}/bp/products/${id}`;

    setIsLoading(true);

    try {
      console.log('sdsdsd', url)
      await axios.put(url, values);
      setIsLoading(false);
      setIsOK(true);
      setIcon(checkIcon);
      await dataStore?.FinancialProductsList();
      setIsVisible(true);
      setMsjText({ ...msjText, head: "PODUCTO EDITADO", body: "Producto editado exitosamente" });
      resetForm();
    } catch (e) {
      console.log(e)
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
        {initialFinancialProductsValues &&
          <View style={tw`flex-1 p-6`}>
            <KeyboardAwareScrollView
              automaticallyAdjustContentInsets={false}
              keyboardShouldPersistTaps="always"
              scrollEventThrottle={10}
              extraHeight={20}
              contentContainerStyle={{ flexGrow: 1 }}
              resetScrollToCoords={{ x: 0, y: 0 }}>

              <Formik
                validationSchema={addFinancialProductSchema}
                initialValues={initialFinancialProductsValues}
                onSubmit={onSubmit}
              >
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    setFieldValue,
                    resetForm
                  }) => {

                  return (
                    <View style={tw`flex-1`}>
                      <EditText label={"ID"} top={0} field={"id"} handleChange={handleChange} values={values}
                                setFieldValue={setFieldValue} errors={errors} max={10} editable={false} />

                      <EditText label={"Nombre"} top={0} field={"name"} handleChange={handleChange} values={values}
                                setFieldValue={setFieldValue} errors={errors} max={100} editable={true} />

                      <EditText label={"Descripción"} top={0} field={"description"} handleChange={handleChange}
                                values={values} setFieldValue={setFieldValue} errors={errors} max={200} multiline
                                numberOfLines={40} />

                      <EditText label={"Logo"} top={0} field={"logo"} handleChange={handleChange}
                                values={values} setFieldValue={setFieldValue} errors={errors} max={2000} />

                      <DateInput label={"Fecha de liberación"} top={0} field={"date_release"} calendar={true}
                                 values={values} errors={errors} onPress={handlePresentCalendarPress} />


                      <DateInput label={"Fecha de revisión"} top={0} field={"date_revision"} calendar={false}
                                 values={values} errors={errors} onPress={handlePresentCalendarPress} />


                      <SubmitButton bgColor={yellowColor} textColor={blueColor} text={"Enviar"} loading={false} top={15}
                                    onPress={() => handleSubmit()} />

                      <SubmitButton bgColor={grayColor} textColor={blueColor} text={"Reiniciar"} loading={false} top={15}
                                    onPress={() => {
                                      Keyboard.dismiss();
                                      resetForm();
                                    }}
                      />

                      <CalendarSheetPicker bottomSheetModalRef={bottomSheetCalendarRef} setFieldValue={setFieldValue} />

                    </View>
                  );
                }}</Formik>
            </KeyboardAwareScrollView>
          </View>}
        <MobileAlertsMessages isVisible={isVisible} body={msjText.body} head={msjText.head} textButton={"CONFIRMAR"}
                              icon={icon} handleOnPress={handleConfirm} />
        <Loading isLoading={loading} labelText={""} />
      </View>
    </BottomSheetModalProvider>
  );
};


export default observer(EditFinancialProducts);
