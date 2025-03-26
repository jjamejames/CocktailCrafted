import { Outlet } from "react-router";
import Header from "../components/header";
import Footer from "../components/footer";

export default function RootLayOut() {
  return (
    <div className="container mx-auto">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}
