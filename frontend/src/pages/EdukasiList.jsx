import React, { useEffect } from "react";
import AdminLayout from "./AdminLayout";
import Edukasi from "../components/EdukasiAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EdukasiList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if(isError){
      navigate("/adminPage")
    }
  }, [isError, navigate]);

  return (
    <div>
      <AdminLayout>
        <Edukasi />
      </AdminLayout>
    </div>
  );
};

export default EdukasiList;