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


    let seatSelection = [];


    /**
     * Adds seats to the seatSelection array and removes seats if the seat is already in the seat selection array.
     */
    function handleAddingSeat(e) {
        // Extracting the numerical part from the id (e.g., "Seat1" becomes "1")
        const seatNumber = e.target.id.replace('Seat', '');

        console.log(seatSelection.includes(seatNumber));
    
        if (seatSelection.includes(seatNumber)) {
            seatSelection.splice(seatSelection.indexOf(seatNumber), 1);
            e.target.style.backgroundColor = "";
        } else {
            seatSelection.push(seatNumber);
            e.target.style.backgroundColor = "grey";
        }
        console.log(seatSelection);
    }
    
   
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
            setMovieTime(data);
            setChildPrice(data.theatre.childTicketPrice);
            setAdultPrice(data.theatre.adultTicketPrice);
            setSeniorPrice(data.theatre.seniorTicketPrice);
            console.log("movie time",movieTime);
        }).catch(error => {
            // Handle other errors
        });
        setBookedMovieTitle(state);

    }, []);

    useEffect(()=>console.log(movieTime),);

    /**Handles confirmation submission */
    function handleSubmit(e) {
        e.preventDefault();

        if (childInput + seniorInput + adultInput <= 0) {
            alert("Must select at least one ticket");
            return;
        }

        const booking = {
            movieTime: movieTime,
            childInput:childInput,
            adultInput:adultInput,
            seniorInput:seniorInput,
            seatSelection:seatSelection,
            movieTitle: bookedMovieTitle
        }
        navigate('/checkout', { state: { booking: booking } });
    }

    return (
        <div id="bkTicksPage">
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
                <h4 className="centeredH4">Select desired seats</h4>
                <h6>(select the seats you want by clicking the seats on the image below)</h6>
                <div class="seatSection">
                    <img className="seatLayoutImg" id="Seat1" src={Seat} alt="Image of a seat" onClick={handleAddingSeat}/>
                    <img className="seatLayoutImg" id="Seat2" src={Seat} alt="Image of a seat" onClick={handleAddingSeat}/>
                    <img className="seatLayoutImg" id="Seat3" src={Seat} alt="Image of a seat" onClick={handleAddingSeat}/>
                    <img className="seatLayoutImg" id="Seat4" src={Seat} alt="Image of a seat" onClick={handleAddingSeat}/>
                </div>
                <div class="seatSection">
                    <img className="seatLayoutImg" id="Seat5" src={Seat} alt="Image of a seat" onClick={handleAddingSeat}/>
                    <img className="seatLayoutImg" id="Seat6" src={Seat} alt="Image of a seat" onClick={handleAddingSeat}/>
                    <img className="seatLayoutImg" id="Seat7" src={Seat} alt="Image of a seat" onClick={handleAddingSeat}/>
                    <img className="seatLayoutImg" id="Seat8" src={Seat} alt="Image of a seat" onClick={handleAddingSeat}/>
                </div>
                <div class="seatSection">
                    <img className="seatLayoutImg" id="Seat9" src={Seat} alt="Image of a seat" onClick={handleAddingSeat}/>
                    <img className="seatLayoutImg" id="Seat10" src={Seat} alt="Image of a seat" onClick={handleAddingSeat}/>
                    <img className="seatLayoutImg" id="Seat11" src={Seat} alt="Image of a seat" onClick={handleAddingSeat}/>
                    <img className="seatLayoutImg" id="Seat12" src={Seat} alt="Image of a seat" onClick={handleAddingSeat}/>
                </div>
                <div class="seatSection">
                    <img className="seatLayoutImg" id="Seat13" src={Seat} alt="Image of a seat" onClick={handleAddingSeat}/>
                    <img className="seatLayoutImg" id="Seat14" src={Seat} alt="Image of a seat" onClick={handleAddingSeat}/>
                    <img className="seatLayoutImg" id="Seat15" src={Seat} alt="Image of a seat" onClick={handleAddingSeat}/>
                    <img className="seatLayoutImg" id="Seat16" src={Seat} alt="Image of a seat"onClick={handleAddingSeat}/>
                </div>
                
                <div className="submitCancelBtn">
                    <input type="submit" value="Submit" onClick={handleSubmit}></input>
                    <Link to={"/"}>
                        <input type="button" value="Cancel"></input>
                    </Link>
                </div>
            </form>            
        </div>
    )
}

export default BookTickets;