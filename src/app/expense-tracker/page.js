import TagLine from "../components/TagLine";
import TrackerForm from "../components/TrackerForm";
import ExpenseTable from "../components/ExpenseTable";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardLayout from "../components/DashboardLayout";
import ExpenseForm from "../components/ExpenseForm";

export default function Expensetracker() {
  return (
      <div className="flex flex-col w-full h-screen ">
        {/* Mobile View */}
<div className="md:hidden lg:hidden sm:flex max-w-full h-full ">
  <Header />
  <div className="bg-black dark:bg-white">
  <div className="flex justify-center">
    <TagLine />
  </div>
  {/* <TrackerForm /> */}
  <ExpenseForm/>
  <div className="w-full flex justify-center">
    <ExpenseTable />
  </div>
  </div>
  <Footer />
</div>


        {/* Desktop View */}
        <div className="hidden md:flex lg:flex max-w-full h-full sm:hidden dark:bg-black bg-white">
          <DashboardLayout>
            <div className="flex justify-center">
              <TagLine />
            </div>
            {/* <TrackerForm /> */}
              <ExpenseForm/>
            <div className="w-full flex justify-center">
              <ExpenseTable />
            </div>
          </DashboardLayout>
        </div>
      </div>
  );
}
