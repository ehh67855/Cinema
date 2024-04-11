import React from "react";
import {useRef, useState, useEffect} from "react";
import './BookTickets.css';
import Seat from "./Movie-Seat-Icon.png";
/*
    Eventually, change the method to submit to use useEffect and store booking info in a booking variable (don't forget to create a submit handler)
*/


const BookTickets = () => {

    const totalTicketNum = useRef(0);
    let childTicketAmount = useRef(0);
    let adultTicketAmount = useRef(0);
    let seniorTicketAmount = useRef(0);
    let seatSelection = [];

    function handleSelectSeat(e) {
        seatSelection.push(e.target.id);
        for (let i = 0; i < seatSelection.length; i++) {
            console.log(seatSelection[i]);
        }
    }

    return (
        <div id="bkTicksPage">
            <div id="bkTicksHdrContainer">
                {/* <div id="emptySpace"></div> */}
                <h1 id="bkTicksHdr">Booking Tickets for:</h1>
                {/* <img id="profileImg"/> */}
            </div>
            <h2 id="movieTitle">[title of movie here]</h2>
            <form>
                <div className="bkTicksAllFields">
                    <div className="bkTicksFields1Container">
                        <div className="bkTicksFields1">
                            <label>Select showing date:</label>
                            <select name="selectDate">
                                <option value="">Choose a date</option>
                                <option value="option1">option1</option>
                                <option value="option2">option2</option>
                            </select>
                        </div>
                        <div className="bkTicksFields1">
                            <label>Select showing time:</label>
                            <select name="selectTime">
                                <option value="">Choose a time</option>
                                <option value="option1">option1</option>
                                <option value="option2">option2</option>
                            </select>
                        </div>
                        <div className="bkTicksFields1">
                            <label>Choose number of tickets:</label><input ref={totalTicketNum} type="number" min="0" max="16"/>
                        </div>
                    </div>
                    <div className="vertLine"></div>
                    <div className="bkTicksFields2">
                        <h4>Select age per ticket</h4>
                        <label>Child ($10):</label><input type="number" min="0" max={totalTicketNum - adultTicketAmount - seniorTicketAmount} ref={childTicketAmount}/>
                        <label>Adult ($10):</label><input type="number" min="0" max={totalTicketNum - childTicketAmount - seniorTicketAmount} ref={adultTicketAmount}/>
                        <label>Senior ($10):</label><input type="number" min="0" max={totalTicketNum - childTicketAmount - adultTicketAmount} ref={seniorTicketAmount}/>
                    </div>
                </div>
                <h4 className="centeredH4">Select desired seats</h4>
                <h6>(select the seats you want by clicking the seats on the image below)</h6>
                <div class="seatSection">
                    <img className="seatLayoutImg" id="Seat1" src={Seat} alt="image depicting the layout of seats in a movie theater" onClick={handleSelectSeat}/>
                    <img className="seatLayoutImg" id="Seat2" src={Seat} alt="image depicting the layout of seats in a movie theater" onClick={handleSelectSeat}/>
                    <img className="seatLayoutImg" id="Seat3" src={Seat} alt="image depicting the layout of seats in a movie theater" onClick={handleSelectSeat}/>
                    <img className="seatLayoutImg" id="Seat4" src={Seat} alt="image depicting the layout of seats in a movie theater" onClick={handleSelectSeat}/>
                </div>
                <div class="seatSection">
                    <img className="seatLayoutImg" id="Seat5" src={Seat} alt="image depicting the layout of seats in a movie theater" onClick={handleSelectSeat}/>
                    <img className="seatLayoutImg" id="Seat6" src={Seat} alt="image depicting the layout of seats in a movie theater" onClick={handleSelectSeat}/>
                    <img className="seatLayoutImg" id="Seat7" src={Seat} alt="image depicting the layout of seats in a movie theater" onClick={handleSelectSeat}/>
                    <img className="seatLayoutImg" id="Seat8" src={Seat} alt="image depicting the layout of seats in a movie theater" onClick={handleSelectSeat}/>
                </div>
                <div class="seatSection">
                    <img className="seatLayoutImg" id="Seat9" src={Seat} alt="image depicting the layout of seats in a movie theater" onClick={handleSelectSeat}/>
                    <img className="seatLayoutImg" id="Seat10" src={Seat} alt="image depicting the layout of seats in a movie theater" onClick={handleSelectSeat}/>
                    <img className="seatLayoutImg" id="Seat11" src={Seat} alt="image depicting the layout of seats in a movie theater" onClick={handleSelectSeat}/>
                    <img className="seatLayoutImg" id="Seat12" src={Seat} alt="image depicting the layout of seats in a movie theater" onClick={handleSelectSeat}/>
                </div>
                <div class="seatSection">
                    <img className="seatLayoutImg" id="Seat13" src={Seat} alt="image depicting the layout of seats in a movie theater" onClick={handleSelectSeat}/>
                    <img className="seatLayoutImg" id="Seat14" src={Seat} alt="image depicting the layout of seats in a movie theater" onClick={handleSelectSeat}/>
                    <img className="seatLayoutImg" id="Seat15" src={Seat} alt="image depicting the layout of seats in a movie theater" onClick={handleSelectSeat}/>
                    <img className="seatLayoutImg" id="Seat16" src={Seat} alt="image depicting the layout of seats in a movie theater"onClick={handleSelectSeat}/>
                </div>
                
                <div className="submitCancelBtn">
                    <input type="submit" value="Submit"></input>
                    <input type="button" value="Cancel"></input>
                </div>
            </form>            
        </div>
    )
}

export default BookTickets;