import { useEffect, useState } from "react";
import { SolarDiagram } from "./components/SolarDiagram";


const OUTER_PANELS_PVS = new Map([
  // OUTER PANELS
  ["SV-BM-SRPV-02:INV13:INSTPOWER",0],
  ["SV-BM-SRPV-03:INV15:INSTPOWER",0],
  ["SV-BM-SRPV-03:INV19:INSTPOWER",0],
  ["SV-BM-SRPV-04:INV23:INSTPOWER",0],
  ["SV-BM-SRPV-04:INV27:INSTPOWER",0],
  ["SV-BM-SRPV-01:INV1:INSTPOWER",0],
  ["SV-BM-SRPV-01:INV7:INSTPOWER",0],
  ["SV-BM-SRPV-02:INV9:INSTPOWER",0],
  // CENTRE PANELS,
  ["SV-BM-SRPV-03:INV16:INSTPOWER",0],
  ["SV-BM-SRPV-03:INV20:INSTPOWER",0],
  ["SV-BM-SRPV-03:INV21:INSTPOWER",0],
  ["SV-BM-SRPV-03:INV22:INSTPOWER",0],
  ["SV-BM-SRPV-04:INV24:INSTPOWER",0],
  ["SV-BM-SRPV-04:INV28:INSTPOWER",0],
  ["SV-BM-SRPV-01:INV2:INSTPOWER",0],
  ["SV-BM-SRPV-01:INV5:INSTPOWER",0],
  ["SV-BM-SRPV-01:INV6:INSTPOWER",0],
  ["SV-BM-SRPV-01:INV8:INSTPOWER",0],
  ["SV-BM-SRPV-02:INV10:INSTPOWER",0],
  ["SV-BM-SRPV-02:INV14:INSTPOWER",0],
  // INNER_PANELS_PVS
  ["SV-BM-SRPV-03:INV17:INSTPOWER",0],
  ["SV-BM-SRPV-03:INV18:INSTPOWER",0],
  ["SV-BM-SRPV-04:INV25:INSTPOWER",0],
  ["SV-BM-SRPV-04:INV26:INSTPOWER",0],
  ["SV-BM-SRPV-01:INV3:INSTPOWER",0],
  ["SV-BM-SRPV-01:INV4:INSTPOWER",0],
  ["SV-BM-SRPV-02:INV11:INSTPOWER",0],
  ["SV-BM-SRPV-02:INV12:INSTPOWER",0],
  ["SV-BM-UPS-01:PVS:BSTRROOF:BSTPVKW",0],
  ["SV-BM-UPS-01:PVS:AMBROOF:AMBPVKW",0]
])

function App() {
  const [webSocket, setWebSocket] = useState (new WebSocket("ws://i04-ws001.diamond.ac.uk:8080/pvws/pv"));
  const [pvMap, setPvMap] = useState(new Map(OUTER_PANELS_PVS));

  useEffect(() => {
    webSocket.onopen = () => {
      const message = { "type": "subscribe", "pvs": [...OUTER_PANELS_PVS.keys(), ] }
      webSocket.send(JSON.stringify(message))
    };

    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPvMap((p) => {
        const newPvs = new Map(p);
        newPvs.set(data.pv, data.value);
        console.log(data);
        return newPvs;
      });
    };

    webSocket.onclose = () => {
      /*setTimeout(() => {
        setWebSocket(new WebSocket("ws://127.0.0.1:3000/ws"));
      }, 1000);*/
    };

    webSocket.onerror = (err) => {
      console.log("Socket encountered error: ", err, "Closing socket");
      webSocket.close();
      setWebSocket(new WebSocket(import.meta.env.VITE_PV_ENDPOINT));
    };

    return () => {
      webSocket.close();
    };
  }, [webSocket]);

  return (
    <div className="main">
      <SolarDiagram
        values={[...pvMap.values()]}
      />
      <div>
        <h1>Generation</h1>{" "}
      </div>
    </div>
  );
}

export default App;
