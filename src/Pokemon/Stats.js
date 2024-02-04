import React from "react";
import FetchPokemonData from "../Data/fetchPokemonData";
import "./Stats.css"

const Stats = ({ pokemon }) => {
  const pokemonData = FetchPokemonData(pokemon);

  const calculateTotalStats = () => {
    if (!pokemonData) {
      return 0;
    }
    return pokemonData.stats.reduce((total, stat) => {
      return total + stat.base_stat;
    }, 0);
  };

  const renderStatMeter = (statName, baseStat) => {
    return (
      // <div key={statName} style={{
      //     display: "flex",
      //     alignItems: "center",
      //     marginBottom: "10px", 
      // }}>
      //   <tr style={{background:"9DB7F5"}}>
      //     <td>
      //       <div style={{
      //         textAlign: "center", 
      //         marginRight: "10px", 
      //         width: "120px"}}>{statName}: {baseStat}
      //       </div>
      //     </td>
      //     <td style={{width: "255px"}}>
      //       {/* <meter value={baseStat} min="0" max="255" style={{
      //         width: "500px",
      //         background: "red",
      //         webkitAppearence: "none",
      //       }}>
      //         {baseStat} out of 255
      //       </meter> */}
      //       <div class="statbar" style={{
      //         backgroundColor: "#6890F0", 
      //         border: "1px solid #445E9C", 
      //         width: `calc(300% * ${baseStat}/255)`, 
      //         height: "20px"}}></div>
      //     </td>
      //   </tr>
      // </div>
      // <div>
      <tr>
        <th>
          <div style={{float:"left"}}><span style={{color:"#000"}}>{statName}</span>:</div>
          <div style={{float:"right"}}>{baseStat}</div>
        </th>
        <td style={{width:"255px", background: "#FF5959", border: "2px solid rgba(0, 0, 0, 0.2)"}}><div class="statbar" style={{
          backgroundColor: "#FF0000", 
          border: "1px solid #A60000", 
          // borderRadius: "10px",
          borderTopRightRadius: "5px",
          borderBottomRightRadius: "5px",
          width: `calc(100% * ${baseStat}/255)`, 
          height:"20px"}}></div>
        </td>
        <td style={{border: "2px solid black", textAlign: "center"}}>
          <small>873-998</small>
        </td>
        <td style={{border: "2px solid black", textAlign: "center"}}>
          <small>873-998</small>
        </td>
      </tr>
    );
  };
{/* <div class="statbar" style={{"background-color: #6890F0; border: 1px solid #445E9C; width: calc(100% * 109/255); height:20px"}}></div> */}
  return (
    <div
      className="Pokemon-Stats"
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "flex-start",
        marginLeft: "20px",}}
    >
      {pokemonData && (
        // <div>
          <table style={{
            background: "#FFFFFF",
            border: "4px solid black",
            borderRadius: "10px",
            color: "black",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "20px",
            padding: "5px 5px 5px 5px",
          }}>
            <tbody>
              <tr>
                <th colSpan={2} rowSpan={2} style={{
                  background: "#999999",
                  borderTopRightRadius: "10px",
                  MozBorderRadiusTopright: "10px",
                  WebkitBorderTopRightRadius: "10px",
                  KhtmlBorderTopRightRadius: "10px",
                  IcabBorderTopRightRadius: "10px",
                  OBorderTopRightRadius: "10px",
                }}>Stats</th>
                <th colSpan={2} style={{background: "#F5AC78", border: "2px solid black"}}>Range</th>
              </tr>
              <tr>
                <th style={{background: "#F5AC78", border: "2px solid black"}}><small>At Lv. 50</small></th>
                <th style={{background: "#F5AC78", border: "2px solid black"}}><small>At Lv. 100</small></th>
              </tr>
              {renderStatMeter(
                "HP",
                pokemonData.stats.find((stat) => stat.stat.name === "hp").base_stat
              )}
              {renderStatMeter(
                "Attack",
                pokemonData.stats.find((stat) => stat.stat.name === "attack").base_stat
              )}

              {renderStatMeter(
                "Defense",
                pokemonData.stats.find((stat) => stat.stat.name === "defense").base_stat
              )}
              {renderStatMeter(
                "Sp. Attack",
                pokemonData.stats.find((stat) => stat.stat.name === "special-attack").base_stat
              )}
              {renderStatMeter(
                "Sp. Defense",
                pokemonData.stats.find((stat) => stat.stat.name === "special-defense").base_stat
              )}
              {renderStatMeter(
                "Speed",
                pokemonData.stats.find((stat) => stat.stat.name === "speed").base_stat
              )}
              <tr style={{background: "gray"}}>
                <th>
                  <div style={{float:"left"}}><span style={{color:"#000"}}>Total</span>:</div>
                  <div style={{float:"right"}}>{calculateTotalStats()}</div>
                </th>
                {/* <td style={{
                  backgroundColor: "#FF0000", 
                  border: "1px solid #A60000", 
                  width: `calc(100% * ${calculateTotalStats()}/)`}}></td> */}
              </tr>
            </tbody>
          </table>
        // </div>
      )}
    </div>
  );
};

export default Stats;
