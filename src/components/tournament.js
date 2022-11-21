import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTournament, deleteTournament } from '../actions/tournamentActions';
import LoadingGif from './loadingGif';

import ConditionalRedirect from './conditionalRedirect';

const Tournament = ({ user }) => {

  let name, course, date, startTime, formats, players, formatsAsListItems;
  const params = useParams();
  let id;

  const [tournament, setTournament] = useState();

  useEffect(() => {
    if (!!params && !!params.id) {
      id = params.id;
    }
    const tempTournament = getTournament(user, id);

    setTournament(tempTournament);
  }, []);

  const [navToEdit, setNavToEdit] = useState(false);
  const [navToAddPlayer, setNavToAddPlayer] = useState(false);
  const [navToTournaments, setNavToTournaments] = useState(false);

  const handleDeleteTournament = async (id) => {
    await deleteTournament(user, id);
    setNavToTournaments(true);
  }

  const getContent = () => {
    if (!tournament) {
      return <LoadingGif />;
    }
    else {
      name = tournament.name;
      course = tournament.course;
      date = tournament.date;
      startTime = tournament.startTime;
      formats = tournament.formats;
      players = tournament.players;
      id = params.id;
      formatsAsListItems = formats.map((f, index) => <li key={`tournament-${tournament.id}-format-${index}`}>{ f }</li>);
      return (
        <div className="show-page page-with-background">
          <h2>
            { name } 
            <button className="btn btn-primary ms-2" onClick={ () => setNavToEdit(true) }>Edit</button>
            <button className="btn btn-primary ms-2" onClick={ () => handleDeleteTournament(id) }>Delete</button>
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
          <ConditionalRedirect to={"/tournaments"} condition={ navToTournaments } />
        </div>
      );
    }
  }

  return(
    getContent()
  );
}

export default Tournament;