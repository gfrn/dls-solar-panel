export const PowerStatus = ({
  instantPower,
  accPower,
  title,
}: {
  instantPower?: number;
  accPower?: number;
  title: string;
}) => (
  <div className="power-card">
    <h2>{title}</h2>
    <h3>{typeof instantPower === "number" ? instantPower.toFixed(3) : "?"} kW</h3>
    <h4>{typeof accPower  === "number" ? accPower.toFixed(3) : "?"} MWh to date</h4>
  </div>
);
