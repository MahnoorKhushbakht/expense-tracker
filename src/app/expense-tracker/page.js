import TagLine from "../components/TagLine";
import TrackerForm from "../components/TrackerForm";
import ExpenseTable from "../components/ExpenseTable";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardLayout from "../components/DashboardLayout";

export default function Expensetracker() {
  return (
      <div className="flex flex-col max-w-full h-svh flex-grow overflow-auto bg-white dark:bg-black text-black dark:text-white">
        <div className="md:hidden lg:hidden sm:flex">
        <Header/>
        <div className="flex justify-center">
          <TagLine />
        </div>
        <TrackerForm />
        <div className="w-full flex justify-center">
          <ExpenseTable />
      </div>
      <Footer/>
      </div>
        <div className="hidden md:flex lg:flex sm:hidden">
       <DashboardLayout>
          <div className="flex justify-center">
            <TagLine />
          </div>
          <TrackerForm />
          <div className="w-full flex justify-center">
            <ExpenseTable />
          </div>
          <Footer/>
          </DashboardLayout>
        </div>
        
    </div>
  );
}
