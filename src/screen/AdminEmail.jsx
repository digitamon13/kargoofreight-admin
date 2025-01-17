import React, { useState } from 'react';
import styles from './Home.module.css';
import DashboardHeader from '../component/dashboardNav';
import DashboardDrawer from '../component/Drawer';
import Sidebar from '../component/sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadingModal from "../component/LoadingModal";
import { useDispatch } from 'react-redux';
import { sendEmail} from '../store/action/userAppStorage';
import { Error } from '../component/Error';
import { AdminEmailComp} from '../component/AdminEmail';


const AdminEmail = () => {
    //tradeModal and transfer modal
    let [isError, setIsError] = useState(false)
    let { admin } = useSelector(state => state.userAuth)
    let [isLoading, setIsLoading] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let {id} = useParams()

    let showmenuHandler = () => {
        let drawer = document.querySelector('.drawerCon')
        drawer.classList.toggle('showdrawer')
    }


    let updateHandler = async(data)=>{
        setIsLoading(true)
        let res = await dispatch(sendEmail(data))
        if(!res.bool){
            setIsError(true)
            setIsLoading(false)
            return
        }
        setIsLoading(false)
        navigate('/cosSignments')
    }



    if(isError){
        return <Error/>
    }


    return (<>
        {isLoading && <LoadingModal />}
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <Sidebar status='Cases' />
            </div>

            <div className={styles.main}>
                {/*mobile and dashboard headers*/}
                <DashboardDrawer showmenuHandler={showmenuHandler} />
                <DashboardHeader showmenuHandler={showmenuHandler} title='Home' headerTitle='Send Email' />
                <AdminEmailComp  updateHandler = {updateHandler} />
            </div>
        </div>
    </>
    )
}

export default AdminEmail