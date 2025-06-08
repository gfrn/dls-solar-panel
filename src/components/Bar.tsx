export const Bar = ({
  title,
  percentage,
}: {
  percentage: number;
  title: string;
}) => (
  <div style={{ width: "100%" }}>
    <h4 style={{ width: "20%", display: "inline-block" }}>{title}</h4>
    <div style={{ width: "80%", display: "inline-block" }}>
      <div
        style={{
          width: `${percentage}%`,
          backgroundColor: "#56b365",
          height: "1.4em",
          paddingLeft: "5px",
        }}
      >
        {percentage}%
      </div>
    </div>
  </div>
);
