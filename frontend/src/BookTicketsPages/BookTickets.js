import React from "react";
import {useRef, useState, useEffect} from "react";
import './BookTickets.css';
import Seat from "./Movie-Seat-Icon.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchService } from "src/services/FetchService";
/*
    Eventually, change the method to submit to use useEffect and store booking info in a booking variable (don't forget to create a submit handler)
*/


const BookTickets = () => {

    //Parameter of the movie time
    const { id } = useParams(); 
    const [movieTime, setMovieTime] = useState("");
    const [movieDate, setMovieDate] = useState("");
    const [bookedMovieTitle, setBookedMovieTitle] = useState("");

    const totalTicketNum = useRef(0);
    let childTicketAmount = useRef(0);
    let adultTicketAmount = useRef(0);
    let seniorTicketAmount = useRef(0);
    let seatSelection = [];

    const navigate = useNavigate();
    const {state} = useLocation();
    


    
    /**
     * Creates a booking object that stores the amount of child, adult, and senior tickets as well as the chosen seats and a randomly generated ID.
     */
    // let booking = { 
    //     bookingChildTickets: childTicketAmount.current.value,
    //     bookingAdultTickets: adultTicketAmount.current.value,
    //     bookingSeniorTicketAmount: seniorTicketAmount.current.value,
    //     bookingSeatSelection: seatSelection,
    //     bookingMovieTitle: bookedMovieTitle,
    //     bookingMovieTime: movieTime,
    //     bookingMovieDate: movieDate
    // };

    const childTicketHandler = (e) => {
        childTicketAmount = e.target.value;
    };

    const adultTicketHandler = (e) => {
        adultTicketAmount = e.target.value;
    };

    const seniorTicketHandler = (e) => {
        seniorTicketAmount = e.target.value;
    };

    /**
     * Adds seats to the seatSelection array and removes seats if the seat is already in the seat selection array.
     */
    function handleAddingSeat(e) {
        if (seatSelection.includes(e.target.id)) {
            seatSelection.splice(seatSelection.indexOf(e.target.id), 1);
            e.target.style.backgroundColor = "";
        } else {
            seatSelection.push(e.target.id);
            e.target.style.backgroundColor = "grey";
        }
    }
   
    useEffect(() => {
        fetchService(`get-movie-time/${id}`, (data) => {
            setMovieTime(data.time.toString());
            setMovieDate(data.date.toString());
        });

        setBookedMovieTitle(state);
    }, []);

    /**Handles confirmation submission */
    function handleSubmit() {
        // booking.bookingChildTickets = childTicketAmount.current.value;
        // booking.bookingAdultTickets = adultTicketAmount.current.value;
        // booking.bookingSeniorTicketAmount = seniorTicketAmount.current.value;
        // booking.bookingSeatSelection = seatSelection;

        const booking = {
            bookingChildTickets: childTicketAmount,
            bookingAdultTickets: adultTicketAmount,
            bookingSeniorTicketAmount: seniorTicketAmount,
            bookingSeatSelection: seatSelection,
            bookingMovieTitle: bookedMovieTitle,
            bookingMovieTime: movieTime,
            bookingMovieDate: movieDate
        };

        /*
            do useNavigate stuff here (and figure out how to get the booking object above to be transfered )
        */
        navigate('/checkout', { state: { booking: booking } });
    }

    return (
        <div id="bkTicksPage">
            <div id="bkTicksHdrContainer">
                {/* <div id="emptySpace"></div> */}
                <h1 id="bkTicksHdr">Booking Tickets for:</h1>
                {/* <img id="profileImg"/> */}
            </div>
            <h2 id="movieTitle">{ bookedMovieTitle }</h2>
            <form>
                <div className="bkTicksAllFields">
                    <div className="bkTicksFields2">
                        <h4>Select Tickets</h4>
                        <label>Child ($10):</label><input type="number" min="0" max={totalTicketNum - adultTicketAmount - seniorTicketAmount} ref={childTicketAmount} onChange={childTicketHandler}/>
                        <label>Adult ($10):</label><input type="number" min="0" max={totalTicketNum - childTicketAmount - seniorTicketAmount} ref={adultTicketAmount} onChange={adultTicketHandler}/>
                        <label>Senior ($10):</label><input type="number" min="0" max={totalTicketNum - childTicketAmount - adultTicketAmount} ref={seniorTicketAmount} onChange={seniorTicketHandler}/>
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
                    <input type="button" value="Cancel"></input>
                </div>
            </form>            
        </div>
    )
}

export default BookTickets;