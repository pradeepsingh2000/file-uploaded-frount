import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { useSelector } from "react-redux";
import { selectedLoggerInUser } from "../redux/reducer/authSlice";
import FileList from "../components/fileList";

export default function Home() {
  const user = useSelector(selectedLoggerInUser);
  return (
    <div className="p-2">
      <Header user={user.fullName} />
      <div className="card mt-2">
        <FileList user={user.userType} />
      </div>
      <Footer />
    </div>
  );
}
