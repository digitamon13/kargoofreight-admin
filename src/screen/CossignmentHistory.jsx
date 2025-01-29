import React, { useState } from 'react';
import styles from './Home.module.css';
import DashboardHeader from '../component/dashboardNav';
import DashboardDrawer from '../component/Drawer';

import Sidebar from '../component/sidebar';
import LoadingModal from "../component/LoadingModal";
import { AdminCossignmentsHistoryComponent } from '../component/AdminCossignmentsHistoryComponent';
import { Error } from '../component/Error';
import { useNavigate } from 'react-router-dom';


const AdminCossignmentHistory = ({status}) => {
    //tradeModal and transfer modal
    let [isLoading, setIsLoading] = useState(false)
    let [isError,setIsError] = useState(false)
    let navigate = useNavigate()
    
    let handleNavigation = ()=>{
        navigate('/cossignment')
    }

   

    let showmenuHandler = () => {
        let drawer = document.querySelector('.drawerCon')
        drawer.classList.toggle('showdrawer')
    }


    if(isError){
        return <Error/>
    }


    return (<>
        {isLoading && <LoadingModal />}
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <Sidebar status='Cossignments' />
            </div>

            <div className={styles.main}>
                {/*mobile and dashboard headers*/}
                <DashboardDrawer showmenuHandler={showmenuHandler} />
                <DashboardHeader showmenuHandler={showmenuHandler}  headerTitle='Cossignments' />
                <AdminCossignmentsHistoryComponent status={status}/>
            </div>
          
            
        </div>
    </>
    )
}

export default AdminCossignmentHistory