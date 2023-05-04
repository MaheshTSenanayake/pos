import MainNevigation from "./MainNevigation";

function Layout(props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <MainNevigation />
      <main style={{ flex: 1 }}>{props.children}</main>
    </div>
  );
}
export default Layout;
