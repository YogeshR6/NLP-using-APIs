import React from "react";
import { Chart } from "react-google-charts";
export default function BarChart({ displayData }) {
  const relavanceData = [
    ["Entity", "Relevance Score"],
    ...displayData.entities.map((entity) => [
      entity.entityId,
      entity.relevanceScore,
    ]),
  ];
  const confidenceData = [
    ["Entity", "Confidence Score"],
    ...displayData.entities.map((entity) => [
      entity.entityId,
      entity.confidenceScore,
    ]),
  ];
  const relavanceOptions = {
    chart: {
      title: "Entities and Relevance Scores",
      subtitle: "Based on the input text",
    },
  };
  const confidenceOptions = {
    chart: {
      title: "Entities and Confidence Scores",
      subtitle: "Based on the input text",
    },
  };
  return (
    <div className='self-start w-3/5'>
      <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={relavanceData}
      options={relavanceOptions}
    />
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={confidenceData}
      options={confidenceOptions}
    />
    </div>
  );
}
