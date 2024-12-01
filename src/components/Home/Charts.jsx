import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  ArcElement
);

const Charts = ({ onMaxPopulation }) => {
  const [lineChartData, setLineChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        );
        const data = await response.json();
        const sortedData = data.data.sort(
          (a, b) => b.Population - a.Population
        );
        const top5Years = sortedData.slice(0, 5);
        const maxPopulation = top5Years[0]?.Population || 0;

        // Pass the maximum population to the parent component
        onMaxPopulation(maxPopulation);

        // Prepare line chart data
        setLineChartData({
          labels: top5Years.map((entry) => entry.Year),
          datasets: [
            {
              label: "Population",
              data: top5Years.map((entry) => entry.Population),
              fill: false,
              borderColor: "#75c9c8",
            },
          ],
        });

        // Prepare pie chart data
        setPieChartData({
          labels: top5Years.slice(0, 3).map((entry) => entry.Year),
          datasets: [
            {
              data: top5Years.slice(0, 3).map((entry) => entry.Population),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching population data:", error);
      }
    };

    fetchData();
  }, [onMaxPopulation]);

  const lineOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          color: "black",
          generateLabels: (chart) => {
            const labels = ["United States", "Dummy Population"];
            return labels.map((label, i) => ({
              text: label,
              fillStyle: i === 0 ? "#75c9c8" : "#E9A0A0",
              strokeStyle: "white",
              lineWidth: 2,
              index: i,
            }));
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${
              context.dataset.label || ""
            }: ${context.formattedValue.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { display: true },
        ticks: {
          callback: (value) => value.toLocaleString(),
        },
      },
    },
  };

  const randomPadding = Math.floor(Math.random() * 3) + 25;

  const pieOptions = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          padding: randomPadding,
          generateLabels: (chart) =>
            chart.data.labels.map((label, i) => ({
              text: `${label}\n${chart.data.datasets[0].data[
                i
              ].toLocaleString()}`,
              fillStyle: chart.data.datasets[0].backgroundColor[i],
              strokeStyle: "white",
              lineWidth: 2,
              index: i,
            })),
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${
              context.dataset.label || ""
            }: ${context.formattedValue.toLocaleString()} Population Data`,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <div className="Chart">
        <div className="head">
          <div className="left">
            <p>Activities</p>
            <select id="filterYear">
              <option value="May - June 2021">May - June 2021</option>
              <option value="June - June 2021">June - June 2021</option>
              <option value="July - June 2021">July - June 2021</option>
            </select>
          </div>
        </div>
        <div className="line-data">
          {lineChartData ? (
            <Line data={lineChartData} options={lineOptions} />
          ) : (
            <p>
              {lineChartData === null ? "Loading..." : "Error loading data."}
            </p>
          )}
        </div>
      </div>

      <div className="Stats">
        <div className="top-product">
          <div className="head">
            <p>Top Product</p>
            <select id="filterChartData">
              <option value="May - June 2021">May - June 2021</option>
              <option value="June - June 2021">June - June 2021</option>
              <option value="July - June 2021">July - June 2021</option>
            </select>
          </div>
          <div className="piechart">
            {pieChartData ? (
              <Pie data={pieChartData} options={pieOptions} />
            ) : (
              <p>
                {pieChartData === null ? "Loading..." : "Error loading data."}
              </p>
            )}
          </div>
        </div>
        <div className="Schedules">
          <div className="head">
            <p>Today's schedules</p>
            <p>
              See All <i className="fal fa-angle-right"></i>
            </p>
          </div>
          <div className="data1">
            <p>Meeting with suppliers from Kuta Bali</p>
            <p>
              <i className="fas fa-clock"></i> 14.00-15.00
            </p>
            <p>at Sunset Road, Kuta, Bali</p>
          </div>
          <div className="data2">
            <p>Check operation at Giga Factory 1</p>
            <p>
              <i className="fas fa-clock"></i> 18.00-20.00
            </p>
            <p>at Central Jakarta</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
