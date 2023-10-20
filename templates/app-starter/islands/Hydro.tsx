import { useComputed } from "@preact/signals";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "netzo/components/ui/card.tsx";
import { DataTable } from "@/components/tables/components/data-table.tsx";
import { columns } from "../components/tables/hydro/columns.tsx";
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
  const averageEfficiencyTurbine = useComputed(() =>
    toPercent(
      data
        .map((item) => Number(item.efficiencyTurbine / 100))
        .reduce((acc, item) => acc + item, 0) / data.length,
    )
  );
  const averageEfficiencyGenerator = useComputed(() =>
    toPercent(
      data
        .map((item) => Number(item.efficiencyGenerator / 100))
        .reduce((acc, item) => acc + item, 0),
    )
  );
  const averageWaterFlowRate = useComputed(() =>
    toFixed(
      data
        .map((item) => Number(item.waterFlowRate))
        .reduce((acc, item) => acc + item, 0),
    )
  );
  const averageWaterLevel = useComputed(() =>
    toFixed(
      data
        .map((item) => Number(item.waterLevel))
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
              <span className="font-semibold text-red-500">+14%</span>{" "}
              al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eficiencia (turbina)
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
              {averageEfficiencyTurbine}
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
              <span className="font-semibold text-green-500">+17%</span>{" "}
              al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Nivel agua (m³)
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="gray"
                d="M12 20a6 6 0 0 1-6-6c0-4 6-10.75 6-10.75S18 10 18 14a6 6 0 0 1-6 6Z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageWaterLevel}
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
              Caudal
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="gray"
                d="M17.12 3.55a2 2 0 0 0-1.92 1.4l-.8 2.55a3 3 0 0 0-1.07.24L11.5 5.77l-1.33-1.48a2 2 0 0 0-.12 2.83l1.81 1.97a3 3 0 0 0-.22.51a3 3 0 0 0-.11.53l-2.61.58l-1.96.44a2 2 0 0 0 2.39 1.52l2.61-.59a3 3 0 0 0 .74.81l-.8 2.55l-.6 1.91a2 2 0 0 0 2.5-1.31l.81-2.54a3 3 0 0 0 1.07-.24l1.82 1.97l1.33 1.47a2 2 0 0 0 .13-2.82l-1.81-1.97a3 3 0 0 0 .21-.51a3 3 0 0 0 .14-.54l2.59-.58l1.95-.43a2 2 0 0 0-2.38-1.52l-2.61.58a3 3 0 0 0-.74-.8l.8-2.56l.6-1.9a2 2 0 0 0-.59-.1M14.56 9a1.5 1.5 0 0 1 .39.07a1.5 1.5 0 0 1 .98 1.88a1.5 1.5 0 0 1-1.88.98a1.5 1.5 0 0 1-.98-1.88A1.5 1.5 0 0 1 14.55 9M8 13.67C6.78 14.53 5.39 15 4 15H2v2h2c1.37 0 2.74-.35 4-1c.77.4 1.58.66 2.41.81l.53-1.67l.09-.26c-1.06-.15-2.1-.56-3.03-1.21M20.45 15c.05.7-.12 1.41-.54 2H22v-2h-1.55M8 17.67C6.78 18.53 5.39 19 4 19H2v2h2c1.37 0 2.74-.35 4-1c2.5 1.3 5.5 1.3 8 0c1.26.65 2.62 1 4 1h2v-2h-2c-1.39 0-2.78-.47-4-1.33c-2.44 1.71-5.56 1.71-8 0Z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageWaterFlowRate}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-red-500">-13%</span>{" "}
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
