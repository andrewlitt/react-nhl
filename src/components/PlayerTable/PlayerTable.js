import React from 'react';
import './PlayerTable.css'
import { useTable, useSortBy } from 'react-table'
import Paper from '@material-ui/core/Paper';

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
            <Paper className='player-table'>
                <table  {...getTableProps()}>
                        <thead className='player-table-header'>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
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
                        <tbody className='player-table-body'{...getTableBodyProps()}>
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
            </Paper>
                
        </>
    );
}
export default PlayerTable;