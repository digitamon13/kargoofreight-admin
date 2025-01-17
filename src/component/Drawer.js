import React from 'react'
import styles from './Drawer.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from '../store/action/userAppStorage';
import { useSelector } from "react-redux";


let topMenu = [
  {
    icon: 'list',
    title: 'cossignments',
    link: '/cossignments'
  },


  {
    icon: 'email',
    title: 'emails',
    link: '/email'
  },

  {
    icon: 'settings',
    title: 'settings',
    link: '/admin'
  },



]




const DashboardDrawer = ({ showmenuHandler }) => {

  let navigate = useNavigate()
  const dispatch = useDispatch()
  let { color } = useSelector(state => state.userAuth)

  let navigateHandler = async (data) => {
    if (data === 'signout') {
      navigate('/')
      await dispatch(logout())

    } else {
      navigate(data)
    }
  }



  return (<div className='drawerCon'>

    <div className={styles.drawer} style={{ backgroundColor: color.background }}>
      <div className={styles.cancels} onClick={showmenuHandler}>

        <h2>Admin</h2>
        <div className={`${styles.menu} ${styles.cancel}`}>
          <span className='material-icons ' onClick={showmenuHandler}>
            menu
          </span>

        </div>


      </div>


      <ul className={styles.drawerMenuCon}>
        {topMenu.map(data => <li className={styles.drawerMenu} onClick={() => navigateHandler(data.link)} key={data.link} style={{ color: color.blue }}><span className='material-icons' key={data.title} style={{ backgroundColor: color.fadeColor, color: color.normalText }} >{data.icon}</span>{data.title}</li>)}

      </ul>

      <div className={styles.boxunderline}>
      </div>




    </div>
  </div>)
}

export default DashboardDrawer