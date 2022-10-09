const TournamentPlayer = ({ player, addRemove, handleClick }) => {
  if (!!player) {
    const { id, name, gender, handicap } = player;
  
    const genderLetter = () => {
      return gender === "Male" ? "M" : "F"; 
    } 
  
    return(
      <li className="mb-2" key={`player-${id}`}>
      <button className="btn btn-primary" onClick={() => handleClick(id)} >{addRemove} Player </button>
       - { name } - { genderLetter() } - { handicap }
      </li>
    );
  }

  return(<></>);
}

export default TournamentPlayer;