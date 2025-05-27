

function TableSkeleton() {

  return (

      <table className="table-auto w-full text-left whitespace-no-wrap animate-pulse">
        <thead>
          <tr>
            <th className="px-20 py-3 title-font tracking-wider font-medium text-white text-sm dark:bg-amber-200/50 bg-amber-600/50 rounded-tl rounded-bl">Expense Name</th>
            <th className="px-20 py-3 title-font tracking-wider font-medium text-white text-sm dark:bg-amber-200/50 bg-amber-600/50">Amount</th>
            <th className="px-20 py-3 title-font tracking-wider font-medium text-white text-sm dark:bg-amber-200/50 bg-amber-600/50">Category</th>
            <th className="px-20 py-3 title-font tracking-wider font-medium text-white text-sm dark:bg-amber-200/50 bg-amber-600/50">Date</th>
            <th className="w-10 title-font tracking-wider font-medium text-white text-sm dark:bg-amber-200/50 bg-amber-600/50 rounded-tr rounded-br"></th>
          </tr>
        </thead>
        <tbody>

    <tr >
      <td className="px-25 py-3 text-black dark:text-white"></td>
      <td className="px-25 py-3 text-black dark:text-white"></td>
      <td className="px-25 py-3 text-black dark:text-white"></td>
      <td className="px-25 py-3 text-lg text-black dark:text-white"></td>
      <td className="w-10 text-center"></td>
    </tr>

          
        </tbody>
      </table>


  )
}

export default TableSkeleton