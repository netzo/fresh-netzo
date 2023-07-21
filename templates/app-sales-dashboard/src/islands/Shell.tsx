import { signal } from "@preact/signals";
import { Grid } from "@tremor/react";
import DateRangePicker from "./DateRangePicker.tsx";
import MetricCard, { type Category } from "./MetricCard.tsx";
import TableCard from "./TableCard.tsx";

const categories: Category[] = [
  {
    title: "Sales",
    metric: "$ 12,699",
    metricPrev: "$ 9,456",
    delta: "34.3%",
    deltaType: "moderateIncrease",
  },
  {
    title: "Profit",
    metric: "$ 40,598",
    metricPrev: "$ 45,564",
    delta: "10.9%",
    deltaType: "moderateDecrease",
  },
  {
    title: "Customers",
    metric: "1,072",
    metricPrev: "856",
    delta: "25.3%",
    deltaType: "moderateIncrease",
  },
];

const selectedView = signal("1");

export default function Home() {
  return (
    <>
      <div class="flex justify-end items-center pb-4">
        <DateRangePicker />
      </div>

      <Grid numColsMd={2} numColsLg={3} class="gap-6">
        {categories.map((item) => <MetricCard key={item.title} item={item} />)}
      </Grid>

      <div class="mt-6">
        <TableCard />
      </div>
    </>
  );
}
