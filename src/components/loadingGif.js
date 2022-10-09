const LoadingGif = () => {
  return(
    <>
      <div styles="width:100%;height:0;padding-bottom:100%;position:relative;">
        <iframe 
          title="loading"
          src="https://giphy.com/embed/3oEjI6SIIHBdRxXI40" 
          width="100%" height="100%" styles="position:absolute" 
          frameBorder="0" 
          className="giphy-embed" 
          allowFullScreen
        >
        </iframe>
      </div>
      <p><a href="https://giphy.com/gifs/mashable-3oEjI6SIIHBdRxXI40">via GIPHY</a></p>
    </>
  );
}

export default LoadingGif;