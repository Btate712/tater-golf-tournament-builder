import { useState, useEffect } from 'react';
import ConditionalRedirect from './conditionalRedirect';
import LoadingGif from './loadingGif';
import { getTournaments } from '../actions/tournamentActions';
import TournamentListItem from './tournamentListItem';

const Tournaments = ({ user, deleteHandler }) => {
  const [newTournament, setNewTournament] = useState(false);
  const [tournaments, setTournaments] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchTournaments();
    }
    fetchData();
  }, []);

  const fetchTournaments = async () => {
    const t = await getTournaments();
    setTournaments(t);
  }

  const handleNewTournament = () => {
    setNewTournament(true);
  }

  const getContent = () => {
    if (tournaments === null) {
      return <LoadingGif />;
    }
    else {
      return (
        <ul>
          { tournaments.map(t => {
            return (
              <li key={`tournament-${t.id}-li`} id={`tournament-${t.id}-li`}>
                <TournamentListItem tournament={t} />
              </li> 
            )
          })}
        </ul>
      );
    }
  }

  return (
    <div className="page-with-background">
      <h1>Tournaments</h1>
      { getContent() }
      <button type="button" className="btn btn-primary" onClick={ handleNewTournament }>New Tournament</button>
      <ConditionalRedirect to="/tournaments/new" condition={ newTournament } />
    </div>
  )
}



export default Tournaments;