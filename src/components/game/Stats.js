import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import'../styles/Stats.css';

function Stats(props) {            

    return(
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div className="player-stats">
                <h4>{props.charactersData.name}</h4>
                <p>Xerites: {props.charactersData.xerites}</p>
                <p>XP: {props.charactersData.xp}</p>
            </div>
            <div className="stats-display">
                <div className="monster-stats">
                    <h4>Monster: </h4>            
                    <p>Species: {props.charactersData.monster.name}</p>    
                    <p>Info: {props.charactersData.monster.description}</p>
                    <p>XP Gained When Beaten: {props.charactersData.monster.xpGained}</p>
                    <p>XP: {props.charactersData.monster.xp}</p>
                    <p>Win Xerites: {props.charactersData.monster.xeritesGained}</p>
                    <p>Lose Xerites: {props.charactersData.monster.xeritesLost}</p>
                </div>
                <p>Battle Arena:
                    <p>Results: {props.battleRes.message}</p>
                </p>
            </div>
            <OverlayTrigger
				placement='top'
				overlay={
					<Tooltip id='tooltip-teleport'>
						Every time you click "A" to attack the monster in the room, we "roll the dice", and based on your XP and the monsters XP we see if you win or lose! If the dice say so, you win the dun! Otherwise... you lose dun! 
					</Tooltip>
				}
			>
				<p>How do battles fail?</p>
			</OverlayTrigger>
        </div>
    )
}

export default Stats;