import React from "react";
import MovieTime from "./AdminMovieTimeCard";


function AdminMovieTimesContainer({movieTimes}) {

    return (
        <>
        <div className="container">
            <div className="row">
                {movieTimes.map((movieTime) => (
                <div className="col-md-4" key={movieTime.id}>
                    <MovieTime movieTime={movieTime} />
                </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default AdminMovieTimesContainer;