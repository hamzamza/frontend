import { useLocation } from "react-router-dom";


const Footer = () => {
  return (
    <div className="">
      <div className="grid grid-cols-3 lg:flex justify-around text-white bg-blue-500 font-mono py-6">
        <ul className="flex flex-col  gap-3 p-3  ">
          <li className="fListItem">Countries</li>
          <li className="fListItem">Regions</li>
          <li className="fListItem">Cities</li>
          <li className="fListItem">Districts</li>
          <li className="fListItem">Airports</li>
          <li className="fListItem">Hotels</li>
        </ul>
        <ul className="flex flex-col  gap-3 p-3 w-fit ">
          <li className="fListItem">Homes </li>
          <li className="fListItem">Apartments </li>
          <li className="fListItem">Resorts </li>
          <li className="fListItem">Villas</li>
          <li className="fListItem">Hostels</li>
          <li className="fListItem">Guest houses</li>
        </ul>
        <ul className="flex flex-col    gap-3 p-3 w-fit ">
          <li className="fListItem">Unique places to stay </li>
          <li className="fListItem">Reviews</li>
          <li className="fListItem">Unpacked: Travel articles </li>
          <li className="fListItem">Travel communities </li>
          <li className="fListItem">Seasonal and holiday deals </li>
        </ul>
        
      
      </div>
      <div className="text-center bg-blue-500 ">Copyright © 2022 hamza douaij <span className="text-blue-900">MERN</span> stackweb Developer.</div>
    </div>
  );
};

export default Footer;
