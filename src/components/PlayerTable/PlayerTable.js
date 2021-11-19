import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './PlayerTable.css'

const PlayerTable = ({ name, data }) => {
  return (
    <Paper className='player-table'>
        <h4 className='player-table-header'>{name}</h4>
        <Table size="small" aria-label="simple table">
            <TableHead >
                <TableRow>
                    <TableCell >Jersey&nbsp;#</TableCell>
                    <TableCell align="right">Full&nbsp;Name</TableCell>
                    <TableCell align="right">Goals</TableCell>
                    <TableCell align="right">Shots</TableCell>
                    <TableCell align="right">Hits</TableCell>
                    <TableCell align="right">TOI</TableCell>
                </TableRow>
            </TableHead>
        <TableBody>
        {data.map(player => (
            <TableRow key={player.fullName}>
                    <TableCell component="th" scope="row">
                    {player.jerseyNumber}
                    </TableCell>
                    <TableCell align="right">{player.fullName}</TableCell>
                    <TableCell align="right">{player.goals}</TableCell>
                    <TableCell align="right">{player.shots}</TableCell>
                    <TableCell align="right">{player.hits}</TableCell>
                    <TableCell align="right">{player.timeOnIce}</TableCell>
            </TableRow>
        ))}
        </TableBody>
        </Table>
    </Paper>
  );
}

export default PlayerTable;
