import { useQuery } from "@tanstack/react-query";
import { Chart } from "primereact/chart";
import { useContext, useEffect, useState } from "react";
import { getImportOperationsInYear } from "./services/getImportOperationsInYear";
import { ToastContext } from "../../App";
import { Dropdown } from "primereact/dropdown";

function ImportOperationsChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [year, setYear] = useState(new Date().getFullYear());
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2024  + 1 }, (_, i) => 2024  + i);
  const textColor = "#333333";
  const borderColor = "#E5E5E5";
  const toast = useContext(ToastContext);
  const { data, error, isError } = useQuery({
    queryKey: ["importOperationsChart",year],
    queryFn: () => getImportOperationsInYear(year),
  });

  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: error?.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  }, [isError, error, toast]);

  useEffect(() => {
    const chartDataOptions = {
      labels: data?.data?.map((item) => item.monthName),
      datasets: [
        {
          label: "اجمالى سعر عمليات الشراء",
          data: data?.data?.map((item) => item.totalPrice),
          backgroundColor: "#FF168B",
          borderColor: "#FF168B",
          borderWidth: 0,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
          borderColor: borderColor,
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColor,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: true,
            drawBorder: false,

          },
        },
        y: {
          ticks: {
            color: textColor,
          },
          grid: {
            color: borderColor,
            drawBorder: false,
          },
        },
      },
    };
    setChartData(chartDataOptions);
    setChartOptions(options);
  }, [data?.data, textColor]);
  return (
    <>
      <div className="mt-4 chart-card">
        <div className="select">
          <span className="text-secondary ms-1" style={{fontSize:"12px"}}>اجمالى عمليات الشراء لسنة:</span>
          <Dropdown value={year} options={years} onChange={(e) => setYear(e.value)} placeholder="اختر السنة" panelClassName="chart-dropdown-panel" className="dropdown-for-chart" />
        </div>
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </>
  );
}

export default ImportOperationsChart;
