import React, {useEffect} from 'react';
import AdminLayout from './AdminLayout';
import FormEditTinjauan from '../components/FormEditTinjauan';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditTinjauan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

 useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if(isError){
      navigate("/")
    }
  }, [isError, navigate]);

  return (
    <div>
        <AdminLayout>
            <FormEditTinjauan />
        </AdminLayout>
    </div>
  );
};

export default EditTinjauan;