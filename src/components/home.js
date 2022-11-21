import logo from '../images/Golf Ball.png';

const Home = () => {
  return(
    <>
      <div class="home-page-logo">
        <img src={logo} alt="Golf Ball Logo" />
      </div>
      <h1 className="home-page-company-name">Tater Golf</h1>
    </>
  )
}

export default Home;