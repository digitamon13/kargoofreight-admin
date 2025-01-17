import React, { useState } from 'react';
import styles from './Home.module.css';
import DashboardHeader from '../component/dashboardNav';
import DashboardDrawer from '../component/Drawer';
import Sidebar from '../component/sidebar';
import { useNavigate} from 'react-router-dom';
import LoadingModal from "../component/LoadingModal";
import { useDispatch } from 'react-redux';
import { createHistory } from '../store/action/userAppStorage';
import { Error } from '../component/Error';
import { AdminHistoryCreateComponent } from '../component/HistoryCreate ';



const AdminCreateHistory = ({ status }) => {
    //tradeModal and transfer modal
    let [isError, setIsError] = useState(false)
    let [isLoading, setIsLoading] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()




    let showmenuHandler = () => {
        let drawer = document.querySelector('.drawerCon')
        drawer.classList.toggle('showdrawer')
    }



    let updateHandler = async (data) => {
        setIsLoading(true)
        let res = await dispatch(createHistory(data))

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        setIsLoading(false)
        navigate('/cossignments')
    }



    if (isError) {
        return <Error />
    }


    return (<>
        {isLoading && <LoadingModal />}
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <Sidebar status='' />
            </div>

            <div className={styles.main}>
                {/*mobile and dashboard headers*/}
                <DashboardDrawer showmenuHandler={showmenuHandler} />
                <DashboardHeader showmenuHandler={showmenuHandler} headerTitle='New Location' />
                <AdminHistoryCreateComponent updateHandler={updateHandler} />
            </div>
            
        </div>
    </>
    )
}

export default AdminCreateHistory