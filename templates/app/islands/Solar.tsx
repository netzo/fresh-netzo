import { useComputed } from "@preact/signals";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "netzo/components/ui/card.tsx";
import { DataTable } from "@/components/tables/components/data-table.tsx";
import { columns } from "../components/tables/solar/columns.tsx";
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
  const averageEfficiencyPanel = useComputed(() =>
    toPercent(
      data
        .map((item) => Number(item.efficiencyPanel / 100))
        .reduce((acc, item) => acc + item, 0) / data.length,
    )
  );
  const averageEfficiencyInverter = useComputed(() =>
    toPercent(
      data
        .map((item) => Number(item.efficiencyInverter / 100))
        .reduce((acc, item) => acc + item, 0) / data.length,
    )
  );
  const averageIrradiance = useComputed(() =>
    toFixed(
      data
        .map((item) => Number(item.irradiance))
        .reduce((acc, item) => acc + item, 0) / data.length,
    )
  );
  const averageTemperature = useComputed(() =>
    toFixed(
      data
        .map((item) => Number(item.temperature))
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
              width="20"
              height="20"
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
              <span className="font-semibold text-red-500">+14%</span>{" "}
              al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eficiencia (panel)
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
              {averageEfficiencyPanel}
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
              Eficiencia (invertidor)
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
              {averageEfficiencyInverter}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-green-500">+17%</span>{" "}
              al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Irradiación
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="gray"
                d="M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0-7l2.39 3.42C13.65 5.15 12.84 5 12 5c-.84 0-1.65.15-2.39.42L12 2M3.34 7l4.16-.35A7.2 7.2 0 0 0 5.94 8.5c-.44.74-.69 1.5-.83 2.29L3.34 7m.02 10l1.76-3.77a7.131 7.131 0 0 0 2.38 4.14L3.36 17M20.65 7l-1.77 3.79a7.023 7.023 0 0 0-2.38-4.15l4.15.36m-.01 10l-4.14.36c.59-.51 1.12-1.14 1.54-1.86c.42-.73.69-1.5.83-2.29L20.64 17M12 22l-2.41-3.44c.74.27 1.55.44 2.41.44c.82 0 1.63-.17 2.37-.44L12 22Z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageIrradiance}
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
              Temperatura
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="gray"
                d="M15 13V5a3 3 0 0 0-6 0v8a5 5 0 1 0 6 0m-3-9a1 1 0 0 1 1 1v3h-2V5a1 1 0 0 1 1-1Z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageTemperature}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-green-500">+21%</span>{" "}
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
