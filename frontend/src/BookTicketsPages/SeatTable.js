import { useEffect } from "react";
import Seat from "./Movie-Seat-Icon.png";

const seatSelection = [];



const SeatTable = ({ seats}) => {

    function handleAddingSeat(e, isAvailable) {
        if (isAvailable) return;  // Prevent interaction if the seat is not available
    
        if (seatSelection.includes(e.target.id)) {
            seatSelection.splice(seatSelection.indexOf(e.target.id), 1);
            e.target.style.backgroundColor = "";
        } else {
            seatSelection.push(e.target.id);
            e.target.style.backgroundColor = "grey";
        }
    }

    return (
        <>
            <h4 className="centeredH4">Select desired seats</h4>
            <h6>(select the seats you want by clicking the seats on the image below)</h6>
            {seats.map((row, rowIndex) => (
                <div className="seatSection" key={rowIndex}>
                    {row.map((isUnavailable, columnIndex) => (
                        <img
                            key={`${rowIndex}-${columnIndex}`}
                            className="seatLayoutImg"
                            id={`Seat${rowIndex * seats[0].length + columnIndex + 1}`}
                            src={Seat}
                            alt="Image of a seat"
                            onClick={(e) => handleAddingSeat(e, isUnavailable)}
                            style={{
                                backgroundColor: isUnavailable ? "red" : seatSelection.includes(`Seat${rowIndex * seats[0].length + columnIndex + 1}`) ? "grey" : "",
                            }}
                        />
                    ))}
                </div>
            ))}
        </>
    );
}

export default SeatTable;
