import { useState } from 'react';
import ConditionalRedirect from './conditionalRedirect';

const TournamentListItem = ({ tournament, deleteHandler }) => {
  const { id, name, course, date, startTime, formats, players } = tournament;

  const [navToEdit, setNavToEdit] = useState(false);
  const [navToAddPlayer, setNavToAddPlayer] = useState(false);

  const formatsAsListItems = formats.map((f, index) => <li key={`tournamnet-${tournament.id}-format-${index}`}>{ f }</li>);

  return(
    <>
      <h2>
        { name } 
        <button className="btn btn-primary ms-2" onClick={ () => setNavToEdit(true) }>Edit</button>
        <button className="btn btn-primary ms-2" onClick={ () => deleteHandler(id) }>Delete</button>
      </h2>
      <p>Course: { course }</p>
      <p>Date: { date } at { startTime }</p>
      <p>Formats:</p>
      <ul>
        { formatsAsListItems }
      </ul>
      <p>PlayerCount: { !!players ? players.length : 0 }
        <button className="btn btn-primary ms-2" onClick={ () => setNavToAddPlayer(true) }>Add/Remove Players</button>
      </p>
      <ConditionalRedirect to={`/tournaments/${id}/edit`} condition={ navToEdit } />
      <ConditionalRedirect to={`/tournaments/${id}/edit/players`} condition={ navToAddPlayer } />
    </>
  )
}

export default TournamentListItem;