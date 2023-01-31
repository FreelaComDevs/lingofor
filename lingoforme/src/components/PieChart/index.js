import "../_common/pie/styles.css";
import Pie from "../_common/pie/index";

export default function PieChart({percent}) {

  return (
    <Pie percentage={percent} colour="#80A7FF" />
  );
}
