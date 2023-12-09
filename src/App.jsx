import { useState } from "react";
import Board from "./components/Board/Board";
import { GroupingList, OrderingList} from "./data/data";
import { rawData } from "./data/data";
import "./App.css";

import { useEffect } from "react";
import { ordering, groups } from "./constants/constants";
import { setLocalStorageItem } from "./helpers/localStorage";

function groupTicketsByProperty(property, state) {
    const groupedTickets = {};

    state.forEach((ticket) => {
        const value = ticket[property];
        if (!groupedTickets[value]) {
            groupedTickets[value] = [];
        }
        groupedTickets[value].push(ticket);
    });

    return groupedTickets;
}

function App() {
    const [tickets, setTickets] = useState();
    const [users, setUsers] = useState();
    const [selectedGrouping, setSelectedGrouping] = useState(() => {
        
        return groups.STATUS;
    });
    const [selectedOrdering, setSelectedOrdering] = useState(() => {
        
        return ordering.PRIORITY;
    });
    const [displayState, setDisplayState] = useState(() => {
        
        return [];
    });
    const [showFilterContainer, setShowFilterContainer] = useState(false);
    function getNameById(id) {
        const foundUser = users.find((u) => u.id === id);
        return foundUser ? foundUser.name : "User not found";
    }

    useEffect(() => {
        const loadKanbanData = async () => {
            try {
                const results = rawData;
                setTickets(results.tickets);
                setUsers(results.users);
            } catch (error) {
                console.error(error);
            }
        };
        loadKanbanData();
    }, []);

    useEffect(() => {
        if (tickets === undefined) return;
        if (displayState.length === 0) {
            const ticketsGroupedByStatus = groupTicketsByProperty(
                "status",
                tickets
            );
            setDisplayState(ticketsGroupedByStatus);
            setLocalStorageItem("currentstate", ticketsGroupedByStatus);
        }
    }, [tickets]);

    const groupHandler = (e) => {
        setShowFilterContainer(false);
        setSelectedGrouping(e.target.value);
        setLocalStorageItem("selectedgrouping", e.target.value);
        
        const ticketsGroupedByStatus = groupTicketsByProperty(
            "status",
            tickets
        );
        setDisplayState(ticketsGroupedByStatus);
        setLocalStorageItem("currentstate", ticketsGroupedByStatus);
    
    };
    const orderHandler = (e) => {
        setShowFilterContainer(false);
        setSelectedOrdering(e.target.value);
        setLocalStorageItem("selectedordering", e.target.value);
        
        const sortTasksByPriority = (tasks) => {
            return tasks.slice().sort((a, b) => b.priority - a.priority);
        };

        const sortedData = {};

        for (const userName in displayState) {
            const userTasks = displayState[userName];
            const sortedTasks = sortTasksByPriority(userTasks);
            sortedData[userName] = sortedTasks;
        }

        setDisplayState(sortedData);
        setLocalStorageItem("currentstate", sortedData);
    
    };

    return (
        <article>
            <header>
                <div className="select-container">
                    <div
                        className="display-button border-curve pointer"
                        onClick={() => {
                            setShowFilterContainer((prev) => !prev);
                        }}
                    >
                        <p>Display</p>
                    </div>
                    {showFilterContainer ? (
                        <div className="select-popup border-curve">
                            <div className="flex-container">
                                <p>Grouping</p>
                                <select
                                    className="select-element"
                                    name="group-select"
                                    onChange={(e) => groupHandler(e)}
                                    value={selectedGrouping}
                                >
                                    {GroupingList.map((item) => (
                                        <option
                                            value={item}
                                            label={item}
                                            key={item}
                                        />
                                    ))}
                                </select>
                            </div>

                            <div className="flex-container">
                                <p>Ordering</p>
                                <select
                                    className="select-element"
                                    name="order-select"
                                    onChange={(e) => orderHandler(e)}
                                    value={selectedOrdering}
                                >
                                    {OrderingList.map((item) => (
                                        <option
                                            value={item}
                                            label={item}
                                            key={item}
                                        />
                                    ))}
                                </select>
                            </div>
                        </div>
                    ) : null}
                </div>
            </header>
            <main className="main-container">
                <div className="board-grid-container">
                    <div className="board-grid-inner">
                        {Object.keys(displayState).map((data) => {
                            return (
                                <Board
                                    header={data}
                                    tickets={displayState[data]}
                                    key={data}
                                />
                            );
                        })}
                    </div>
                </div>
            </main>
        </article>
    );
}

export default App;
