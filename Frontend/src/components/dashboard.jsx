// // // Dashboard.jsx
// // // Dashboard.jsx
// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './styles1.css';

// // import patient from 'C:/Users/HP/Downloads/TripleM-main-20240227T115539Z-001/TripleM-main/client/src/assets/patient.jpg';
// // import doctor from 'C:/Users/HP/Downloads/TripleM-main-20240227T115539Z-001/TripleM-main/client/src/assets/doctor.jfif';
// // import invoice from 'C:/Users/HP/Downloads/TripleM-main-20240227T115539Z-001/TripleM-main/client/src/assets/invoice.jpg';

// // const Dashboard = () => {
// //   const navigate = useNavigate();

// //   const handleIconClick = (path) => {
// //     // Use the navigate function to navigate to the corresponding page
// //     navigate(path);
// //   };

// //   return (
// //     <div className="dashboard-container" style={{ backgroundColor: 'skyblue' }}>
// //       <div className="top-icons">
// //         <div className="icon" onClick={() => handleIconClick('/outpatient')}>
// //           <img src={patient} alt="Patient Outpatient" />
// //           <p>Outpatient</p>
// //         </div>
// //         <div className="icon" onClick={() => handleIconClick('/inpatient')}>
// //           <img src={patient} alt="Patient Inpatient" />
// //           <p>Inpatient</p>
// //         </div>
// //         <div className="icon" onClick={() => handleIconClick('/doctor')}>
// //           <img src={doctor} alt="Doctor" />
// //           <p>Doctor</p>
// //         </div>
// //       </div>
// //       <div className="bottom-icons">
// //         <div className="icon" onClick={() => handleIconClick('/outpatient-bill')}>
// //           <img src={invoice} alt="Outpatient Bill" />
// //           <p>Outpatient Bill</p>
// //         </div>
// //         <div className="icon" onClick={() => handleIconClick('/inpatient-bill')}>
// //           <img src={invoice} alt="Inpatient Bill" />
// //           <p>Inpatient Bill</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './styles1.css';

// import patient from 'C:/Users/HP/Downloads/TripleM-main-20240227T115539Z-001/TripleM-main/client/src/assets/patient.jpg';
// import doctor from 'C:/Users/HP/Downloads/TripleM-main-20240227T115539Z-001/TripleM-main/client/src/assets/doctor.jfif';
// import invoice from 'C:/Users/HP/Downloads/TripleM-main-20240227T115539Z-001/TripleM-main/client/src/assets/invoice.jpg';



//   const Dashboard = () => {
//   const navigate = useNavigate();
  

//   const handleIconClick = (path) => {
//     // Use the navigate function to navigate to the corresponding page
//     navigate(path);
//   };

//   return (
//     <div>
//     <div className = "dashboard-container" >
//       <div className="top-icons">
//         <div className="icon" onClick={() => handleIconClick('/outpatient')}>
//           <img src={patient} alt="Patient Outpatient" />
//           <p>Outpatient</p>
//         </div>
//         <div className="icon" onClick={() => handleIconClick('/inpatient')}>
//           <img src={patient} alt="Patient Inpatient" />
//           <p>Inpatient</p>
//         </div>
//         <div className="icon" onClick={() => handleIconClick('/doctor')}>
//           <img src={doctor} alt="Doctor" />
//           <p>Doctor</p>
//         </div>
//       </div>
//       <div className="bottom-icons">
//         <div className="icon" onClick={() => handleIconClick('/outpatient-bill')}>
//           <img src={invoice} alt="Outpatient Bill" />
//           <p>Outpatient Bill</p>
//         </div>
//         <div className="icon" onClick={() => handleIconClick('/inpatient-bill')}>
//           <img src={invoice} alt="Inpatient Bill" />
//           <p>Inpatient Bill</p>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Dashboard;

// Dashboard.jsx

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './styles1.css';
// import './dashboardbody.css'

// import patient from 'C:/Users/HP/Downloads/TripleM-main-20240227T115539Z-001/TripleM-main/client/src/assets/patient.jpg';
// import doctor from 'C:/Users/HP/Downloads/TripleM-main-20240227T115539Z-001/TripleM-main/client/src/assets/doctor.jfif';
// import invoice from 'C:/Users/HP/Downloads/TripleM-main-20240227T115539Z-001/TripleM-main/client/src/assets/invoice.jpg';

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const handleIconClick = (path) => {
//     // Use the navigate function to navigate to the corresponding page
//     navigate(path);
//   };

  
//   return (
//     <div >
//       <div className="dashboard-container">
//         <div className="top-icons">
//           <Link to="/outpatient">
//             <div className="icon" onClick={() => handleIconClick('/outpatient')}>
//               <img src={patient} alt="Patient Outpatient" />
//               <p>Outpatient</p>
//             </div>
//           </Link>
//           <Link to="/inpatient">
//             <div className="icon" onClick={() => handleIconClick('/inpatient')}>
//               <img src={patient} alt="Patient Inpatient" />
//               <p>Inpatient</p>
//             </div>
//           </Link>
//           <Link to="/doctor">
//             <div className="icon" onClick={() => handleIconClick('/doctor')}>
//               <img src={doctor} alt="Doctor" />
//               <p>Doctor</p>
//             </div>
//           </Link>
//         </div>
//         <div className="bottom-icons">
//           <Link to="/outpatient-bill">
//             <div className="icon" onClick={() => handleIconClick('/outpatient-bill')}>
//               <img src={invoice} alt="Outpatient Bill" />
//               <p>Outpatient Bill</p>
//             </div>
//           </Link>
//           <Link to="/inpatient-bill">
//             <div className="icon" onClick={() => handleIconClick('/inpatient-bill')}>
//               <img src={invoice} alt="Inpatient Bill" />
//               <p>Inpatient Bill</p>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import patient from 'C:/Users/Kaaviya/Desktop/React/Hospital/Frontend/src/assets/patient.jpg';
import admin from 'C:/Users/Kaaviya/Desktop/React/Hospital/Frontend/src/assets/admin.jpg';
import doctor from 'C:/Users/Kaaviya/Desktop/React/Hospital/Frontend/src/assets/doctor.jfif';
//import invoice from 'C:/Users/Kaaviya/Desktop/React/Hospital/Frontend/src/assets/invoice.jpg';
import hospitalLogo from 'C:/Users/Kaaviya/Desktop/React/Hospital/Frontend/src/assets/Hospital_name.jpg';
import backgroundImg from 'C:/Users/Kaaviya/Desktop/React/Hospital/Frontend/src/assets/background.jpg'; 

const Dashboard = () => {
  const navigate = useNavigate();

  const handleIconClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-cover bg-center flex items-center justify-center h-screen" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="login-container bg-white p-6 rounded shadow-md">
      <img src={hospitalLogo} className="logo mb-1" alt="Hospital Logo" />
      <h1 className="text-center font-bold text-4xl text-gray-500 mb-14">LOGIN AS</h1>
      <div className="flex">
        <Link to="/patient" className="mx-10">
          <div className="icon" onClick={() => handleIconClick('/patient')}>
            <img src={patient} className="w-32 h-32 mx-5" />
            <p className="text-center font-semibold text-lg text-gray-800">PATIENT</p>
          </div>
        </Link>
        <Link to="/login" className="mx-10">
          <div className="icon" onClick={() => handleIconClick('/login')}>
            <img src={admin} className="w-37 h-32 mx-5" />
            <p className="text-center font-semibold text-lg text-gray-800">ADMIN</p>
          </div>
        </Link>
        <Link to="/doctor" className="mx-10">
          <div className="icon" onClick={() => handleIconClick('/doctor')}>
            <img src={doctor} alt="Doctor" className="w-37 h-32 mx-15" />
            <p className="text-center font-semibold text-lg text-gray-800">DOCTOR</p>
          </div>
        </Link>
      </div>

    </div>
  </div>
  );
};

export default Dashboard;



      {/*
      <div className="flex justify-center space-x-8 mt-8">
        <Link to="/outpatient-bill">
          <div className="icon" onClick={() => handleIconClick('/outpatient-bill')}>
            <img src={invoice} alt="Outpatient Bill" className="w-20 h-20" />
            <p className="text-center">Outpatient Bill</p>
          </div>
        </Link>
        <Link to="/inpatient-bill">
          <div className="icon" onClick={() => handleIconClick('/admin')}>
            <img src={invoice} alt="Inpatient Bill" className="w-20 h-20" />
            <p className="text-center">Inpatient Bill</p>
          </div>
        </Link>
  </div> */}
