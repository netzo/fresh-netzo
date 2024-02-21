import * as Plot from "netzo/components/blocks/plot/plot.server.tsx";

const data = Array.from({ length: 12 }, (_, month) => ({
  month,
  total: Math.floor(Math.random() * 5000) + 1000,
}));

export function Overview() {
  return (
    <Plot.Figure
      options={{
        x: { tickFormat: Plot.formatMonth(), ticks: 12 },
        marks: [Plot.barY(data, { x: "month", y: "total" })],
      }}
    />
  );
}
