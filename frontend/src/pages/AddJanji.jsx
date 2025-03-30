import React, {useEffect} from 'react'
import AdminLayout from './AdminLayout';
import FormAddJanji from '../components/FormAddJanji'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddJanji = () => {
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
            <FormAddJanji />
        </AdminLayout>
    </div>
  )
}

export default AddJanji