import React, { useEffect, useState } from "react";

import genreids from './Utility/Genre'


const WatchList = ({ watchList, setWatchList, handleRemoveFromWatchlist }) => {
  const [search, setSearch] = useState("");

  const [genreList, setGenreList] = useState(['All Genres']);
  const [currGenre, setCurrentGenre] = useState('All Genres');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };


  const handleFilter = (genre)=>{
    setCurrentGenre(genre);
  }

  const sortIncresing = () => {
    const sortedIncreasing = watchList.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchList([...sortedIncreasing]);
  };

  const sortDecresing = () => {
    const sortedDecresing = watchList.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });

    setWatchList([...sortedDecresing]);
  };

  // const sortingBaseOnPopalirity = () => {
  //   const sortedIncreasingPopularity = watchList.sort((movieA, movieB) => {
  //     return movieA.popularity - movieB.popularity;
  //   });
  //   setWatchList([...sortedIncreasingPopularity]);
  // };

  useEffect(()=>{
    let temp = watchList.map((movieObj)=>{
      return genreids[movieObj.genre_ids[0]];
    })
    temp = new Set(temp);
    setGenreList(['All Genres', ...temp])
  }, [watchList]);

  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        
        {genreList.map((genre)=>{
           return <div onClick={()=>handleFilter(genre)} className={currGenre==genre ? "flex justify-center items-center h-[2rem] w-[5rem] rounded-lg font-bold text-white bg-blue-400 mx-4" : "flex justify-center items-center h-[2rem] w-[5rem] rounded-lg font-bold text-white bg-gray-400/50 mx-2"}>
            {genre}
          </div>
        })}
      </div>

      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search Movies"
          className="h-[2rem] w-[18rem] bg-gray-200 outline-none px-2 "
        />
      </div>

      <div className="overflow-hidden  border border-gray-200 mx-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <div className="flex justify-center">
                <div onClick={sortIncresing} className="p-2">
                  <i class="fa-solid fa-arrow-up"></i>
                </div>
                <div className="p-2">Ratings</div>
                <div onClick={sortDecresing} className="p-2">
                  <i class="fa-solid fa-arrow-down-long"></i>
                </div>
              </div>

              <th>Popularity</th>

              <th>Genre</th>
            </tr>
          </thead>

          <tbody>
            {watchList.filter((movObj)=>{
              if(currGenre == 'All Genres'){
                return true;
              }else{
                return genreids[movObj.genre_ids[0]]==currGenre;
              }
            })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[4rem] w-[6rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        alt=""
                      />
                      <div className="mx-10">{movieObj.title}</div>
                    </td>

                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>

                    <td onClick={()=>handleRemoveFromWatchlist(movieObj)} className="text-red-800 cursor-pointer">Delete</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WatchList;
