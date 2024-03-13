import { useDistanceShow } from "@/query/distance";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

export function Route() {
  const { data: points, status } = useDistanceShow();

  return (
    <>
      {status === "success" && (
        <div className="flex flex-col space-y-4">
          <LineChart
            width={500}
            height={300}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />

            <YAxis
              dataKey="y"
              domain={["auto", "auto"]}
              type="number"
              interval={0}
              allowDataOverflow={true}
            />

            <XAxis
              dataKey="x"
              domain={["auto", "auto"]}
              interval={0}
              type="number"
              allowDataOverflow={true}
            />

            <Line
              strokeWidth={4}
              data={points.map((point) => ({
                x: point.x,
                y: point.y,
              }))}
              dot={false}
              type="stepAfter"
              dataKey="y"
              stroke="white"
              tooltipType="none"
            />
          </LineChart>

          <div className="text-slate-200 space-y-6 flex flex-col flex-1 items-center justify-center">
            <p className="font-bold">Rota de Visita</p>
            <div className="w-2/4 flex flex-col max-h-20 overflow-y-auto">
              {
                points.map((point, index) => (
                  <span>
                    {index + 1}. {point.identifier}
                  </span>
                ))
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
}
