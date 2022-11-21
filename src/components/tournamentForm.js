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
        existingTournament.formats = ["Handi"];
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
    <div className='page-with-background'>
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
          <label>Formats (Select one or more, enter all or part of format name to filter): </label>
          <input 
            name="startTime" 
            id="startTime" 
            type="text" 
            className="form-control" 
            onChange={ setFormats } 
            value={!!tournament?.formats ? tournament.formats.join(", ") : "" } 
            disabled={updating}
            />
            <h3>Available:</h3>
            <ul>
              <li>USGA Handicap</li>
              <li>Peoria Handicap</li>
              <li className='red' onClick={() => alert("Match Play is not available since Stroke Play is selected.")}>
                Click to see formats that are unavailable due to confilcts with selected formats...
              </li>
            </ul>
            <h3>Selected:</h3>
            <ul>
              <li>Stroke Play</li>
            </ul>
        </div>
        <input type="submit" className="btn btn-primary" />
      </form>
      <ConditionalRedirect to="/tournaments" condition={submitted} />
    </div>
  );
}

export default TournamentForm;