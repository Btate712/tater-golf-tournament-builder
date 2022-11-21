import { tournamentsDummyData } from '../dummyData/tournamentsDummyData';
import { getAllPlayers } from './playerActions';
import { SimulatedHttpRequestMs } from '../globalConstants';

const tournamentsFromDatabase = tournamentsDummyData;

export const getTournaments = async user => {
  // ToDo: Add call to API endpoint to get data
  await new Promise(resolve => setTimeout(resolve, SimulatedHttpRequestMs));
  return tournamentsFromDatabase;
}

export const createOrUpdateTournament = async (user, tournament) => {
  await new Promise(resolve => setTimeout(resolve, SimulatedHttpRequestMs));
  if (!!tournament.id) {
    const idToUpdate = tournamentsFromDatabase.findIndex(t => t.id == tournament.id);
    tournamentsFromDatabase[idToUpdate] = tournament;
  }
  else {
    tournament.id = _getNewId();
    tournamentsFromDatabase.push(tournament);
  }
}

export const getTournament = (user, tournamentId) => {
  return tournamentsFromDatabase.find(t => t.id == tournamentId);
}

export const deleteTournament = async (user, tournamentId) => {
  await new Promise(resolve => setTimeout(resolve, SimulatedHttpRequestMs));
  const indexToRemove = tournamentsFromDatabase.findIndex(t => t.id == tournamentId);
  tournamentsFromDatabase.splice(indexToRemove, 1);
}

export const getTournamentPlayerData = async (user, tournamentId) => {
  const tournament = tournamentsFromDatabase.find(t => t.id == tournamentId);
  const players = await getAllPlayers(user);
  const tournamentPlayerIds = tournament.players;
  return {
    tournamentName: tournament.name,
    tournamentPlayerIds: tournamentPlayerIds,
    allPlayers: players
  };
}

export const addPlayer = async (user, playerId, tournamentId) => {
  await new Promise(resolve => setTimeout(resolve, SimulatedHttpRequestMs));
  const tournament = tournamentsFromDatabase.find(t => t.id == tournamentId);
  tournament.players.push(playerId);
}

export const removePlayer = async (user, playerId, tournamentId) => {
  await new Promise(resolve => setTimeout(resolve, SimulatedHttpRequestMs));
  const tournament = tournamentsFromDatabase.find(t => t.id == tournamentId);
  const indexToRemove = tournament.players.findIndex(p => p.id === playerId);
  tournament.players.splice(indexToRemove, 1);
}

const _getNewId = () => {
  let i = 1;
  const existingIds = tournamentsFromDatabase.map(t => t.id);

  while (existingIds.includes(i)) {
    i++;
  }

  return i;
}