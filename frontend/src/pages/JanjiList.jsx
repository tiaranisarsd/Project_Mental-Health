import React, { useEffect } from "react";
import AdminLayout from "./AdminLayout";
import Janji from "../components/JanjiAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const JanjiList = () => {
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
        <Janji />
      </AdminLayout>
    </div>
  );
};

export default JanjiList;