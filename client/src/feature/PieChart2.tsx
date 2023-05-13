import { Pie } from "@ant-design/charts";
import { useEffect } from "react";
import styled from "styled-components";
import { Action, useStore } from "../store/Store";

const Wrapper = styled.div`
  margin: 64px 32px;
`;

interface PieChartData {
  type: string;
  value: number;
}

const pieData: PieChartData[] = [];

const pieChartData: PieChartData[] = pieData;

function PieChart() {
  const { data, fetch } = useStore();

  useEffect(() => {
    fetch(Action.GetList);
  }, []);

  data.forEach((item) => {
    const exist = pieData.find((el) => el.type === item.address.city);
    if (exist) {
      exist.value = exist.value + 1;
    } else {
      pieData.push({
        type: item.address.city,
        value: 1,
      });
    }
  });

  const config = {
    appendPadding: 10,
    data: pieChartData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.5,
    label: {
      type: "inner",
      offset: "-50%",
      content: (_ref: any) => {
        return "".concat(_ref.value, "%");
      },
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: false as const,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        formatter: function formatter() {
          return `Total\n${data.length}`;
        },
      },
    },
  };
  return (
    <Wrapper>
      <Pie {...config} />
    </Wrapper>
  );
}

export default PieChart;
