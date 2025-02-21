import React, { useState, useEffect } from 'react';
import styles from './Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export const AdminHistoryEditComponent = ({ updateHandler }) => {
    let [isData, setIsData] = useState(null)
    let { color, historiesList } = useSelector(state => state.userAuth)

    let { cossignment, id } = useParams()

    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value
        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })

    }



    let submitHandler = (e) => {
        e.preventDefault()
        //patch case on 
        updateHandler(isData)

    }

    useEffect(() => {
        let dataObj = historiesList.find(data => data._id.toString() === id.toString())

        setIsData(dataObj)

    }, [id])










    return (<>
        <div className={styles.homeScreen} >

            <div className={styles.timeline} >

                {isData && <form className={styles.editForm} onSubmit={submitHandler}>

                    <div className={styles.inputCards}>
                        <label>
                            Date
                        </label>

                        <input value={isData.date} onChange={(e) => handleChangeHandler(e, 'date')} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Time
                        </label>

                        <input value={isData.time} onChange={(e) => handleChangeHandler(e, 'time')} type='time' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Location
                        </label>

                        <input value={isData.location} onChange={(e) => handleChangeHandler(e, 'location')} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Lattitude
                        </label>

                        <input value={isData.lattitude} onChange={(e) => handleChangeHandler(e, 'lattitude')} type='number' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Longitude
                        </label>

                        <input value={isData.longitude} onChange={(e) => handleChangeHandler(e, 'longitude')} type='number' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            UpdatedBy
                        </label>

                        <input value={isData.updatedBy} onChange={(e) => handleChangeHandler(e, 'updatedBy')} type='text' placeholder='Admin' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Remarks
                        </label>

                        <input value={isData.remarks} onChange={(e) => handleChangeHandler(e, 'remarks')} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Status
                        </label>
                        <select value={isData.status} onChange={(e) => handleChangeHandler(e, 'status')}>
                            <option >
                                On hold

                            </option>
                            <option>Out For Delivery</option>
                            <option>
                                Picked Up

                            </option>
                            <option>
                                In Transit

                            </option>
                            <option>
                                Cancelled

                            </option>
                            <option>
                                Delivered

                            </option>
                            <option>
                                Returned

                            </option>

                        </select>
                    </div>

                    <div className={styles.buttonContainer} >
                        <button >save</button>
                    </div>
                </form>
                }
            </div>


        </div></>)




}