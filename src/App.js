import React from "react";
import Cattery from "./components/cattery";
import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

let DUMMY_ARRAY = [
    {
        name: "CLIENT",
        id: 1
    }
];

const App = () => {
    const [parties, setParties] = useState(DUMMY_ARRAY);
    const [partiesList, setPartiesList] = useState(DUMMY_ARRAY);
    const ENDPOINT = "localhost:5000";
    const btnStyles = {
        position: "fixed",
        width: 100,
        height: 80,
        textAlign: "center",
        backgroundColor: "#ffb310",
        display: "flex",
        placeItems: "center",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        cursor: "pointer",
        zIndex: 100000
    };

    let addTestUser = () => {
        let num = partiesList.length + 1;
        let DUMMY_USER = {
            name: "Client",
            id: num
        };
        let newState = [...partiesList, DUMMY_USER];
        setParties(newState);
    };

    // socket = io(ENDPOINT);
    // socket.on("client_recieve", ({ server_data }) => {
    //     console.log(server_data);
    // });

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("client_send", { partiesList }, server_data => {
            console.log("Parties from Server: ");
            console.dir(server_data);
            setPartiesList(server_data);
        });
        // socket.on("client_recieve", ({ server_data }) => {
        //     console.log(server_data);
        //     // setParties(server_data);
        // });
        // socket.emit('join', { name });
        // console.log("Socket: " + socket);
        // console.dir(parties);

        return () => {
            socket.emit("disconnect");
        };
    }, [ENDPOINT, parties]);

    return (
        <div className="App">
            <div onClick={addTestUser} style={btnStyles}>
                Send Request
                <span>{partiesList.length}</span>
            </div>
            <Cattery parties={DUMMY_ARRAY} />
        </div>
    );
};

export default App;
