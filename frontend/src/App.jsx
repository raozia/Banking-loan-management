import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import GuestRoute from "./components/guestRoute";
import Dashboard from "./components/layout/Dashboard";
import AddCustomer from "./components/AddCustomer";
import CustomerList from "./components/CustomerList";
import AddBank from "./components/AddBank";
import BanksList from "./components/BanksList";
import AddBranch from "./components/AddBranch";
import BranechList from "./components/BranechList";
import EditBank from "./components/EditBank";
import UpdateCustomer from "./components/UpdateCustomer";
import UpdateBranch from "./components/UpdateBranch";
import AddLoans from "./components/AddLoans";
import LoansList from "./components/LoansList";
import EditLoan from "./components/EditLoan";
import AddLoanApplication from "./components/AddLoanApplication";
import LoanApplicationList from "./components/LoanApplicationList";
import EditLoanApplication from "./components/EditLoanApplication";
import AddProduct from "./components/AddProduct";
import ProductsList from "./components/ProductsList";
import EditProduct from "./components/EditProduct";
import AddUser from "./components/AddUser";
import UsersList from "./components/UsersList";
import EditUser from "./components/EditUser";
import AddInstallment from "./components/AddInstallment";
import InstallmentList from "./components/InstallmentList";
import EditInstallment from "./components/EditInstallment";
import AddPayment from "./components/AddPayment";
import Paymentlist from "./components/Paymentlist";
import EditPayment from "./components/EditPayment";
import AddPenalties from "./components/AddPenalties";
import PenaltiesList from "./components/PenaltiesList";
import EditPenalty from "./components/EditPenalty";
import AddLedger from "./components/AddLedger";
import LedgerList from "./components/LedgerList";
import EditLedger from "./components/EditLedger";
import AddRole from "./components/AddRole";
import RoleList from "./components/RoleList";
import EditRole from "./components/EditRole";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        // <Login />
        <GuestRoute>
          <Login />
        </GuestRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      ),
      children: [
        { path: "home", element: <Home /> },
        { path: "addcustomer", element: <AddCustomer /> },
        { path: "customerlist", element: <CustomerList /> },
        { path: "updatecustomer/:id", element: <UpdateCustomer /> },
        { path: "addbank", element: <AddBank /> },
        { path: "banklist", element: <BanksList /> },
        { path: "updatebank/:id", element: <EditBank /> },
        { path: "addbranch", element: <AddBranch /> },
        { path: "branchlist", element: <BranechList /> },
        { path: "updatebranch/:id", element: <UpdateBranch /> },
        { path: "userslist", element: <UsersList /> },
        { path: "edituser/:id", element: <EditUser /> },
        { path: "addloan", element: <AddLoans /> },
        { path: "loanlist", element: <LoansList /> },
        { path: "editloan/:id", element: <EditLoan /> },
        { path: "addloanapplication", element: <AddLoanApplication /> },
        { path: "loanapplicationlist", element: <LoanApplicationList /> },
        { path: "editloanapplication/:id", element: <EditLoanApplication /> },
        { path: "addproduct", element: <AddProduct /> },
        { path: "productlist", element: <ProductsList /> },
        { path: "editproduct/:id", element: <EditProduct /> },
        { path: "adduser", element: <AddUser /> },
        { path: "addinstallment", element: <AddInstallment /> },
        { path: "installmentlist", element: <InstallmentList /> },
        { path: "editinstallment/:id", element: <EditInstallment /> },
        { path: "addpayment", element: <AddPayment /> },
        { path: "paymentlist", element: <Paymentlist /> },
        { path: "editpayment/:id", element: <EditPayment /> },
        { path: "addpenalty", element: <AddPenalties /> },
        { path: "penaltieslist", element: <PenaltiesList /> },
        { path: "editpenalty/:id", element: <EditPenalty /> },
        { path: "addledger", element: <AddLedger /> },
        { path: "ledgerlist", element: <LedgerList /> },
        { path: "editledger/:id", element: <EditLedger /> },
        { path: "addrole", element: <AddRole /> },
        { path: "rolelist", element: <RoleList /> },
        { path: "editrole/:id", element: <EditRole /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
