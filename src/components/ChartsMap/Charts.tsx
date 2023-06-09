import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useMemo } from "react";

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
// import { formatNumber } from "../lib/util";

type GraphData = {
    cases: {
        [key: string]: number;
    };
};

const useGraphData = () => {
    const queryInfo = useQuery<GraphData>({
        queryKey: ["graphData"],
        queryFn: () =>
            fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all").then(
                (res) => res.json(),
            ),
    });

    return {
        ...queryInfo,
        data: useMemo(
            () => {
                const tranformedData = Object.entries(queryInfo.data?.cases ?? {}).map((
                    [key, value],
                ) => ({
                    date: format(new Date(key), "dd-MMM-yyyy"),
                    Cases: value,
                }));
                return tranformedData;
            },
            [queryInfo.data?.cases],
        ),
    };
};

const Chart = () => {
    return (
        <section>
            <h1 className="text-xl mb-2 text-center">
                Chart
            </h1>
            <article className="bg-white shadow rounded  py-10 pr-5  h-[400px]">
                <ChartRenderer />
            </article>
        </section>
    );
};

const ChartRenderer = () => {
    const { data: graphData, isLoading, isError } = useGraphData();
    if (isLoading) {
        return (
            <div className="h-full w-full   grid place-content-center bg-white">
                Loading...
            </div>
        );
    }
    if (isError) return <div>Error</div>;

    if (!graphData) {
        return (
            <div>
                No graph data found
            </div>
        );
    }
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={300}
                height={300}
                data={graphData}
                margin={{
                    top: 5,
                    right: 30,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                    tickCount={10}
                    tickFormatter={(value) => new Intl.NumberFormat("en-US", {
                        notation: "compact",
                        compactDisplay: "short",
                    }).format(value)}
                />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="Cases"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Chart;