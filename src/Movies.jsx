import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from './components/MovieCard'
import Pagination from './components/Pagination';

const Movies = ({handleAddtoWatchlist, handleRemoveFromWatchlist, watchList}) => {

  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);


  const handlePrev = ()=>{
    if(pageNo === 1){
      setPageNo(pageNo);
    }else{
      setPageNo((old) => old - 1);
    }
  }
  const handleNext = ()=>{
    setPageNo((old) => old + 1);
  }

  useEffect(()=>{

    const fetchData = async ()=>{
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=12d3e4a17b05ffb4000e03cb6769eb97&page=${pageNo}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.results);
      setMovies(data.results);

    }
    fetchData()

    // axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=12d3e4a17b05ffb4000e03cb6769eb97&page=${pageNo}`).then(function(res){
    // console.log(res.data.results);  
    // setMovies(res.data.results);
    // })
  }, [pageNo]);

  return (
    <div className='p-5'>
       <div className='text-2xl m-5 font-bold text-center'>
            Trending Movies
       </div>
       <div className='flex flex-row flex-wrap justify-around '>
            {/* <MovieCard /> */}

            {movies.map((movieObj)=> {
              return <MovieCard  key={movieObj.id} movieObj={movieObj} poster_path={movieObj.poster_path} name={movieObj.original_title} handleAddtoWatchlist={handleAddtoWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist} watchList={watchList}/>
            })}
           
          

       </div>
       <Pagination  handlePrev={handlePrev} handleNext={handleNext} pageNo={pageNo}/>
    </div>
  )
}

export default Movies

