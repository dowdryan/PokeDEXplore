// import React, { useContext } from "react";
// import { Link, NavLink } from "react-router-dom";
// import UserContext from "../auth/UserContext";

// function Navigation({ logout }) {
//     const {currentUser} = useContext(UserContext)
//     console.debug("Navigation", "currentUser=", currentUser)

//     function loggedInNav() {
//         return (
//             <ul className="navbar-nav ml-auto">
//                 <li className="nav-item mr-4">
//                     <NavLink className="nav-link" to="/profile">
//                         Profile
//                     </NavLink>
//                 </li>
//                 <li className="nav-item mr-4">
//                     <Link className="nav-link" to="/" onClick={logout}>
//                         Logout {currentUser.first_name || currentUser.username}
//                     </Link>
//                 </li>
//             </ul>
//         )
//     }

//     function loggedOutNav() {
//         return (
//             <ul className="navbar-nav ml-auto">
//                 <li className="nav-item mr-4">
//                     <NavLink className="nav-link" to="/login">
//                         Login
//                     </NavLink>
//                 </li>
//                 <li className="nav-item mr-4">
//                     <NavLink className="nav-link" to="/signup">
//                         Sign Up
//                     </NavLink>
//                 </li>
//             </ul>
//         )
//     }

//     return (
//         <nav className="Navigation navbar navbar-expand-md">
//             {currentUser ? loggedInNav() : loggedOutNav}
//         </nav>
//     )

// }

// export default Navigation