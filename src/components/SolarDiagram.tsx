import { useMemo } from "react";
import "./SolarDiagram.css";

const COLOURS = ["#8C1C13", "#FFAD05", "#084887", "#054A29"];

const getColour = (value: number, max = 100) => {
  const index = Math.round(value / (max / COLOURS.length));
  return COLOURS[index < COLOURS.length ? index  : COLOURS.length - 1];
};

const SolarCircle = ({
  values,
  radius,
}: {
  values: number[];
  radius: number;
}) => {
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const arcLength = useMemo(
    () => circumference / values.length,
    [circumference, values]
  );
  return (
    <>
      {values.map((value, i) => (
        <circle
          cx="75"
          cy="52.5"
          r={radius}
          strokeDasharray={`${arcLength - 1}, ${arcLength * circumference}`}
          strokeDashoffset={-arcLength * i - 1}
          stroke={getColour(value)}
          key={`${radius}-${i}`}
        />
      ))}
    </>
  );
};

export const SolarDiagram = ({ values }: { values: number[] }) => {
  const innerCircle = useMemo(() => values.slice(20), [values]);
  const centreCircle = useMemo(() => values.slice(8, 20), [values]);
  const outerCircle = useMemo(() => values.slice(0, 8), [values]);

  return (
    <div className="map-card">
      <h1>Panel Generation Breakdown</h1>
      <svg viewBox="0 0 130 105">
        <SolarCircle values={centreCircle} radius={45} />
        <SolarCircle values={innerCircle} radius={40} />
        <SolarCircle values={outerCircle} radius={50} />
        <rect
          x={5}
          y={42.5}
          width={10}
          height={20}
          fill={getColour(values[29])}
        />
        <rect
          x={55}
          y={27}
          width={15}
          height={20}
          fill={getColour(values[28])}
          style={{ transformOrigin: "center", transform: "rotate(-30deg)" }}
        />
      </svg>
      <h2>Legend</h2>
      {
        <div className="legend-view">
          {COLOURS.map((colour, i) => {
            const percentage = 100 / COLOURS.length;
            return (
              <span key={i} className="legend-item" style={{ backgroundColor: colour }}>
                {percentage * i} kW - {percentage * (i + 1)} kW
              </span>
            );
          })}
        </div>
      }
    </div>
  );
};
