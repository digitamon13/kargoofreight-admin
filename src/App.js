import React, { useEffect, Suspense } from "react"
import { Route, Routes } from 'react-router-dom'
import './App.css'
//importing redux action to log user in initially
import { autoLogin } from "./store/action/userAppStorage";
import { useDispatch } from "react-redux";
import FallBackComponent from './component/Fallback'
import { useSelector } from "react-redux";

{/*Admin dashbaoard section*/ }
const AdminLogin = React.lazy(() => import('./screen/Login'))

const AdminCossignmentsHistoryComponent = React.lazy(() => import('./screen/CossignmentHistory'))

const AdminSignup = React.lazy(() => import('./screen/Signup'))

const AdminCossignments = React.lazy(() => import('./screen/AdminCossignments'))
const AdminEditCosignment = React.lazy(() => import('./screen/AdminEditCosignment'))
const AdminCreateCossignment = React.lazy(() => import('./screen/AdminCreateCossignment'))


const AdminHistories = React.lazy(() => import('./screen/AdminHistories'))
const AdminEditHistory = React.lazy(() => import('./screen/AdminEditHistory'))
const AdminCreateHistories = React.lazy(() => import('./screen/AdminCreateHistories'))

const AdminEditAdmin = React.lazy(() => import('./screen/AdminEditAdmin'))

const AdminEmail = React.lazy(() => import('./screen/AdminEmail'))

function App() {
  let dispatch = useDispatch()
  let { token } = useSelector(state => state.userAuth)

  useEffect(async () => {
    await dispatch(autoLogin())
    //await dispatch(getTheme())
  }, [])


  return (
    <div className="App">
      <Suspense fallback={<FallBackComponent />}>
        <Routes>
          {/*the general routes */}
          <Route path='/' element={<AdminLogin />} />

          <Route path='/login' element={<AdminLogin />} />
          {/* the Admin  DASHBOARD routes*/}
          

          <Route path='/signup' element={<AdminSignup />} />
          {/* history routes */}
      
          <Route path='/histories/cossignments' element={token ? < AdminCossignmentsHistoryComponent status={false} /> : <AdminLogin />} />


          <Route path='/histories/:id' element={token ? <AdminHistories status={false} /> : <AdminLogin />} />


          <Route path='/histories/:cossignment/:id' element={token ? <AdminEditHistory status={true} /> : <AdminLogin />} />
          <Route path='/history/:cossignment' element={token ? <AdminCreateHistories status={true} /> : <AdminLogin />} />

          {/* cossignment routes routes */}
          <Route path='/cossignments' element={token ? <AdminCossignments  status={false} /> : <AdminLogin />} />
          <Route path='/cossignments/:id' element={token ? <AdminEditCosignment status={true} /> : <AdminLogin />} />
          <Route path='/cossignment' element={token ? <AdminCreateCossignment status={true} /> : <AdminLogin />} />
          <Route path='/admin' element={token ? <AdminEditAdmin status={true} /> : <AdminLogin />} />
          <Route path='/email' element={token ? <AdminEmail status={true} /> : <AdminLogin />} />
        </Routes>
      </Suspense>
    </div>

  );
}

export default App;
