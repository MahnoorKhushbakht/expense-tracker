import { DatabaseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Link from 'next/link';

const ExpenseNavigator = () => {
  return (
    <div className="dark:bg-white/50 mt-5 mb-5 bg-black/50 w-full flex flex-col items-center justify-center p-5 rounded-md shadow-lg">
      <h1 className="text-2xl font-semibold dark:text-white text-black text-center">
        Calculate your Expense
      </h1>
      <p className="text-sm text-gray-200 dark:text-black text-center mb-4">
        Keep track of your spending and manage your budget with ease.
      </p>

      <Link href="/expense-tracker" passHref>
        <Button danger ghost type="outlined" shape="round" icon={<DatabaseOutlined />}>
          Calculate
        </Button>
      </Link>
    </div>
  );
};

export default ExpenseNavigator;
