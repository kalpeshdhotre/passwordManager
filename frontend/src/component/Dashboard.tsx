import React, { useEffect, useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

interface clientList {
   phoneNumber: string;
   email: string;
   clientName: string;
   companyName: string;
   address: string;
   panNo: string;
   gstNo: string;
}

export default function Dashboard() {
   const [data, setData] = useState<clientList[]>([]);

   useEffect(() => {
      const getData = async () => {
         const response = await axios.get<{ message: string; data: clientList[] }>("http://localhost:3000/client/getall");
         setData(response.data.data);
      };
      getData();
   }, []);

   return (
      <div className="mt-10 flex flex-col h-max items-center justify-center">
         <table className="border border-black">
            <thead className="border border-black">
               <tr>
                  <th className="w-36 text-left border border-black pl-1">Client Name</th>
                  <th className="w-36 text-left border border-black pl-1">Entiry</th>
                  <th className="w-36 text-left border border-black pl-1">Contact Person</th>
                  <th className="w-36 text-left border border-black pl-1">Mobile</th>
                  <th className="w-36 text-left border border-black pl-1">Login Of</th>
                  <th className="w-36 text-left border border-black pl-1">Username</th>
                  <th className="w-6 text-left border border-black pl-1"></th>
                  <th className="w-36 text-left border border-black pl-1">Password</th>
               </tr>
            </thead>
            <tbody>
               {data.map((item, index) => (
                  <tr key={index}>
                     <td className="w-36 text-left border border-black pl-1">{item.clientName}</td>
                     <td className="w-36 text-left border border-black pl-1">{item.clientName}</td>
                     <td className="w-36 text-left border border-black pl-1">{item.companyName}</td>
                     <td className="w-36 text-left border border-black pl-1">{item.phoneNumber}</td>
                     <td className="w-36 text-left border border-black pl-1">PAN</td>
                     <td className="w-36 text-left border-t border-l border-b border-black pl-1">{item.email}</td>
                     <td className="w-6 text-left border-b border-black p-2">
                        <FontAwesomeIcon icon={faCopy} />
                     </td>
                     <td className="w-36 text-left border-t border-l border-b border-black border-black pl-1">{item.gstNo}</td>
                     <td className="w-6 text-left border-b border-black p-2">
                        <FontAwesomeIcon className="hover:text-cyan-400" onClick={() => navigator.clipboard.writeText(item.gstNo)} icon={faCopy} />
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
