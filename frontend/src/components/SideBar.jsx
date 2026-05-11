import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { ChevronDown } from "lucide-react";
const sideBarItems = [
  { name: "Dashboard", path: "/dashboard/home" },
  {
    name: "Customers",
    children: [
      { name: "Add Customer", path: "/dashboard/addcustomer" },
      { name: "Customers List", path: "/dashboard/customerlist" },
    ],
  },
  {
    name: "Banks",
    children: [
      { name: "Add Bank", path: "/dashboard/addbank" },
      { name: "Banks List", path: "/dashboard/banklist" },
    ],
  },
  {
    name: "Branches",
    children: [
      { name: "Add Branch", path: "/dashboard/addbranch" },
      { name: "Branch List", path: "/dashboard/branchlist" },
    ],
  },
  {
    name: "Loans",
    children: [
      { name: "Add Loan", path: "/dashboard/addloan" },
      { name: "Loans List", path: "/dashboard/loanlist" },
    ],
  },
  {
    name: "Loan Products",
    children: [
      { name: "Add Product", path: "/dashboard/addproduct" },
      { name: "Products List", path: "/dashboard/productlist" },
    ],
  },
  {
    name: "Loan Applications",
    children: [
      { name: "Add Loan Application", path: "/dashboard/addloanapplication" },
      { name: "Applications List", path: "/dashboard/loanapplicationlist" },
    ],
  },
  {
    name: "Installments",
    children: [
      { name: "Add Installments", path: "/dashboard/addinstallment" },
      { name: "Installments List", path: "/dashboard/installmentlist" },
    ],
  },
  {
    name: "Payments",
    children: [
      { name: "Create Payment", path: "/dashboard/addpayment" },
      { name: "Payment List", path: "/dashboard/paymentlist" },
    ],
  },
  {
    name: "Penalties",
    children: [
      { name: "Add Penalty", path: "/dashboard/addpenalty" },
      { name: "Penalties List", path: "/dashboard/penaltieslist" },
    ],
  },
  {
    name: "Ledger",
    children: [
      { name: "Add Ledger", path: "/dashboard/addledger" },
      { name: "Ledger List", path: "/dashboard/ledgerlist" },
    ],
  },
  {
    name: "Roles",
    children: [
      { name: "Add Role", path: "/dashboard/addrole" },
      { name: "Role List", path: "/dashboard/rolelist" },
    ],
  },
  {
    name: "Users",
    children: [
      { name: "Add New User", path: "/dashboard/adduser" },
      { name: "Users List", path: "/dashboard/userslist" },
    ],
  },
];
const SideBar = () => {
  //   const [isopen, setIsopen] = useState(false);
  //   const handleToggle = () => {
  //     setIsopen(!isopen);
  //   };
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };
  return (
    <div className=" max-w-80 w-full bg-gray-500  text-white overflow-y-auto">
      <h1 className="text-center text-2xl font-bold">Loan Managment System</h1>
      <div className="side-bar ">
        {/* <ul className="">
          {sideBarItems.map((item, index) => (
            <li
              key={index}
              className=" py-2 pl-4 hover:bg-gray-500 cursor-pointer "
            >
              <NavLink to={item.path}>{item.name}</NavLink>
            </li>
          ))}
        </ul> */}
        <ul className="mt-4 space-y-1 px-2">
          {sideBarItems.map((item, index) => (
            <li key={index}>
              {!item.children ? (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg hover:bg-white/50 ${
                      isActive ? "bg-white/50" : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ) : (
                <>
                  <div
                    onClick={() => toggleMenu(index)}
                    className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-white/50 rounded-lg"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openMenu === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openMenu === index ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    {item.children.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `block pl-8 mt-1 py-2 text-sm rounded-lg hover:bg-white/50 ${
                            isActive ? "bg-white/50" : ""
                          }`
                        }
                      >
                        {subItem.name}
                      </NavLink>
                    ))}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* <ul className="hover:bg-gray-500 mt-4">
          <li onClick={handleToggle} className=" cursor-pointer py-2 pl-4">
            Banks
          </li>
          <div className={`menu-links ${isopen ? "hidden" : "block"} pl-5`}>
            <li>
              <NavLink to="#">Add Bank</NavLink>
            </li>
            <li>
              <NavLink to="#">Banks List</NavLink>
            </li>
            <li>
              <NavLink to="#">Single Bank</NavLink>
            </li>
            <li>
              <NavLink to="#">Update Bank</NavLink>
            </li>
            <li>
              <NavLink to="#">Delete Bank</NavLink>
            </li>
          </div>
        </ul> */}
      </div>
    </div>
  );
};

export default SideBar;
