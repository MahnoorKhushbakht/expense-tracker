import TagLine from "../components/TagLine";
import TrackerForm from "../components/TrackerForm";
import ExpenseTable from "../components/ExpenseTable";
import DashboardLayout from '../components/DashboardLayout'

export default function Expensetracker() {
  return (
    <DashboardLayout>
      <div className="flex flex-col max-w-full h-svh flex-grow overflow-auto p-10 bg-white dark:bg-black text-black dark:text-white">
        <div className="flex justify-center">
          <TagLine />
        </div>
        <TrackerForm />
        <div className="w-full flex justify-center">
          <ExpenseTable />
      </div>
    </div>
    </DashboardLayout>
  );
}
