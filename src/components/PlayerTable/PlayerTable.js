import React from 'react';
import './PlayerTable.css'
import { useTable, useSortBy } from 'react-table'

const PlayerTable = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable(
        {
          columns,
          data,
        },
        useSortBy
      )

    return (
        <>
            <table className='player-table' {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        {/* Add a sort direction indicator */}
                        <span>
                            {column.isSorted
                            ? column.isSortedDesc
                                ? ' 🔽'
                                : ' 🔼'
                            : ''}
                        </span>
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(
                    (row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            )
                        })}
                        </tr>
                    )}
                )}
                </tbody>
            </table>
            <br />
        </>
    );
}

export default PlayerTable;