import React from "react";
import WatchList from "../WatchList";

const MovieCard = ({
  movieObj,
  poster_path,
  name,
  handleAddtoWatchlist,
  handleRemoveFromWatchlist,
  watchList,
}) => {
  function doesContain(movieObj) {
    for (let i = 0; i < watchList.length; i++) {
      if (watchList[i].id === movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <>
      <div
        className="h-[50vh] w-[160px] m-2 bg-center flex-wrap bg-cover rounded-xl hover:scale-110 duration-300 cursor-pointer flex flex-col justify-between items-end bg-gray-900/60"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
        }}
      >
        {doesContain(movieObj) ? (
          <div onClick={() => handleRemoveFromWatchlist(movieObj)}>
            &#10060;
          </div>
        ) : (
          <div onClick={() => handleAddtoWatchlist(movieObj)}>&#128525;</div>
        )}

        <div className="text-white bg-gray-900/60 text-xl w-full p-2 text-center ">
          {name}
        </div>
      </div>
    </>
  );
};

export default MovieCard;
