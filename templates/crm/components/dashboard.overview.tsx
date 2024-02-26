import * as Plot from "netzo/components/blocks/plot/plot.server.tsx";

export function DashboardOverview(props: { data: Metric["deals"] }) {
  return (
    <Plot.Figure
      options={{
        x: { tickFormat: Plot.formatMonth(), ticks: 12 },
        marks: [Plot.barY(props.data, { x: "month", y: "total" })],
      }}
    />
  );
}
