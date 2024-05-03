import React from "react";
import {useRef, useState, useEffect} from "react";
import './BookTickets.css';
import Seat from "./Movie-Seat-Icon.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchService } from "src/services/FetchService";
import { Link } from "react-router-dom";
/*
    Eventually, change the method to submit to use useEffect and store booking info in a booking variable (don't forget to create a submit handler)
*/

const BookTickets = () => {
    //Parameter of the movie time
    const { id } = useParams();

    const navigate = useNavigate();
    const {state} = useLocation();

    const [movieTime, setMovieTime] = useState("");
    const [childInput,setchildInput] = useState(0);
    const [adultInput,setAdultInput] = useState(0);
    const [seniorInput,setSeniorInput] = useState(0);
    const [bookedMovieTitle, setBookedMovieTitle] = useState("");
    const [childPrice, setChildPrice] = useState();
    const [adultPrice, setAdultPrice] = useState();
    const [seniorPrice, setSeniorPrice] = useState();
    const [seatSelection, setSeatSelection] = useState([]);
    const [updatedSeats,setUpdatedSeats] = useState([])

    const handleAddingSeat = (e) => {
        const seatId = e.target.id.replace('Seat', '');
        const row = Math.floor((seatId - 1) / 4);
        const col = (seatId - 1) % 4;

        if (movieTime.theatre && movieTime.theatre.seats[row][col]) {
            alert('This seat is already booked.');
            return;
        }

        updatedSeats[row][col] = true;
        console.log(updatedSeats)

        setSeatSelection(prev => {
            const isSelected = prev.includes(seatId);
            if (isSelected) {
                e.target.style.backgroundColor = "";
                return prev.filter(s => s !== seatId);
            } else {
                e.target.style.backgroundColor = "grey";
                return [...prev, seatId];
            }
        });
    };

    
    useEffect(() => {
        fetch(`http://localhost:8080/get-movie-time/?id=${id}`, {
            method: "GET",
        }).then(response => {
            if (response.status == 200) {
                return response.json();
            }
            if (!response.ok) {
                throw new Error('API call failed');
            }
        }).then(data => {
            setUpdatedSeats(data.theatre.seats.map(row=>row.slice()))
            setMovieTime(data);
            setChildPrice(data.theatre.childTicketPrice);
            setAdultPrice(data.theatre.adultTicketPrice);
            setSeniorPrice(data.theatre.seniorTicketPrice);
            setBookedMovieTitle(state);
        }).catch(error => {
            // Handle other errors
        });

    }, []);

    useEffect(()=>{
        console.log(movieTime)
        console.log(updatedSeats)
    },);

    /**Handles confirmation submission */
    function handleSubmit(e) {
        e.preventDefault();

        const totalTickets = parseInt(childInput) + parseInt(adultInput) + parseInt(seniorInput);

        // Check if the number of selected seats matches the number of tickets
        if (totalTickets !== seatSelection.length) {
            alert(`The number of selected seats (${seatSelection.length}) does not match the total number of tickets (${totalTickets}). Please adjust your selection.`);
            return; // Stop further execution if there is a mismatch
        }

        if (childInput + seniorInput + adultInput <= 0) {
            alert("Must select at least one ticket");
            return;
        }

        var updatedMovieTime = movieTime;
        updatedMovieTime.theatre.seats = updatedSeats
        console.log(updatedMovieTime)
        

        const booking = {
            movieTime: updatedMovieTime,
            childInput:childInput,
            adultInput:adultInput,
            seniorInput:seniorInput,
            movieTitle: bookedMovieTitle
        }
        navigate('/checkout', { state: { booking: booking } });
    }

    return (
        movieTime && <div id="bkTicksPage">
            <div id="bkTicksHdrContainer">
                {/* <div id="emptySpace"></div> */}
                <h1 id="bkTicksHdr">Booking Tickets for {bookedMovieTitle} at {movieTime.time}</h1>
                {/* <img id="profileImg"/> */}

            </div>
            <form>
                <div className="bkTicksAllFields">
                    <div className="bkTicksFields2">
                        <h4>Select Tickets</h4>
                        <label>Child (${childPrice}):</label>
                        <input 
                            type="number" 
                            min="0" 
                            value={childInput} 
                            onChange={e=>setchildInput(e.target.value)}/>
                        <label>Adult (${adultPrice}):</label>
                        <input 
                            type="number" 
                            min="0" 
                            value={adultInput} 
                            onChange={e=>setAdultInput(e.target.value)}/>
                        <label>Senior (${seniorPrice}):</label>
                        <input 
                            type="number" 
                            min="0" 
                            value={seniorInput} 
                            onChange={e=>setSeniorInput(e.target.value)}/>
                    </div>
                </div>
                <h4>Select desired seats</h4>
                {Array.from({ length: 4 }, (_, rowIndex) => (
                    <div className="seatSection" key={rowIndex}>
                        {Array.from({ length: 4 }, (_, colIndex) => {
                            const seatId = rowIndex * 4 + colIndex + 1;
                            return (
                                <img 
                                key={seatId} 
                                className="seatLayoutImg" 
                                id={`Seat${seatId}`} 
                                src={Seat} 
                                alt="Seat" 
                                onClick={handleAddingSeat} 
                                style={{ backgroundColor: movieTime.theatre.seats[rowIndex][colIndex] ? "red" : "transparent" }}
                                />
                            );
                        })}
                    </div>
                ))}
                <div className="submitCancelBtn">
                <input type="submit" value="Submit" onClick={handleSubmit}></input>
                    <Link to="/"><input type="button" value="Cancel" /></Link>
                </div>
            </form>            
        </div>
    )
}

export default BookTickets;