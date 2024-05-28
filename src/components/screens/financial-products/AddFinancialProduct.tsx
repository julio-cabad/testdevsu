import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import Header from "../../palette/Header.tsx";
import Label from "../../palette/Label.tsx";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { addFinancialProductSchema, initialFinancialProductsValues } from "../../utils/YupSchemas.tsx";
import EditText from "../../palette/EditText.tsx";

interface ComponentProps {

}

const AddFinancialProduct: React.FC<ComponentProps> = () => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const onSubmit = () => {
  };

  return (
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


              return (
                <View style={tw`flex-1 items-center`}>
                  <EditText label={"ID"} top={0} field={"id"} handleChange={handleChange} values={values}
                            setFieldValue={setFieldValue} errors={errors} maxLength={10} />

                  <EditText label={"Nombre"} top={15} field={"name"} handleChange={handleChange} values={values}
                            setFieldValue={setFieldValue} errors={errors} maxLength={100} />

                </View>
              );
            }}</Formik>

        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};


export default AddFinancialProduct;
