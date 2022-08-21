import styles from "./App.module.scss";
import { useBattery } from "react-use";
import BatteryInfo from "./components/BatteryInfo";

function App() {
  const batteryState = useBattery();
  console.log(batteryState);
  if (!batteryState.isSupported) {
    return (
      <div className={styles.App}>
        <div><strong>Battery sensor</strong>: <span>not supported</span></div>
      </div>
    );
  }

  if (!batteryState.fetched) {
    return (
      <div className={styles.App}>
        <div>
          <strong>Battery sensor</strong>: <span>supported</span>
        </div>
        <div>
          <strong>Battery state</strong>: <span>fetching</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.App}>
      <BatteryInfo {...batteryState}/>
    </div>
  );
}

export default App;
