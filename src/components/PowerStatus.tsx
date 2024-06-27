import "./SolarDiagram.css";

export const PowerStatus = ({
  instantPower,
  accPower,
  title,
}: {
  instantPower: number;
  accPower: number;
  title: string;
}) => (
  <div className="power-card">
    <h2>{title}</h2>
    <h3>{instantPower} kW</h3>
    <h4>{accPower} mWh to date</h4>
  </div>
);
