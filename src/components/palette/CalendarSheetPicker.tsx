import React, { useCallback, useMemo } from "react";
import {  View } from "react-native";
import tw from "twrnc";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { blueColor, grayColor, yellowColor } from "../utils/Colors.tsx";
import Label from "./Label.tsx";
import CalendarPicker from "react-native-calendar-picker";
import { add, format } from "date-fns";

interface ComponentProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  setSwitch: React.Dispatch<React.SetStateAction<boolean>>;
  setFieldValue: (field: string, value: any) => void;
}

const CalendarSheetPicker: React.FC<ComponentProps> = ({ bottomSheetModalRef, setSwitch, setFieldValue }) => {

  // const [selectedDate, selectedDate] = useState(null)

  const snapPoints = useMemo(() => ["85%", "86%"], []);

  const handleSheetChanges = useCallback((index: number) => index === -1 && setSwitch(false), []);

  const minDate = new Date();

  const onDateChange = (date: any) => {
    const date_revision_ = add(new Date(date), { years: 1 });
    const dateRelease = format(date, "dd-MM-yyyy");
    const date_revision = format(date_revision_, "dd-MM-yyyy");

    setFieldValue("date_release", dateRelease);
    setFieldValue("date_revision", date_revision);
    setFieldValue("date_release", dateRelease);
    // @ts-ignore
    bottomSheetModalRef.current.close();

  };


  return (
    <BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}
                      containerStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <View style={tw`p-6 flex-1`}>

        <Label text={"Fecha de liberación"} color={blueColor} font={"700"} size={18} left={0} top={0} />

        <View style={tw`w-full mt-5`}>
          <CalendarPicker

            minDate={minDate}
            todayBackgroundColor={grayColor}
            selectedDayColor={yellowColor}
            selectedDayTextColor={blueColor}
            onDateChange={onDateChange}

            weekdays={["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]}
            months={[
              "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
              "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ]}
            previousTitle="Anterior"
            nextTitle="Siguiente"

          />
        </View>
      </View>
    </BottomSheetModal>
  );
};


export default CalendarSheetPicker;

