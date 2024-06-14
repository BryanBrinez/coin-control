import { useState } from "react";
import { Pressable,  TextInput  } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function SelectDate({initDate, setInitDate, styles}) {
  const [showDate, setshowDate] = useState(false);

  const handleDateSelection= () =>  {
    setshowDate(!showDate);
  }

  const onDateSelection = (event, selectedDate) => {
    if (event.type === "set") {
      handleDateSelection(); // Ocultar el selector de fecha antes de actualizar el estado
      
      const currentDate = selectedDate || initDate;
      setInitDate(currentDate.toDateString());
    } else {
      handleDateSelection(); // Ocultar el selector de fecha
    }
  };

  return (
    <>
    <Pressable onPress={handleDateSelection}>
          <TextInput
            style={[styles.input]}
            value={initDate}
            editable={false}
          />
    </Pressable>
    {showDate && (
      <DateTimePicker
        value={new Date()} // Valor inicial del selector de fecha
        mode="date"
        display="spinner"
        onChange={onDateSelection}
        onDismiss={handleDateSelection} // Ocultar el selector de fecha cuando se descarta
      />
    )}
    </> 
  )
}