import * as Plot from "netzo/components/blocks/plot/plot.server.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "netzo/components/card.tsx";
import type { Account } from "../data/accounts.ts";
import type { Metric } from "../data/metrics.ts";
import { toPercent, toUSD } from "../data/mod.ts";

export function DashboardCards(props: { data: Metric; account: Account }) {
  const { amount, count, deals } = props.data;
  const activeCount = props.account ? count.ofAccount : count.all;
  const dealAverageValue = props.account
    ? amount.ofAccount / count.ofAccount
    : amount.all / count.all;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Deals
          </CardTitle>
          <div className="w-4 h-4 mdi-tag text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {activeCount}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-primary">
              {toPercent(activeCount / count.all)}
            </span>{" "}
            of all deals
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Deals won
          </CardTitle>
          <div className="w-4 h-4 mdi-currency-usd text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{count.ofAccount}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-primary">
              {toPercent(count.perStatus.won / count.all)}
            </span>{" "}
            of all deals
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Deals won amount
          </CardTitle>
          <div className="w-4 h-4 mdi-currency-usd text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{toUSD(amount.ofAccount)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-primary">
              {toPercent(amount.perStatus.won / amount.all)}
            </span>{" "}
            of all deals
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Deal average value
          </CardTitle>
          <div className="w-4 h-4 mdi-currency-usd-circle text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{toUSD(dealAverageValue)}</div>
          <p className="text-xs text-muted-foreground">
            {/* {props.account ? "of account deals" : "of all deals"} */}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function DashboardCardPlotDealsPerMonth(props: { data: Metric }) {
  const { dealsPerMonth = [] } = props.data;
  const data = dealsPerMonth.map((d) => ({ ...d, amount: Number(d.amount) }));
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Deals per month</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        {data?.length
          ? (
            <Plot.Figure
              options={{
                x: { tickFormat: Plot.formatMonth(), ticks: 12 },
                marks: [
                  Plot.barY(data, { x: "month", y: "amount" }),
                  Plot.ruleY([0]),
                ],
              }}
            />
          )
          : <PlotPlaceholder />}
      </CardContent>
    </Card>
  );
}

export function DashboardCardPlotDealsPerStatus(props: { data: Metric }) {
  const { deals } = props.data;
  const data = deals.map((d) => ({ ...d, amount: Number(d.amount) }));
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Deals per status</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.length
          ? (
            <Plot.Figure
              options={{
                color: { legend: true },
                marks: [
                  Plot.barY(
                    data,
                    Plot.groupX({ y: "count" }, {
                      x: "status",
                      fill: "status",
                    }),
                  ),
                  Plot.ruleY([0]),
                ],
              }}
            />
          )
          : <PlotPlaceholder />}
      </CardContent>
    </Card>
  );
}

export function DashboardCardPlotDealsThroughTime(props: { data: Metric }) {
  const { dealsAmountThroughTime = [] } = props.data;
  const currentYear = new Date().getFullYear();
  const data = dealsAmountThroughTime.map((d) => ({
    createdAt: new Date(d.createdAt),
    amount: Number(d.amount),
  }));
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Deals total through time</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.length
          ? (
            <Plot.Figure
              options={{
                marks: [
                  Plot.lineX(data, { x: "createdAt", y: "amount" }),
                ],
              }}
            />
          )
          : <PlotPlaceholder />}
      </CardContent>
    </Card>
  );
}

function PlotPlaceholder() {
  return (
    <div className="text-muted-foreground text-center">
      No deals created yet
    </div>
  );
}
