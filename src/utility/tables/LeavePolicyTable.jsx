import React from 'react'

const LeavePolicyTable = ({columns, data, actions}) => {
    return (
        <div className="overflow-x-auto dark:bg-dark-bg">
          <table className="min-w-full border-collapse table-auto text-sm sm:text-base dark:text-dark-text">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="px-4 py-2 border-b text-center">
                    {column.label}
                  </th>
                ))}
                {actions && <th className="px-4 py-2 border-b text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 py-2 border-b">
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-2 border-b">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(row)}
                          className={`px-2 py-1 mx-1 ${action.className}`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default LeavePolicyTable
