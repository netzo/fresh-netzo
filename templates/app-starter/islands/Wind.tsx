import { useComputed } from "@preact/signals";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "netzo/components/ui/card.tsx";
import { DataTable } from "@/components/tables/components/data-table.tsx";
import { columns } from "../components/tables/wind/columns.tsx";
import { toFixed, toPercent } from "@/utils.tsx";

export default ({ data, options }) => {
  const assets = useComputed(() => data.length);
  const averagePowerOutput = useComputed(() =>
    toFixed(
      data
        .map((item) => Number(item.powerOutput))
        .reduce((acc, item) => acc + item, 0) / data.length,
    )
  );
  const averageEfficiencyGearbox = useComputed(() =>
    toPercent(
      data
        .map((item) => Number(item.efficiencyGearbox / 100))
        .reduce((acc, item) => acc + item, 0) / data.length,
    )
  );
  const averageEfficiencyGenerator = useComputed(() =>
    toPercent(
      data
        .map((item) => Number(item.efficiencyGenerator / 100))
        .reduce((acc, item) => acc + item, 0) / data.length,
    )
  );
  const averateWindSpeed = useComputed(() =>
    toFixed(
      data
        .map((item) => Number(item.windSpeed))
        .reduce((acc, item) => acc + item, 0) / data.length,
    )
  );
  const averateHumidity = useComputed(() =>
    toPercent(
      data
        .map((item) => Number(item.humidity / 100))
        .reduce((acc, item) => acc + item, 0) / data.length,
    )
  );
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 p-4 pb-0">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Activos totales
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="gray"
                d="M2 6h2v12H2V6m3 0h1v12H5V6m2 0h3v12H7V6m4 0h1v12h-1V6m3 0h2v12h-2V6m3 0h3v12h-3V6m4 0h1v12h-1V6Z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assets}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-green-500">+6</span>{" "}
              al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Potencia salida (kW)
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="gray"
                d="M16 7V3h-2v4h-4V3H8v4C7 7 6 8 6 9v5.5L9.5 18v3h5v-3l3.5-3.5V9c0-1-1-2-2-2Z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averagePowerOutput}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-green-500">+21%</span>{" "}
              al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eficiencia (transmisión)
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="gray"
                d="m18.5 3.5l-15 15l2 2l15-15M7 4a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m10 10a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageEfficiencyGearbox}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-red-500">-13%</span>{" "}
              al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eficiencia (generador)
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="gray"
                d="m18.5 3.5l-15 15l2 2l15-15M7 4a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m10 10a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageEfficiencyGenerator}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-red-500">+14%</span>{" "}
              al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Velocidad viento
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="gray"
                d="M4 10a1 1 0 0 1-1-1a1 1 0 0 1 1-1h8a2 2 0 0 0 2-2a2 2 0 0 0-2-2c-.55 0-1.05.22-1.41.59a.973.973 0 0 1-1.42 0c-.39-.39-.39-1.03 0-1.42C9.9 2.45 10.9 2 12 2a4 4 0 0 1 4 4a4 4 0 0 1-4 4H4m15 2a1 1 0 0 0 1-1a1 1 0 0 0-1-1c-.28 0-.53.11-.71.29a.996.996 0 0 1-1.41 0c-.38-.39-.38-1.02 0-1.41C17.42 8.34 18.17 8 19 8a3 3 0 0 1 3 3a3 3 0 0 1-3 3H5a1 1 0 0 1-1-1a1 1 0 0 1 1-1h14m-1 6H4a1 1 0 0 1-1-1a1 1 0 0 1 1-1h14a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-.83 0-1.58-.34-2.12-.88c-.38-.39-.38-1.02 0-1.41a.996.996 0 0 1 1.41 0c.18.18.43.29.71.29a1 1 0 0 0 1-1a1 1 0 0 0-1-1Z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averateWindSpeed}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-green-500">+32%</span>{" "}
              al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Humedad
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="gray"
                d="M12 3.25S6 10 6 14c0 3.32 2.69 6 6 6a6 6 0 0 0 6-6c0-4-6-10.75-6-10.75m2.47 6.72l1.06 1.06l-6 6l-1.06-1.06M9.75 10A1.25 1.25 0 0 1 11 11.25a1.25 1.25 0 0 1-1.25 1.25a1.25 1.25 0 0 1-1.25-1.25A1.25 1.25 0 0 1 9.75 10m4.5 4.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 14.25 17A1.25 1.25 0 0 1 13 15.75a1.25 1.25 0 0 1 1.25-1.25Z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averateHumidity}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-green-500">+17%</span>{" "}
              al mes anterior
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="overflow-x-auto p-4">
        <DataTable columns={columns} data={data} options={options} />
      </div>
    </div>
  );
};
