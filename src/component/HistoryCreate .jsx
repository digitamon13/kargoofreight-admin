import React, { useState } from 'react';
import styles from './Home.module.css'
import { useParams } from 'react-router-dom';


export const AdminHistoryCreateComponent = ({ updateHandler }) => {
    let [isData, setIsData] = useState({
        status:'On Hold',
        UploadedBy:'Admin'
    })

    let { cossignment } = useParams()
    console.log(cossignment)

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
        isData.cossignment = cossignment
        updateHandler(isData)

    }


    return (<>
        <div className={styles.homeScreen}>

            <div className={styles.timeline} >
                <form className={styles.editForm} onSubmit={submitHandler}>
                   
                    <div className={styles.inputCards}>
                        <label>
                            Date
                        </label>

                        <input value={isData.date} onChange={(e) => handleChangeHandler(e, 'date')} type='date' />
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

                        <input value={isData.UploadedBy} onChange={(e) => handleChangeHandler(e, 'UploadedBy')} type='text' placeholder='Admin' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                        Remarks
                        </label>

                        <input value={isData.Remarks} onChange={(e) => handleChangeHandler(e, 'Remarks')} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Status
                        </label>
                        <select value={isData.status} onChange={(e) => handleChangeHandler(e, 'status')}>
                            <option >
                               On Hold

                            </option>
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
            </div>






        </div></>)




}