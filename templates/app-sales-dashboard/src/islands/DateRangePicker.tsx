import { useSignal } from "@preact/signals";
import { DateRangePicker, type DateRangePickerValue } from "@tremor/react";

export default () => {
  const value = useSignal<DateRangePickerValue>({
    from: new Date(2023, 1, 1),
    to: new Date(),
  });

  const onValueChange = (val: DateRangePickerValue) => {
    value.value = val;
  };

  return (
    <DateRangePicker
      class="max-w-md"
      value={value.value}
      onValueChange={onValueChange}
    />
  );
};

// import { useSignal } from "@preact/signals";
// import {
//   DateRangePicker,
//   DateRangePickerItem,
//   DateRangePickerValue,
// } from "@tremor/react";
// import { es } from "date-fns/locale";

// export function DateRangePickerSpanish() {
// const value = useSignal<DateRangePickerValue>({
//   from: new Date(2023, 1, 1),
//   to: new Date(),
// });

// const onValueChange = (val: DateRangePickerValue) => {
//   value.value = val
// }

//   return (
//     <DateRangePicker
//       className="max-w-md mx-auto"
//       value={value.value}
//       onValueChange={onValueChange}
//       locale={es}
//       selectPlaceholder="Seleccionar"
//       color="rose"
//     >
//       <DateRangePickerItem key="ytd" value="ytd" from={new Date(2023, 0, 1)}>
//         Año transcurrido
//       </DateRangePickerItem>
//       <DateRangePickerItem
//         key="half"
//         value="half"
//         from={new Date(2023, 0, 1)}
//         to={new Date(2023, 5, 31)}
//       >
//         Primer semestre
//       </DateRangePickerItem>
//     </DateRangePicker>
//   );
// }
