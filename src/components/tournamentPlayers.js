import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TournamentPlayer from './tournamentPlayer';
import { getTournamentPlayerData, addPlayer, removePlayer } from '../actions/tournamentActions';
import LoadingGif from './loadingGif';

const TournamentPlayers = ({ user }) => {

  const { id } = useParams();
  const tournamentId = id;
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTournamentPlayerData(user, tournamentId);
      setPlayerData(data);
    }
    fetchData();
  }, []);

  const registeredPlayers = (data) => {
    let players = [];

    if (!!data)
    {
      const { allPlayers, tournamentPlayerIds } = data;

      if (tournamentPlayerIds?.length > 0 && allPlayers.length > 0) {
        players = data.tournamentPlayerIds.map(id => allPlayers.find(p => p.id === id));
      }
    }

    return players;
  } 

  const availablePlayers = (data) => {
    let players = [];

    if (!!data)
    {
      const { allPlayers, tournamentPlayerIds } = data;

      if (tournamentPlayerIds?.length > 0 && allPlayers.length > 0) {
        players = allPlayers.filter(p => !tournamentPlayerIds.includes(p.id));
      }
    }

    return players;
  }

  const copyPlayerData = () => {
    const newPlayerData = { ...playerData };

    newPlayerData.tournamentPlayerIds = [];
    for (const id of playerData.tournamentPlayerIds) {
      newPlayerData.tournamentPlayerIds.push(id);
    }

    newPlayerData.allPlayers = [];
    for (const player of playerData.allPlayers) {
      newPlayerData.allPlayers.push(player);
    }

    return newPlayerData;
  }

  const handleAddPlayer = async (id) => {
    const newPlayerData = copyPlayerData();
    
    newPlayerData.tournamentPlayerIds.push(id);

    setPlayerData(newPlayerData);

    await addPlayer(user, id, tournamentId);
  }

  const handleRemovePlayer = async (id) => {
    const newPlayerData = copyPlayerData();
    
    const indexToRemove = newPlayerData.tournamentPlayerIds.findIndex(e => e === id);
    newPlayerData.tournamentPlayerIds.splice(indexToRemove, 1);

    setPlayerData(newPlayerData);

    await removePlayer(user, id, tournamentId);
  }

  const getContent = () => {
    if (playerData === null) {
      return <LoadingGif />;
    }
    else {
      return (
        <>
          <h2>Registered Players</h2>
          <ul>
            { registeredPlayers(playerData).map(p => <TournamentPlayer player={p} addRemove="Remove" key={`player-${p.id}`} handleClick={ handleRemovePlayer } />) }
          </ul>
          <h2>Available Players</h2>
          <ul>
            { availablePlayers(playerData).map(p => <TournamentPlayer player = {p} addRemove="Add" key={`player-${p.id}`} handleClick={ handleAddPlayer }/>) }
          </ul>
        </>
      );
    }
  }

  return (
    <>
      <h1>Add/Remove Players</h1>
      { getContent() }
    </>
  );
}

export default TournamentPlayers;