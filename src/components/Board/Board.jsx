import Card from "../TicketCard/TicketCard";
import "./Board.css";
import { AiOutlinePlus, AiOutlineCheckCircle } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
function Board({ tickets, header }) {
    return (
        <div className="board-container">
            <div className="board-header">
                <div>
                    <div className="flex-gap">
                        <p>{header}</p>
                    </div>
                </div>

                <div className="flex-gap">
                    <AiOutlinePlus className="bg-color-icon" />
                    <BiDotsHorizontalRounded className="bg-color-icon" />
                </div>
            </div>

            <div className="board-hero">
                {tickets.map((ticket) => {
                    return (
                        <Card
                            key={ticket.id}
                            id={ticket.id}
                            status={ticket.status}
                            title={ticket.title}
                            tag={ticket.tag[0]}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Board;
