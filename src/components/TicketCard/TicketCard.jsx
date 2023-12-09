import { AiOutlineDash } from "react-icons/ai";
import { BsFillRecordFill } from "react-icons/bs";
import "./TicketCard.css";

const TicketCard = ({ id, profileURL, status, title, tag }) => {
    return (
        <div className="card-container">
            <div className="ticket-card-header">
                <p className="header-id">{id}</p>
                {profileURL ? (
                    <div className="ticket-avatar-container">
                        <span
                            className={`ticket-avatar-badge ${
                                status === true ? "available" : ""
                            }`}
                        ></span>
                    </div>
                ) : null}
            </div>
            <div className="ticket-card-hero">
                <div className="ticket-card-title">
                    <p>{title}</p>
                </div>

                <div className="ticket-tag-container">
                    <div className="icon">
                        <AiOutlineDash className="bg-color-icon" />
                    </div>
                    <div className="ticket-card-tag">
                        <BsFillRecordFill className="bg-color-icon" />
                        <p className="tag-text">{tag}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;
