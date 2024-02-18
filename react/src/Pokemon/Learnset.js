import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Capitalize, CapitalizeWordsRemoveHyphen } from '../Helpers/Helpers';
import axios from 'axios';


/**
 * Renders a pokemon's learnset (The moves a pokemon can learn upon leveling up)
 */
function Learnset({ pokemon }) {
    const { name } = useParams();
    const [levelUpMoves, setLevelUpMoves] = useState([]);
    const [pokemonData, setPokemonData] = useState(null);
    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
                setPokemonData(response.data);
                if (response.data.moves.length > 0) {
                    const levelUpMovesData = response.data.moves
                        .map(async (move) => {
                            const levelUpDetail = move.version_group_details.find((detail) => detail.move_learn_method.name === "level-up");
                            const TMDetail = move.version_group_details.find((detail) => detail.move_learn_method.name === "machine");
                            if ((levelUpDetail && TMDetail) || levelUpDetail) {
                                const moveUrl = move.move.url;
                                const moveResponse = await fetch(moveUrl);
                                const moveData = await moveResponse.json();
                                return { ...moveData, levelLearnedAt: levelUpDetail.level_learned_at };
                            }
                            return null;
                        });
                    const filteredMoves = (await Promise.all(levelUpMovesData)).filter(move => move !== null);
                    const sortedMoves = filteredMoves.sort((a, b) => a.levelLearnedAt - b.levelLearnedAt);
                    const finalMoves = sortedMoves.map(move => ({
                        ...move,
                        levelLearnedAt: move.levelLearnedAt === 0 ? "Evo." : move.levelLearnedAt
                    }));
                    setLevelUpMoves(finalMoves);
                }
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };
        fetchPokemonData();
    }, [name]);


    return (
        <div>
            {levelUpMoves.length > 0 && (
                <table className="Level-Up-Moves" style={{
                    backgroundColor: "gray",
                    border: "4px solid black",
                    borderRadius: "5px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "30px"
                }}>
                    <thead>
                        <tr>
                            <th colSpan="8" style={{color: "black", background:"#FFFFFF", border:"1px solid #D8D8D8"}}>
                                <big>Level-Up Moves</big>
                            </th>
                        </tr>
                        <tr>
                            <th style={{color: "black", background:"#FFFFFF", border:"1px solid #D8D8D8"}}>Level</th>
                            <th style={{color: "black", background:"#FFFFFF", border:"1px solid #D8D8D8"}}>Move</th>
                            <th style={{color: "black", background:"#FFFFFF", border:"1px solid #D8D8D8"}}>Type</th>
                            <th style={{color: "black", background:"#FFFFFF", border:"1px solid #D8D8D8"}}>Category</th>
                            <th style={{color: "black", background:"#FFFFFF", border:"1px solid #D8D8D8"}}>Power</th>
                            <th style={{color: "black", background:"#FFFFFF", border:"1px solid #D8D8D8"}}>Accuracy</th>
                            <th style={{color: "black", background:"#FFFFFF", border:"1px solid #D8D8D8"}}>PP</th>
                            <th style={{color: "black", background:"#FFFFFF", border:"1px solid #D8D8D8"}}>Move Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {levelUpMoves.map((moveDetails, index) => (
                            <tr key={index}>
                                {/* Level */}
                                <td style={{ textAlign: "center", background:"#FFFFFF", border:"1px solid #D8D8D8" }}>
                                    <span style={{ color: "black" }}>{moveDetails.levelLearnedAt}</span>
                                </td>
                                {/* Move */}
                                <td style={{background:"#FFFFFF", border:"1px solid #D8D8D8"}}>
                                    <span style={{ color: "black" }}>{CapitalizeWordsRemoveHyphen(moveDetails.name) || "—"}</span>
                                </td>

                                {/* Type */}
                                <td style={{
                                    textAlign: "center",
                                    background: (() => {
                                        switch (Capitalize(moveDetails.type?.name)) {
                                            case "Normal":
                                                return "#A8A77A"
                                            case "Grass":
                                                return "#7AC74C"
                                            case "Fire":
                                                return "#EE8130"
                                            case "Water":
                                                return "#6390F0"
                                            case "Electric":
                                                return "#F7D02C"
                                            case "Ice":
                                                return "#96D9D6"
                                            case "Fighting":
                                                return "#C22E28"
                                            case "Poison":
                                                return "#A33EA1"
                                            case "Ground":
                                                return "#E2BF65"
                                            case "Flying":
                                                return "#A98FF3"
                                            case "Psychic":
                                                return "#F95587"
                                            case "Bug":
                                                return "#A6B91A"
                                            case "Rock":
                                                return "#B6A136"
                                            case "Ghost":
                                                return "#735797"
                                            case "Dragon":
                                                return "#6F35FC"
                                            case "Dark":
                                                return "#705746"
                                            case "Steel":
                                                return "#B7B7CE"
                                            case "Fairy":
                                                return "#D685AD"
                                            default:
                                                return "#FFFFFF"
                                        }
                                    })(),
                                    border: (() => {
                                        switch (Capitalize(moveDetails.type?.name)) {
                                            case "Normal":
                                                return "#A8A77A"
                                            case "Grass":
                                                return "#7AC74C"
                                            case "Fire":
                                                return "#EE8130"
                                            case "Water":
                                                return "#6390F0"
                                            case "Electric":
                                                return "#F7D02C"
                                            case "Ice":
                                                return "#96D9D6"
                                            case "Fighting":
                                                return "#C22E28"
                                            case "Poison":
                                                return "#A33EA1"
                                            case "Ground":
                                                return "#E2BF65"
                                            case "Flying":
                                                return "#A98FF3"
                                            case "Psychic":
                                                return "#F95587"
                                            case "Bug":
                                                return "#A6B91A"
                                            case "Rock":
                                                return "#B6A136"
                                            case "Ghost":
                                                return "#735797"
                                            case "Dragon":
                                                return "#6F35FC"
                                            case "Dark":
                                                return "#705746"
                                            case "Steel":
                                                return "#B7B7CE"
                                            case "Fairy":
                                                return "#D685AD"
                                            default:
                                                return "#FFFFFF"
                                        }
                                    })()
                                }}>
                                    <span style={{ color: "White" }}>{Capitalize(moveDetails.type?.name) || "—"}</span>
                                </td>

                                {/* Category */}
                                <td style={{
                                    textAlign: "center",
                                    background: (() => {
                                        switch (Capitalize(moveDetails.damage_class?.name)) {
                                            case "Physical":
                                                return "#82150b";
                                            case "Status":
                                                return "#8C888C";
                                            case "Special":
                                                return "#4F5870";
                                            default:
                                                return "#FFFFFF";
                                        }
                                    })(),
                                    border: (() => {
                                        switch (Capitalize(moveDetails.damage_class?.name)) {
                                            case "Physical":
                                                return "#82150b";
                                            case "Status":
                                                return "#5b585b";
                                            case "Special":
                                                return "#333948";
                                            default:
                                                return "#D8D8D8";
                                        }
                                    })()
                                }}>
                                    <span style={{ color: "white" }}>{Capitalize(moveDetails.damage_class?.name) || "—"}</span>
                                </td>
                                {/* Power */}
                                <td style={{ textAlign: "center", background:"#FFFFFF", border:"1px solid #D8D8D8" }}>
                                    <span style={{ color: "black" }}>{moveDetails.power || "—"}</span>
                                </td>
                                {/* Accuracy */}
                                <td style={{ textAlign: "center", background:"#FFFFFF", border:"1px solid #D8D8D8" }}>
                                    <span style={{ color: "black" }}>{moveDetails.accuracy ? `${moveDetails.accuracy}%` : "—%"}</span>
                                </td>
                                {/* PP */}
                                <td style={{ textAlign: "center", background:"#FFFFFF", border:"1px solid #D8D8D8" }}>
                                    <span style={{ color: "black" }}>{moveDetails.pp || "—"}</span>
                                </td>
                                {/* Description */}
                                <td style={{ textAlign: "center", background:"#FFFFFF", border:"1px solid #D8D8D8" }}>
                                    <span style={{ color: "black" }}>
                                        {(() => {
                                            const flavorTextEntry = moveDetails.flavor_text_entries.find(entry => {
                                                return (
                                                    entry.language.name === "en" &&
                                                    (entry.version_group.name === "scarlet-violet" ||
                                                     entry.version_group.name === "sword-shield" ||
                                                     entry.version_group.name === "ultra-sun-ultra-moon")
                                                );
                                            });
                                        
                                            return flavorTextEntry ? flavorTextEntry.flavor_text : "—";
                                        })()}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Learnset;
