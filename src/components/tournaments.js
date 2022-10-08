import { useState } from 'react';
import ConditionalRedirect from './conditionalRedirect';

const Tournaments = () => {
  const [newTournament, setNewTournament] = useState(false);

  const handleNewTournament = () => {
    setNewTournament(true);
  }

  return (
    <>
      <h1>Tournaments</h1>
      <button type="button" class="btn btn-primary" onClick={ handleNewTournament }>New Tournament</button>
      <ConditionalRedirect to="/tournaments/new" condition={ newTournament } />
    </>
  )
}

export default Tournaments;