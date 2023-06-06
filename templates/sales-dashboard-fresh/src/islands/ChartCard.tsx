/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { AreaChart, Card, Divider, Metric, Text } from "@tremor/react";

const data = [
  {
    Month: "Jan 21",
    "Gross Volume": 2890,
    "Successful Payments": 2400,
    Customers: 4938,
  },
  {
    Month: "Feb 21",
    "Gross Volume": 1890,
    "Successful Payments": 1398,
    Customers: 2938,
  },
  {
    Month: "Mar 21",
    "Gross Volume": 2190,
    "Successful Payments": 1900,
    Customers: 1638,
  },
  {
    Month: "Apr 21",
    "Gross Volume": 3470,
    "Successful Payments": 3908,
    Customers: 2138,
  },
  {
    Month: "May 21",
    "Gross Volume": 2170,
    "Successful Payments": 4800,
    Customers: 2142,
  },
  {
    Month: "Jun 21",
    "Gross Volume": 3170,
    "Successful Payments": 3800,
    Customers: 5120,
  },
  {
    Month: "Jul 21",
    "Gross Volume": 3490,
    "Successful Payments": 4300,
    Customers: 3890,
  },
  {
    Month: "Aug 21",
    "Gross Volume": 2190,
    "Successful Payments": 4100,
    Customers: 3165,
  },
  {
    Month: "Sep 21",
    "Gross Volume": 3344,
    "Successful Payments": 4934,
    Customers: 1945,
  },
  {
    Month: "Oct 21",
    "Gross Volume": 1564,
    "Successful Payments": 1245,
    Customers: 2345,
  },
  {
    Month: "Nov 21",
    "Gross Volume": 3345,
    "Successful Payments": 2654,
    Customers: 4845,
  },
  {
    Month: "Dec 21",
    "Gross Volume": 2740,
    "Successful Payments": 3421,
    Customers: 2945,
  },
  {
    Month: "Jan 22",
    "Gross Volume": 3890,
    "Successful Payments": 2980,
    Customers: 2645,
  },
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export default function Example() {
  return (
    <Card className="mx-auto">
      <Text>Gross Volume</Text>
      <Metric>$ 12,699</Metric>
      <AreaChart
        className="mt-8 h-44"
        data={data}
        categories={["Gross Volume"]}
        index="Month"
        colors={["indigo"]}
        valueFormatter={valueFormatter}
        showYAxis={false}
        showLegend={false}
      />

      <Divider />

      <Text>Successful Payments</Text>
      <Metric>$ 10,300</Metric>
      <AreaChart
        className="mt-8 h-44"
        data={data}
        categories={["Successful Payments"]}
        index="Month"
        colors={["indigo"]}
        valueFormatter={valueFormatter}
        showYAxis={false}
        showLegend={false}
      />

      <Divider />

      <Text>Customers</Text>
      <Metric>645</Metric>
      <AreaChart
        className="mt-8 h-44"
        data={data}
        categories={["Customers"]}
        index="Month"
        colors={["indigo"]}
        valueFormatter={valueFormatter}
        showYAxis={false}
        showLegend={false}
      />
    </Card>
  );
}
