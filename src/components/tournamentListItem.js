import { useState } from 'react';
import ConditionalRedirect from './conditionalRedirect';

const TournamentListItem = ({ tournament }) => {
  const { id, name, course, date, startTime} = tournament;

  const [navToTournament, setNavToTournament] = useState(false);

  return(
    <>
      <h2 >
        <div className="clickable" onClick={ () => setNavToTournament(true) }>
          { name } 
        </div>
      </h2>
      <p>Course: { course }</p>
      <p>Date: { date } at { startTime }</p>

      <ConditionalRedirect to={`/tournaments/${id}`} condition={ navToTournament } />
    </>
  )
}

export default TournamentListItem;