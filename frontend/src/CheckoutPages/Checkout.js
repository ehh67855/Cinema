import React, { useEffect, useState } from "react";
import './Checkout.css';
import { useLocation, useNavigate } from "react-router-dom";
import { getLogin, getAuthToken } from "src/services/BackendService";
import PromotionForm from "./PromotionForm";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
    const [selectedCard, setSelectedCard] = useState({}); 
    const [discount,setDiscount] = useState(0);
    const [bookingFee,setBookingFee] = useState(0);

    const booking = location.state.booking;


    //Calculations
    const seniorTicketCost = booking.seniorInput * booking.movieTime.theatre.seniorTicketPrice;
    const adultTicketCost = booking.adultInput * booking.movieTime.theatre.adultTicketPrice;
    const childTicketCost = booking.childInput * booking.movieTime.theatre.childTicketPrice;


    useEffect(() => {
        console.log(location);
    }, [location]);


    //Fetching user
    useEffect(() => {
        const login = getLogin(getAuthToken());
        fetch(`http://localhost:8080/get-user/${login}`, {
            method: "GET",
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            if (!response.ok) {
                throw new Error('API call failed');
            }
        }).then(data => {
            setUserData(data);
            setSelectedCard(data.creditCards[0])
            console.log(data);
        }).catch(error => {
            console.error('Failed to fetch user data:', error);
        });
    }, []);

    useEffect(()=>{
        fetch("http://localhost:8080/get-booking-fee",{
            method:"GET"
        }).then(response => {
            if(response.status == 200) {
                return response.json();
            }
            throw new Error("error fetching booking fee");
        }).then(data=> {
            setBookingFee(data);
        }).catch(error => {
            console.log(error);
        })
    },[]);
    
    // Function to handle card selection
    const handleCardSelection = (e) => {
        setSelectedCard(e.target.value);
    };

    const handleSubmit = () => {

        console.log("selectedCard",selectedCard);
        fetch(`http://localhost:8080/add-booking`, {
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                movieTime:booking.movieTime,
                numChildTickets:booking.childInput,
                numAdultTickets:booking.adultInput,
                numSeniorTickets:booking.seniorInput,
                movieTitle:booking.movieTitle,
                creditCardId:selectedCard.id,
                login:getLogin(getAuthToken())
            })
        }).then(response => {
            if(response.status === 200) {
                return response.json();
            } else {
                alert("Something went wrong in checkout");
            }
            // throw new Error();
        }).then(data => {
            console.log(data);

            const orderInfo = {
                seniorTicketCost: seniorTicketCost,
                adultTicketCost: adultTicketCost,
                childTicketCost: childTicketCost,
                discount: discount,
                bookingFee: bookingFee,
                finalPrice: (seniorTicketCost+adultTicketCost+childTicketCost+bookingFee)*(1-(discount/100))*(1.07),
                bookingId: data.id
            }
    
            navigate('/orderConfirmation', { state: { orderInfo: orderInfo } });
        }).catch(error => {
            console.log("Error sending booking", error);
        })
    };

    return (
        userData && userData.creditCards ?
        <div id="checkoutPage">
            <div id="checkoutHdrContainer">
                <h1 id="checkoutHdr">Checkout</h1>
            </div>
            <div className="checkoutArea">
                <form id="formSection">
                    <div className="shippingSection">
                        <h2 className="checkoutAreaHdrs">Shipping Address</h2>
                        <label>Address:</label><input value={userData.homeAddress ? `${userData.homeAddress.street}, ${userData.homeAddress.city}, ${userData.homeAddress.state} ${userData.homeAddress.zipcode}` : 'No Address'}/>
                    </div>
                    <div className="paymentSection">
                        <h2 className="checkoutAreaHdrs">Payment</h2>
                        <label>Card:</label>
                        <select id="cardSelect" value={selectedCard} onChange={handleCardSelection}>
                            {userData.creditCards.map(card => (
                                <option key={card.id} value={card.id}>
                                    {`Card Type:${card.cardType} | Card Number: ${card.cardNumber}`}
                                </option>
                            ))}
                        </select>

                        <PromotionForm setDiscount={setDiscount} promotionsEnabled={userData.promotionsEnabled}></PromotionForm>
                    </div>
                </form>
                <div className="orderSummary">
                    <h2 className="checkoutAreaHdrs" id="orderSumHdr">Order Summary</h2>
                    <p>Senior Tickets: $ {seniorTicketCost}</p>
                    <p>Adult Tickets: $ {adultTicketCost}</p>
                    <p>Child Tickets: $ {childTicketCost}</p>
                    <p>Promo Discount: % {discount}</p>
                    <p>Booking fees: $ {bookingFee}</p>
                    <p>Sales tax: % 7</p>
                    <p id="orderSumFinalPara">Total: $ {(seniorTicketCost+adultTicketCost+childTicketCost+bookingFee)*(1-(discount/100))*(1.07)}</p>
                </div>
            </div>
            <div className="confirmCancelBtn">
                <a onClick={handleSubmit} className="btn btn-primary">Confirm</a>
            </div>
        </div>
        : <div>Loading...</div>
    );
}

export default Checkout;