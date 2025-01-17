import React, { useState, useEffect } from 'react';
import styles from './Home.module.css'
import { useDispatch } from "react-redux";
import { deleteHistory, fetchHistories } from "../store/action/userAppStorage";
import { Loader } from '../component/HomeLoader';
import { useNavigate, useParams } from 'react-router-dom';
import { Error } from "../component/Error";
import { useSelector } from "react-redux";



export const AdminHistoriesComponent = ({ status }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [historyList, setHistoryList] = useState([])
    let [filteredHistories, setfilteredHistories] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { cossignment} = useParams()

    let { color } = useSelector(state => state.userAuth)

    useEffect(() => {
        fetchAllHistories()
    }, [])


    let fetchAllHistories = async () => {
        setIsError(false)
        let res = await dispatch(fetchHistories(cossignment))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setHistoryList(res.message)
        setfilteredHistories(res.message)
        setIsLoading(false)
    }

    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/histories/${cossignment}/${id}`)
    }


    let deleteHandler = async (id) => {
        //delete this specific case from server
        setIsError(false)
        let res = await dispatch(deleteHistory(id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        //filtering the already list
        let filteredArray = historyList.filter(data => data._id !== id)

        setHistoryList(filteredArray)
        setfilteredHistories(filteredArray)
        setIsLoading(false)

    }


    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredHistories.filter((item) => {
                const itemData = item.location? item.location : '';
                const textData = e.target.value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            })
            setHistoryList(newData)
            setIsLoading(false)
        } else {
            setHistoryList(filteredHistories)
            setIsLoading(false)
        }
    }


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<div className={styles.homeScreen} >

        <div className={styles.timeline} >

           <div className={styles.filter}>
                <div className={styles.searchContainer}>
                    <div className={styles.searchBar}>
                        < input className={styles.input} placeholder='search by location' onChange={searchHandler} />
                        <span className='material-icons'>
                            search
                        </span>
                    </div>
                </div>

                <div className={styles.dateFilter}>
                </div>
            </div>

            <div className={styles.tableContainer} >

                
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Date
                            </td>
                            
                            <td>
                                Time

                            </td>
                            <td>
                                Location
                            </td>

                            <td>
                                Status
                            </td>

                            

                            <td> 
                                delete
                            </td>
                            <td>
                                edit
                            </td>

                        </tr>


                        {historyList.map(data => <tr key={data.__cossignment} >
                            <td>
                                {data.date}
                            </td>
                            
                            <td>
                                {data.time}

                            </td>
                            <td>
                                {data.location}
                            </td>

                            <td>
                                {data.status}
                            </td>

                          

                            <td onClick={() => deleteHandler(data._id)}>
                                <span className='material-icons'> delete</span>
                            </td>

                            <td onClick={() => editHandler(data._id)}>
                                <span className='material-icons'> edit</span>
                            </td>






                        </tr>)}


                    </tbody>
                </table>
            </div>



        </div>



    </div>)




}
