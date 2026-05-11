import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router";

const AddBank = () => {
  const [bankName, setbankName] = useState();
  const [licenseNo, setlicenseNo] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/banks/add", {
        bankName,
        licenseNo,
      });
      console.log("data is", res.data);
      navigate("/dashboard/banklist");
    } catch (error) {
      console.log(error);
      alert("Invalid Fields");
    }
  };
  //   function isPalindrome(word) {
  //   for (let i = 0; i < word.length / 2; i++) {
  //     if (word[i] !== word[word.length - 1 - i]) {
  //       return "Not Palindrome";
  //     }
  //   }
  //   return "Palindrome";
  // }

  // // Test
  // console.log(isPalindrome("madam")); // Palindrome
  // console.log(isPalindrome("hello")); // Not Palindrome
  return (
    <div className="p-5">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl text-center font-bold">Add Bank</h1>
        <div className="w-full">
          <div className="">
            <h1 className="">Bank Name:</h1>
            <input
              type="text"
              placeholder="Enter Bank Name"
              className="w-full my-2 p-2 outline-0 bg-gray-100 rounded-md"
              onChange={(e) => setbankName(e.target.value)}
            />
          </div>
          <div>
            <h1>License No:</h1>
            <input
              type="text"
              placeholder="Enter License Number"
              className="w-full my-2 p-2 outline-0 bg-gray-100 rounded-md"
              onChange={(e) => setlicenseNo(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-400 py-1 px-3 rounded text-white cursor-pointer hover:bg-blue-500">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBank;
