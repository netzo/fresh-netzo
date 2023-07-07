interface Props {
  trend:
    | "top"
    | "top-right"
    | "right"
    | "bottom-right"
    | "bottom";
}

export function BadgeTrend(props: Props) {
  const { trend = "right" } = props;

  const badge = {
    top: "n-badge-green",
    "top-right": "n-badge-yellowgreen",
    right: "n-badge-orange",
    "bottom-right": "n-badge-orangered",
    bottom: "n-badge-red",
  }[trend];

  const icon = {
    top: "i-mdi-arrow-top",
    "top-right": "i-mdi-arrow-top-right",
    right: "i-mdi-arrow-right",
    "bottom-right": "i-mdi-arrow-bottom-right",
    bottom: "i-mdi-arrow-bottom",
  }[trend];

  return (
    <span class={badge}>
      <div class={icon} />
    </span>
  );
}
