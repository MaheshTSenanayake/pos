import MainNevigation from "./MainNevigation";

function Layout(props) {
  return (
    <div>
      <MainNevigation />
      <main>{props.children}</main>
    </div>
  );
}
export default Layout;
