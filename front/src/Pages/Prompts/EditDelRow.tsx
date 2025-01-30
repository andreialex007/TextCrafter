import React from 'react';

export default ({ edit, del }: { edit: () => void; del: () => void }) => {
 return (
  <>
   <span
    onClick={() => edit()}
    className="basic-btn flex gap-1 bg-blue-700 px-3 text-white"
   >
    <i className="ri-edit-fill"></i> edit
   </span>
   <span
    onClick={() => del()}
    className="basic-btn flex-gap-1 bg-red-700 px-3 text-white"
   >
    <i className="ri-delete-bin-fill"></i>
    del
   </span>
  </>
 );
};
