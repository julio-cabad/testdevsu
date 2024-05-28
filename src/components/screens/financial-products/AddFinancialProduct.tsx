import React, { useCallback, useRef, useState } from "react";
import { Keyboard, View } from "react-native";
import tw from "twrnc";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import Header from "../../palette/Header.tsx";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { addFinancialProductSchema, initialFinancialProductsValues } from "../../utils/YupSchemas.tsx";
import EditText from "../../palette/EditText.tsx";
import DateInput from "../../palette/DateInput.tsx";
import SubmitButton from "../../palette/SubmitButton.tsx";
import { blueColor, grayColor, yellowColor } from "../../utils/Colors.tsx";
import { StateType } from "../../utils/Const.tsx";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import CalendarSheetPicker from "../../palette/CalendarSheetPicker.tsx";

interface ComponentProps {

}

const AddFinancialProduct: React.FC<ComponentProps> = () => {

  const [switchCalendar, setSwitchCalendar]: StateType<boolean> = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const bottomSheetCalendarRef = useRef<BottomSheetModal>(null);
  const handlePresentCalendarPress = useCallback(() => bottomSheetCalendarRef.current?.present(), []);

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <BottomSheetModalProvider>
      <View style={tw`flex-1 bg-white`}>
        <Header />
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

                console.log(errors);
                console.log(values);

                return (
                  <View style={tw`flex-1`}>
                    <EditText label={"ID"} top={0} field={"id"} handleChange={handleChange} values={values}
                              setFieldValue={setFieldValue} errors={errors} maxLength={10} />

                    <EditText label={"Nombre"} top={0} field={"name"} handleChange={handleChange} values={values}
                              setFieldValue={setFieldValue} errors={errors} maxLength={100} />

                    <EditText label={"Descripción"} top={0} field={"description"} handleChange={handleChange}
                              values={values} setFieldValue={setFieldValue} errors={errors} maxLength={100} multiline
                              numberOfLines={40} />

                    <EditText label={"Logo"} top={0} field={"logo"} handleChange={handleChange}
                              values={values} setFieldValue={setFieldValue} errors={errors} maxLength={100} />

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

                    <CalendarSheetPicker bottomSheetModalRef={bottomSheetCalendarRef} setSwitch={setSwitchCalendar}
                                         setFieldValue={setFieldValue} />

                  </View>
                );
              }}</Formik>

          </KeyboardAwareScrollView>
        </View>
      </View>
    </BottomSheetModalProvider>
  );
};


export default AddFinancialProduct;
