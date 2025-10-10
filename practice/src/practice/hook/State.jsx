import { useState } from "react";

function State() {
    const [fruit, setfruit] = useState("Apple 🍎");
    const [count, setcount] = useState(0);

    return (
        <div>
            <h1>{fruit}</h1>

            <h1>{count}</h1>
            <button 
            onClick={() => setfruit("Banana 🍌")}>
            Change Fruit
            </button>

            <button 
            onClick={() => setcount(count + 1)}>
            Increment Count
            </button>
            <button 
            onClick={() => setcount(count - 1)}>
            Decrement Count</button>

        </div>
    );
}

export default State;