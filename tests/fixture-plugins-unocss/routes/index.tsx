import CheckDuplication from "../islands/CheckDuplication.tsx";
import InsertCssRules from "../islands/InsertCssRules.tsx";

const MAIN = "display: flex; flex-direction: column; gap: 12px; margin: 24px;";
const H1 = "font-weight: bold;";
const DIV = "border: 1px solid gray; padding: 12px;";

export default () => {
  const Unused = () => {
    const _unused = <div class="text-red-600" />;
    return <p>ready</p>;
  };

  return (
    <main style={MAIN}>
      <div style={DIV}>
        <h1 style={H1}>Check Duplicate CSS Rules</h1>
        <CheckDuplication />
      </div>
      <div style={DIV}>
        <h1 style={H1}>Insert CSS Rules (in islands)</h1>
        <InsertCssRules />
      </div>
      <div style={DIV}>
        <h1 style={H1}>Static</h1>
        <p id="helloUnoCSS" class="text-xl text-blue-600">
          Hello UnoCSS!
        </p>
      </div>
      <div style={DIV}>
        <h1 style={H1}>Unused</h1>
        <Unused />
      </div>
    </main>
  );
};
