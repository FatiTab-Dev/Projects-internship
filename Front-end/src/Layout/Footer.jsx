// import { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';


// export const Footer = () => {
//     const [profile, setProfile] = useState(null);
//     const currentYear = new Date().getFullYear();
//     useEffect(() => {
//       fetch(`${process.env.REACT_APP_API_URL}/api/Profile`)
//       .then(res => res.json())
//       .then(data => {
//        const profileData = Array.isArray(data) ? data[0] : data;
//        setProfile(profileData);
//      })
//      .catch(err => console.error("Error fetching footer data:", err));
//     }, []);
//   return (
//     <footer className="footer py-5" style={{ backgroundColor: '#121212', color: '#fff' }}>
//       <div className="container">
//         <div className="row align-items-center">
//           <div className="col-12 col-sm-6 text-center text-sm-start mb-4 mb-sm-0">
//             <img src={logo} alt="Logo" style={{ width: '150px' }} />
//             <Link to="/Login" className="btn btn-black " style={{ color: '#765fa500' }}>TF</Link>
//           </div>
//           <div className="col-12 col-sm-6 text-center text-sm-end">
//             <div className="social-icon mb-3">
//               {profile?.socialLinks?.linkedin && (
//                 <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
//                   <img src={navIcon1} alt="LinkedIn" />
//                 </a>
//               )}
//               {profile?.socialLinks?.github && (
//                 <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">
//                    <img src={navIcon2} alt="GitHub" />
//                 </a>
//               )}
//              {profile?.socialLinks?.email && (
//                 <a href={profile.socialLinks.email} target="_blank" rel="noopener noreferrer">
//                   <img src={navIcon3} alt="email" />
//                 </a>
//               )}
//            </div>
             
//             <p className="small opacity-75">&copy;{currentYear}.All Rights Reserved by <strong> TABT { profile?.name || " Fatima "}</strong></p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }