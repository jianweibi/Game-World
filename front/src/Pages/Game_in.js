import React, { useState, useEffect } from "react";
import "../css/style.css"
import Games_Signin from "../components/Game_Signin";
import PaginationComponent from "../components/Pagination";


function Game_in() {
    let [games, setGames] = useState([]);
    let [page, setPage] = useState(0);
    let [total, setTotal] = useState(0);

    useEffect(() => {
        const getGames = async () => {
          try {
            const resRaw = await fetch("/games", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ page: page }),
            });
            const res = await resRaw.json();
            setGames(res.games);
            setTotal(res.total);
          } catch (error) {
            console.error(error);
          }
        };
        getGames();
      }, [page]);

    console.log("Render Homepage...");
    return (
        <div className="App">
            <Games_Signin  game={games}/>
            <br />
            <div className="Pagination">
                <PaginationComponent
                    total={total}
                    page={page}
                    onChangePage={setPage}
                ></PaginationComponent>
            </div>
        </div>
    );
}

export default Game_in;