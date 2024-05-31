import { useEffect, useState } from "react";
import Banner from "./Banner";
import Movies from "./Movies";
import WatchList from "./WatchList";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  let [watchList, setWatchList] = useState([]);



  let handleAddtoWatchlist = (movieObj) =>{
    let newWatchList = [...watchList, movieObj];
    localStorage.setItem("movieApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);

    console.log(newWatchList)
  }

 let handleRemoveFromWatchlist = (movieObj)=>{
  let filterredWatchlist = watchList.filter((movie)=>{
    return movie.id != movieObj.id;
  })
  setWatchList(filterredWatchlist)
  localStorage.setItem('movieApp', JSON.stringify(filterredWatchlist))
  console.log(watchList);
 }

  useEffect(()=>{
    let movieFromLoaclStorage = localStorage.getItem("movieApp");
    if(!movieFromLoaclStorage){
      return
    }

    setWatchList(JSON.parse(movieFromLoaclStorage));
  }, [])


  return (
    <>
  
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<><Banner /> <Movies handleAddtoWatchlist={handleAddtoWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist} watchList={watchList}/></>} />
          
          <Route path="/watchlist" element={<WatchList watchList={watchList} setWatchList={setWatchList} handleRemoveFromWatchlist={handleRemoveFromWatchlist}/>} />
          
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
