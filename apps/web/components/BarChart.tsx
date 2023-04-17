
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const labels = [
    "Really negative",
    "Negative",
    "It was right",
    "Positive",
    "Really positive",
  ];
  
  type Props = {
    feedback: number[] | number | null;
    question: string;
  };
  
  export const BarChart: React.FC<Props> = ({ feedback, question }) => {
    const [baseData, setBaseData] = useState([0, 0, 0, 0, 0]);
  
    useEffect(() => {
      if (feedback) {
        const feedbackArray = Array.isArray(feedback) ? feedback : [feedback];
        feedbackArray.forEach((feedback) => {
          setBaseData((prev) => {
            const newData = [...prev];
            newData[feedback - 1] += 1;
            return newData;
          });
        });
      }
    }, [feedback]);
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: `Feedback for ${question}`,
        },
      },
    };
  
    const data = {
      labels,
      datasets: [
        {
          label: question,
          data: baseData,
          backgroundColor: "rgba(44, 86, 221, 1)",
        },
      ],
    };
  
    return (
      <div className="max-w-2xl mx-auto p-10 bg-white border rounded-xl mt-10">
        <Bar options={options} data={data} />
      </div>
    );
  };