"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
    icon?: React.ComponentType;
  };
}

export interface ChartProps {
  data: any[];
  config: ChartConfig;
  className?: string;
  dataKeys?: string[];
  xAxisKey?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
}

export function Chart({
  data,
  config,
  className,
  dataKeys,
  xAxisKey = "name",
  showGrid = true,
  showTooltip = true,
  showLegend = true,
}: ChartProps) {
  const keys = dataKeys || Object.keys(config);

  return (
    <div className={cn("w-full h-[500px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          {showGrid && (
            <CartesianGrid className="opacity-10" vertical={false} />
          )}

          <XAxis
            dataKey={xAxisKey}
            tickLine={false}
            axisLine={false}
            padding={{ left: 20, right: 20 }}
          />

          {showTooltip && (
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload) return null;

                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="font-medium">{label}</div>
                    {payload.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: item.fill }}
                        />
                        <span>{config[item.dataKey].label}:</span>
                        <span className="font-medium text-foreground">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
          )}

          {showLegend && (
            <Legend
              content={({ payload }) => {
                if (!payload) return null;

                return (
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    {payload.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.value}</span>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
          )}

          {keys.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              fill={config[key].color}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Examples

export const BasicChart = () => {
  return (
    <Chart
      data={[
        { name: "Jan", value: 100 },
        { name: "Feb", value: 150 },
        { name: "Mar", value: 200 },
      ]}
      config={{
        value: {
          label: "Value",
          color: "hsl(var(--blue))",
        },
      }}
    />
  );
};

export const MultipleSeries = () => {
  return (
    <>
      <Chart
        data={[
          { name: "Q1", sales: 100, profit: 20 },
          { name: "Q2", sales: 150, profit: 40 },
          { name: "Q3", sales: 180, profit: 50 },
        ]}
        config={{
          sales: {
            label: "Sales",
            color: "hsl(var(--orange))",
          },
          profit: {
            label: "Profit",
            color: "hsl(var(--blue))",
          },
        }}
      />
    </>
  );
};

export const CustomHeight = () => {
  return (
    <Chart
      data={[
        { name: "Jan", value: 100 },
        { name: "Feb", value: 150 },
        { name: "Mar", value: 200 },
      ]}
      config={{
        value: {
          label: "Value",
          color: "hsl(var(--blue))",
        },
      }}
      className="h-[500px]"
    />
  );
};

export const WithoutGridOrLegend = () => {
  return (
    <Chart
      data={[
        { name: "Jan", value: 100 },
        { name: "Feb", value: 150 },
        { name: "Mar", value: 200 },
      ]}
      config={{
        value: {
          label: "Value",
          color: "hsl(var(--blue))",
        },
      }}
      showGrid={false}
      showLegend={false}
    />
  );
};
