import React from "react";
import { TablePagination } from "../../components";
import "./Data-list-table.scss"

export default function DataListTable({
   data,
   headers,
   attributes,
   onChange,
   pagination = null,
}) {
   return (
      <div className="tabla-users">
         <table>
            <thead>
               <tr colSpan={headers.length}>
               
               </tr>
               <tr>
                  {headers.map((th, index) => (<th key={index}>{th}</th>))}
               </tr>
            </thead>

            <tbody>
            {data.map((d) => (
              <tr scope="row" data-data-id={d.id} onClick={onChange} key={d.id}>
                {attributes.map((attr, index) => (
                  <td data-label={headers[index]} key={index}>
                    {d[attr] ? d[attr] : "No definido"}
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>

            {pagination && (
               <tfoot>
                  <tr>
                     <td colSpan={headers.length}>
                        <TablePagination
                           page={pagination.page}
                           totalPages={pagination.totalPages}
                           count={pagination.count}
                           limit={data.length}
                           onChange={onChange}
                        />
                     </td>
                  </tr>
               </tfoot>
            )}
         </table>
      </div>
   );
}