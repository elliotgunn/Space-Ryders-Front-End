import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import xerites from "../../assets/xerites.svg";

function Room({ room }) {
  return (
    <>
      {room ? (
        <img
          src={xerites}
          alt="xerites"
          style={{
            height: "40px",
            width: "40px",
            display: "inline-flex",
            margin: "5px",
            userSelect: "none"
          }}
        />
      ) : (
        <div
          style={{
            height: "40px",
            width: "40px",
            display: "inline-flex",
            margin: "5px"
          }}
        />
      )}
    </>
  );
}

function Row({ row, x_coor}) {

  const x = x_coor

  return (
    <div style={{ display: "flex" }}>
      {row
        .slice(x, x + 11)
        .map((room, index) => {
          return <Room key={index} room={room} />;
        })}
    </div>
  );
}

function Map({ currentRoom }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("https://space-ryders-be.herokuapp.com/api/adv/matrix")
      .then(res => {
        // and 5 0's to the beginning of each row then, 
        // Hack function that's just adding 5 rows at the top of 0
        let matrix = res.data.matrix;

        // Add 5 0's to the beginning of each row
        for(let y = 0; y < matrix.length; y++){
          for(let x = 0; x < 5; x++){
            matrix[y].unshift(0)
          }
        }

        // Add 5 rows to the top
        for(let y = 0; y < 5; y++){
          matrix.unshift([])
          for(let x = 0; x < 55; x++){
            matrix[0].push(0)
          }
        }

        setRooms(res.data.matrix);
      })
      .catch(err => {
        return err
      });
  }, []);

  const y_coor = currentRoom.y_coor

  return (
    <div
      style={{
        background: "#9F8303",
        display: "flex",
        flexDirection: "column",
        width: '550px',
        height: '550px',
        borderRadius: "5px 0 0 5px",
        backgroundImage:
            "url(https://media.discordapp.net/attachments/683139552172703749/684195993641680910/Nebula_Blue.png)",
        backgroundSize: "contain",
      }}
    >
      {rooms.slice(y_coor, (y_coor + 11)).map((row, index) => {
        return <Row row={row} key={index} x_coor={currentRoom.x_coor} />;
      })}
    </div>
  );
}

export default Map;
