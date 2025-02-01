import React from 'react';

export default ({
 okFun,
 cancelFun,
 cancelText,
 okText,
}: {
 okFun: () => void;
 cancelFun: () => void;
 cancelText?: string;
 okText?: string;
}) => {
 return (
  <div className="flex justify-end gap-2  p-4">
   <button
    className="basic-btn bg-green-500 px-4 py-2 text-white"
    onClick={() => {
     okFun();
    }}
   >
    <i className="ri-checkbox-circle-fill"></i>
    {okText ?? 'Save'}
   </button>
   <button
    className="basic-btn bg-red-500 px-4 py-2 text-white"
    onClick={() => cancelFun()}
   >
    <i className="ri-close-circle-fill"></i>
    {cancelText ?? 'Cancel'}
   </button>
  </div>
 );
};
