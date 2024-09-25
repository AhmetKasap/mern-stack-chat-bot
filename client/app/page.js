import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>

      <div className="sm:flex sm:flex-col md:flex md:flex-row lg:flex lg:flex-row xl:flex xl:flex-row w-10/12 mx-auto mt-16">
        <Auth></Auth>
        <SideBar></SideBar>
      </div>
    </>
  );
}
