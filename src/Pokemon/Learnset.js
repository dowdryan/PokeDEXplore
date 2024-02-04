import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Helpers from '../Helpers/Helpers';
import axios from 'axios';

function Learnset({ pokemon }) {
    const { name } = useParams();
    const [levelUpMoves, setLevelUpMoves] = useState([]);
    const [pokemonData, setPokemonData] = useState(null);
    const [latestVersionGroup, setLatestVersionGroup] = useState(null);
    const { Capitalize, CapitalizeWordsRemoveHyphen } = Helpers;

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
                setPokemonData(response.data);
                if (response.data.moves.length > 0) {
                    const levelUpMovesData = response.data.moves
                        .map(async (move) => {
                            const levelUpDetail = move.version_group_details.find((detail) => detail.move_learn_method.name === "level-up");
                            const machineDetail = move.version_group_details.find((detail) => detail.move_learn_method.name === "machine");
                            
                            if ((levelUpDetail && machineDetail) || levelUpDetail) {
                                const moveUrl = move.move.url;
                                const moveResponse = await fetch(moveUrl);
                                const moveData = await moveResponse.json();
                                return { ...moveData, levelLearnedAt: levelUpDetail.level_learned_at };
                            }
                            return null;
                        });

                    // Filter out moves that are null (not learned through both level-up and machine)
                    const filteredMoves = (await Promise.all(levelUpMovesData)).filter(move => move !== null);

                    // Sort moves based on level
                    const sortedMoves = filteredMoves.sort((a, b) => a.levelLearnedAt - b.levelLearnedAt);

                    // Replace level 0 with "Evo."
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
                    border: "4px solid white",
                    borderRadius: "2%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "20px"
                }}>
                    <thead>
                        <tr>
                            <th colSpan="7">
                                <big>Level-Up Moves</big>
                            </th>
                        </tr>
                        <tr>
                            <th>Level</th>
                            <th>Move</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Power</th>
                            <th>Accuracy</th>
                            <th>PP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {levelUpMoves.map((moveDetails, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: "center" }}>
                                    <span style={{ color: "white" }}>{moveDetails.levelLearnedAt}</span>
                                </td>
                                <td>
                                    <span style={{ color: "white" }}>{CapitalizeWordsRemoveHyphen(moveDetails.name) || "—"}</span>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <span style={{ color: "white" }}>{Capitalize(moveDetails.type?.name) || "—"}</span>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <span style={{ color: "white" }}>{Capitalize(moveDetails.damage_class?.name) || "—"}</span>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <span style={{ color: "white" }}>{moveDetails.power || "—"}</span>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <span style={{ color: "white" }}>{moveDetails.accuracy ? `${moveDetails.accuracy}%` : "—%"}</span>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <span style={{ color: "white" }}>{moveDetails.pp || "—"}</span>
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
