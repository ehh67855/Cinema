import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import SeatTable from "./SeatTable";

import { navigate} from "react-router-dom";

import TicketOrder from "./TicketOrder";
import Checkout from "src/CheckoutPages/Checkout";


const BookTicketsPage = () => {

    const { id } = useParams();
    const [movieTime,setMovieTime] = useState();
    const [childInput,setchildInput] = useState(0);
    const [adultInput,setAdultInput] = useState(0);
    const [seniorInput,setSeniorInput] = useState(0);


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
            console.log("movie time",movieTime);
        }).catch(error => {
            // Handle other errors
            });
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/checkout', { state: { movieTime, selectedSeats } });
    }

    const renderOptions = () => {
        if (!movieTime) {
            return <h1>Loading</h1>
        } else 
            return <form onSubmit={submitHandler}>
                <h1>Selected Movie time: {movieTime.time}</h1>
                <h2>Select Tickets</h2>
                <label htmlFor="child">Child: ({movieTime.theatre.childTicketPrice}$)</label>
                <input
                type="number"
                id="child"
                value={childInput}
                min={0}
                onChange={(e) => setchildInput(e.target.value)}
                required
                />
                <br></br>

                <label htmlFor="adult">Adult: ({movieTime.theatre.adultTicketPrice}$) </label>
                <input
                type="number"
                id="adult"
                value={adultInput}
                min={0}
                onChange={(e) => setAdultInput(e.target.value)}
                required
                />
                <br></br>

                <label htmlFor="senior">Senior: ({movieTime.theatre.seniorTicketPrice}$) </label>
                <input
                type="number"
                id="senior"
                value={seniorInput}
                min={0}
                onChange={(e) => {console.log(movieTime);setSeniorInput(e.target.value);}}
                required
                />
                <br></br>
                <h3>Select seats</h3>
                <SeatTable seats={movieTime.theatre.seats}></SeatTable>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        }

    

    return (
        <>
        {renderOptions()}
        </>
    );
}

export default BookTicketsPage;