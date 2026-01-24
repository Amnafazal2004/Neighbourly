import AddServices from "@/features/AddServices";
import AllServices from "@/features/AllServices";
import BookingTest from "@/features/BookServices";
import Authentication from "@/features/Login"

export default function Home() {
  return (
    <>
     <Authentication/>
    <AddServices></AddServices>
    <AllServices></AllServices>
    <BookingTest></BookingTest>
    </>
  );
}
