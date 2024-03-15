import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

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

const CustomCopyCell = ({ value }) => {
   const [isCopied, setIsCopied] = useState(false);

   const copyToClipboard = () => {
      navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 500); // Reset copied state after 2 seconds
   };

   return (
      <div style={{ display: "flex", alignItems: "center" }}>
         <span>{value}</span>
         <span className="text-xl" style={{ marginLeft: 5, cursor: "pointer" }} onClick={copyToClipboard} title="Copy to Clipboard">
            <FontAwesomeIcon icon={faCopy} style={{ marginLeft: 5, cursor: "pointer" }} onClick={copyToClipboard} title="Copy to Clipboard" />
            {/* &#x2398;  */}
         </span>
         {isCopied && <span style={{ marginLeft: 5, color: "green" }}>Copied!</span>}
      </div>
   );
};

export default function Dashboard() {
   const [data, setData] = useState<clientList[]>([]);

   useEffect(() => {
      const getData = async () => {
         const response = await axios.get<{ message: string; data: clientList[] }>("http://localhost:3000/client/getall");
         setData(response.data.data);
      };
      getData();
   }, []);

   const columns = [
      {
         name: "Name",
         selector: (row) => row.companyName,
      },
      {
         name: "Phone",
         selector: (row) => row.phoneNumber,
      },
      {
         name: "Email",
         selector: (row) => row.email,
         cell: (row) => <CustomCopyCell value={row.email} />,
      },
      {
         name: "Address",
         selector: (row) => row.address,
      },
      {
         name: "GST",
         selector: (row) => row.gstNo,
      },
      {
         name: "PAN",
         selector: (row) => row.panNo,
      },
      {
         name: "TAN",
         selector: (row) => row.tanNo,
      },
   ];

   // component to display client credentials list
   return (
      <div className="flex justify-center">
         <div className="mt-10 w-5/6">
            <DataTable className="flex justify-center w-auto" columns={columns} data={data} selectableRows theme="dark" />;
         </div>
      </div>
   );
}
