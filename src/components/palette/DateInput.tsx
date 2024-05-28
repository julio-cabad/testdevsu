import React, { useState } from "react";
import { Text, View, TextInputProps, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { StateType } from "../utils/Const.tsx";
import Label from "./Label.tsx";
import { blueColor } from "../utils/Colors.tsx";
import { calendarIcon } from "../utils/Icons";

type PropsInput = TextInputProps & {
  label: string;
  top: number;
  field: string;
  handleChange: (field: string, text: string) => void;
  values: { [key: string]: string };
  setFieldValue: (field: string, value: any) => void;
  errors?: any;
};


const DateInput = ({
                     label,
                     top,
                     field,
                     errors,
                     handleChange,
                     values,
                     setFieldValue,
                     ...props
                   }: PropsInput): React.JSX.Element => {

  const [autoCapitalize, setAutoCapitalize]: StateType<string> = useState("none");


  const handleChangeText = (text: string) => {
    handleChange(field, text);
    setFieldValue(field, text);
  };

  return (
    <View style={[tw`w-full`, { marginTop: top }]}>
      <Label text={label} color={blueColor} font={"400"} size={11} left={5} top={0} />
      <View style={[tw`w-full flex-row border rounded-lg border-slate-400`]}>
        <TextInput
          style={[tw`px-2 w-full`,{width: '80%'}]}
          value={values[field]}
          editable={false}
          onChangeText={handleChangeText}
          autoCapitalize={autoCapitalize as "none" | "sentences" | "words" | "characters" | undefined}
          {...[props]}
        />
        <TouchableOpacity style={[tw`rounded-lg items-end pr-1 justify-center`, {height:48, width: '20%'}]}>
          {calendarIcon}
        </TouchableOpacity>
      </View>
      {!!errors[field] !== undefined &&
        <Text style={tw`text-red-500 text-xs ml-2`}>{errors[field]}</Text>}
    </View>
  );
};


export default DateInput;
