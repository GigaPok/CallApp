import { Pie, PieConfig } from "@ant-design/charts";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Action, useStore } from "../store/Store";

const Wrapper = styled.div`
  margin: 64px 32px;
`;

interface PieChartData {
  type: string;
  value: number;
  percentage: number;
}

const PieChart = () => {
  const { data, fetch } = useStore();
  const [pieData, setPieData] = useState<PieChartData[]>([]);

  useEffect(() => {
    fetch(Action.GetList);
  }, []);

  useEffect(() => {
    const cityCounts: { [key: string]: number } = {};
    let totalCount = 0;

    data.forEach((item) => {
      const city = item.address.city;
      if (city) {
        cityCounts[city] = cityCounts[city] ? cityCounts[city] + 1 : 1;
        totalCount++;
      }
    });

    const newData = Object.keys(cityCounts).map((city) => {
      const count = cityCounts[city];
      const percentage = (count / totalCount) * 100;
      return { type: city, value: count, percentage: percentage };
    });

    setPieData(newData);
  }, [data]);

  const config: PieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.5,
    label: {
      type: "inner",
      offset: "-50%",
      content: ({ percentage }) => {
        return percentage ? `${percentage.toFixed(1)}%` : "sas";
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
};

export default PieChart;
