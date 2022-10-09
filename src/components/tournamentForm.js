import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createOrUpdateTournament, getTournament } from '../actions/tournamentActions';
import ConditionalRedirect from './conditionalRedirect';

const TournamentForm = ({ user, existing }) => {
  const [tournament, setTournament] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const params = useParams();
  let id;

  if (!!params && !!params.id) {
    id = params.id;
  }

  useEffect(() => {
    const loadExisting = async () => {
      if (existing) {
        const existingTournament = await getTournament(user, id);
        setTournament(existingTournament);
      }
    }

    loadExisting();
  }, []);


  const handleInputChange = event => {
    const updatedTournament = { ...tournament };
    updatedTournament[event.target.name] = event.target.value;
    setTournament(updatedTournament);
  }

  const setFormats = event => {
    const updatedTournament = { ...tournament };
    updatedTournament.formats = getFormatArrayFromString(event.target.value);
    setTournament(updatedTournament);
  }

  const getFormatArrayFromString = commaSeparatedString => {
    return commaSeparatedString.split(", ");
  }

  const getHeading = () => {
    if (updating) {
      return "Saving...";
    }

    if (loading()) {
      return "Loading...";
    }

    return existing ? "Edit Tournament" : "New Tournament";
  }

  const handleSubmit = async event => {
    event.preventDefault();
    setUpdating(true);
    await createOrUpdateTournament(user, tournament);
    setTournament(null);
    setSubmitted(true);
  }

  const loading = () => {
    return existing && tournament === null;
  }

  return (
    <>
      <h1>{ getHeading() }</h1>
      <form onSubmit={ handleSubmit } className="container">
        <div className="form-group">
          <label>Name: </label>
          <input 
            name="name" 
            id="name" 
            type="text" 
            className="form-control" 
            onChange={ handleInputChange } 
            value={!!tournament?.name ? tournament.name : "" } 
            disabled={updating}
          />
        </div>
        <div className="form-group">
          <label>Course: </label>
          <input 
            name="course" 
            id="course" 
            type="text" 
            className="form-control" 
            onChange={ handleInputChange } 
            value={!!tournament?.course ? tournament.course : "" } 
            disabled={updating}
            />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <input 
            name="date" 
            id="date" 
            type="text" 
            className="form-control" 
            onChange={ handleInputChange } 
            value={!!tournament?.date ? tournament.date : "" } 
            disabled={updating}
            />
        </div>
        <div className="form-group">
          <label>Start Time: </label>
          <input 
            name="startTime" 
            id="startTime" 
            type="text" 
            className="form-control" 
            onChange={ handleInputChange } 
            value={!!tournament?.startTime ? tournament.startTime : "" } 
            disabled={updating}
            />
        </div>
        <div className="form-group">
          <label>Formats (Enter as a comma-separated list): </label>
          <input 
            name="startTime" 
            id="startTime" 
            type="text" 
            className="form-control" 
            onChange={ setFormats } 
            value={!!tournament?.formats ? tournament.formats.join(", ") : "" } 
            disabled={updating}
            />
        </div>
        <input type="submit" className="btn btn-primary" />
      </form>
      <ConditionalRedirect to="/tournaments" condition={submitted} />
    </>
  );
}

export default TournamentForm;