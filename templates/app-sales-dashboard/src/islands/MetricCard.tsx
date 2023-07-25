import {
  BadgeDelta,
  Card,
  type DeltaType,
  Flex,
  Metric,
  Text,
} from "@tremor/react";

export interface Category {
  title: string;
  metric: string;
  metricPrev: string;
  delta: string;
  deltaType: DeltaType;
}

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

export default ({ item }: { item: Category }) => {
  return (
    <Card>
      <Flex alignItems="start">
        <Text>{item.title}</Text>
        <BadgeDelta deltaType={item.deltaType}>
          {item.delta}
        </BadgeDelta>
      </Flex>
      <Flex
        justifyContent="start"
        alignItems="baseline"
        class="truncate space-x-3"
      >
        <Metric>{item.metric}</Metric>
        <Text class="truncate">from {item.metricPrev}</Text>
      </Flex>
    </Card>
  );
};
