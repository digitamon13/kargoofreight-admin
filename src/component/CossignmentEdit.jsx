import React, { useState, useEffect, useRef } from 'react';
import styles from './Home.module.css'
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import Barcode from 'react-jsbarcode';
import { useReactToPrint } from 'react-to-print';
import ReactS3 from 'react-s3';
window.Buffer = window.Buffer || require("buffer").Buffer;
const imageMimeType = /image\/(png|jpg|jpeg)/i;


export const AdminCossignmentEditComponent = ({ updateHandler,onLoader }) => {
    let [isData, setIsData] = useState(null)
    const [photo, setPhoto] = useState(null);
    let { cossignmentsList } = useSelector(state => state.userAuth)
    let navigate = useNavigate()

    let { id } = useParams()

    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value
        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })

    }



    useEffect(() => {
        let dataObj = cossignmentsList.find(data => data._id.toString() === id.toString())
        setIsData(dataObj)
    }, [id])
   



    let submitHandler = async(e) => {
        onLoader()
        e.preventDefault();

        let imgUrl

        const config = {
            dirName: process.env.REACT_APP_DIRNAME,
            bucketName: process.env.REACT_APP_BUCKETNAME,
            region: process.env.REACT_APP_REGION,
            accessKeyId: process.env.REACT_APP_ACCESSKEYID,
            secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY
        }
        

        let upload = async () => {
            if (!photo) {
                return
            }

            return ReactS3.uploadFile(photo, config).then(response => {

                if (response.result.status !== 204)
                    throw new Error("Failed to upload image to S3");
                else {
                    imgUrl = (response.location)
                }
            })
                .catch(error => {
                    console.log(error);
                })
        }

        await upload()
        isData.imageUrl  = imgUrl
        updateHandler(isData)
    }


   



    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Visitor Pass',
        onAfterPrint: () => console.log('Printed PDF successfully!'),
    })




    let handleChangeStatusHandler = (e) => {
        if (e.target.value === 'picked up') {
            setIsData(prev => {
                prev.inTransit_active = false
                prev.pickedUp_active = true
                prev.preparingForDelivery_active = false
                prev.outForDelivery_active = false
                prev.delivered_active = false
                prev.status = 'picked up'
                let newData = { ...prev }
                return newData
            })

        } else if (e.target.value === 'In Transit') {
            setIsData(prev => {
                prev.inTransit_active = true
                prev.pickedUp_active = false
                prev.preparingForDelivery_active = false
                prev.outForDelivery_active = false
                prev.delivered_active = false
                prev.status = 'In Transit'
                let newData = { ...prev }
                return newData
            })

        } else if (e.target.value === 'Preparing for Delivery') {
            setIsData(prev => {
                prev.inTransit_active = false
                prev.pickedUp_active = false
                prev.preparingForDelivery_active = true
                prev.outForDelivery_active = false
                prev.delivered_active = false
                prev.status = 'Preparing for Delivery'
                let newData = { ...prev }
                return newData
            })

        } else if (e.target.value === 'Out for Delivery') {
            setIsData(prev => {
                prev.inTransit_active = false
                prev.pickedUp_active = false
                prev.preparingForDelivery_active = false
                prev.outForDelivery_active = true
                prev.delivered_active = false
                prev.status = 'Out for Delivery'
                let newData = { ...prev }
                return newData
            })

        } else if (e.target.value === 'Delivered') {

            setIsData(prev => {
                prev.inTransit_active = false
                prev.pickedUp_active = false
                prev.preparingForDelivery_active = false
                prev.outForDelivery_active = false
                prev.delivered_active = true
                prev.status = 'Delivered'
                let newData = { ...prev }
                return newData
            })
        }
    }

    const changePhotoHandler = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setPhoto(file);
    };





    return (<>
        <div className={styles.homeScreen} >
            <div className={styles.timeline} >

                {isData && <div className={styles.barCodeArea} ref={componentRef}>

                    <Barcode value={isData.courier_Reference_No} options={{ format: 'code128' }} renderer="svg" />


                    <div className={styles.invoiceContainer}>
                        <div className={styles.invoiceCard}>
                            <h3 className={styles.sectionHead}>Shipper Details</h3>
                            <p>
                                {isData.shipper_name}
                            </p>
                            <p>
                                {isData.shipper_phoneNumber}
                            </p>
                            <p>
                                {isData.shipper_address}
                            </p>
                            <p>
                                {isData.shipper_email}
                            </p>

                        </div>
                        <div className={styles.invoiceCard}>
                            <h3 className={styles.sectionHead}>Reciever's Details</h3>
                            <p>
                                {isData.reciever_name}
                            </p>

                            <p>
                                {isData.reciever_phoneNumber}
                            </p>
                            <p>
                                {isData.reciever_address}
                            </p>
                            <p>
                                {isData.reciever_email}
                            </p>

                        </div>



                    </div>

                 



                </div>}

               

                {cossignmentsList && isData && <form className={styles.editForm} onSubmit={submitHandler}>


                    <h3 className={styles.sectionHead}>Product Image</h3>

                    <div>
                        <img
                            src={isData.imageUrl || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            style={{
                                width: '80%',
                                border: '4px solid #3a4d6c',
                                objectFit: 'cover',
                                padding: '10px'
                            }}
                        />
                    </div>


                    <div className={styles.inputCards}>
                        <label>Upload Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={changePhotoHandler}
                        />
                    </div>





                    <h3 className={styles.sectionHead}>Shipper Details</h3>


                    <div className={styles.inputCards}>
                        <label>
                            Shipper Name
                        </label>

                        <input value={isData.shipper_name} onChange={(e) => handleChangeHandler(e, 'shipper_name')} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Shipper PhoneNumber
                        </label>

                        <input value={isData.shipper_phoneNumber} onChange={(e) => handleChangeHandler(e, 'shipper_phoneNumber')} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Shipper Address
                        </label>
                        <input value={isData.shipper_address} onChange={(e) => handleChangeHandler(e, 'shipper_address')} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Shipper Email
                        </label>
                        <input value={isData.shipper_email} onChange={(e) => handleChangeHandler(e, 'shipper_email')} type='email' />
                    </div>



                    <h3 className={styles.sectionHead}>Reciever's Details</h3>

                    <div className={styles.inputCards}>
                        <label>
                            Reciever Name
                        </label>
                        <input value={isData.reciever_name} onChange={(e) => handleChangeHandler(e, 'reciever_name')} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Reciever Email
                        </label>
                        <input value={isData.reciever_email} onChange={(e) => handleChangeHandler(e, 'reciever_email')} type='email' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Reciever PhoneNumber
                        </label>
                        <input value={isData.reciever_phoneNumber} onChange={(e) => handleChangeHandler(e, 'reciever_phoneNumber')} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Reciever Address
                        </label>
                        <input value={isData.reciever_address} onChange={(e) => handleChangeHandler(e, 'reciever_address')} type='text' />
                    </div>

                    <h3 className={styles.sectionHead}>Shipment Details</h3>




                    <div className={styles.inputCards}>
                        <label>
                            Weight(kg)
                        </label>
                        <input value={isData.weight} onChange={(e) => handleChangeHandler(e, 'weight')} type='number' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Packages
                        </label>
                        <input value={isData.packages} onChange={(e) => handleChangeHandler(e, 'packages')} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Product
                        </label>
                        <input value={isData.product} onChange={(e) => handleChangeHandler(e, 'product')} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Payment Mode
                        </label>
                        <select value={isData.payment_mode} onChange={(e) => handleChangeHandler(e, 'payment_mode')}>
                            <option >
                                Cash
                            </option>

                            <option>
                                Cheque
                            </option>

                        </select>

                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Carrier
                        </label>
                        <select value={isData.carrier} onChange={(e) => handleChangeHandler(e, 'carrier')}>
                            <option>
                                DHL
                            </option>
                            <option>
                                FedEX
                            </option>
                            <option>
                                usps
                            </option>

                        </select>
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Depature Time
                        </label>
                        <input value={isData.depature_time} onChange={(e) => handleChangeHandler(e, 'depature_time')} type='time' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Destination
                        </label>
                        <input value={isData.destination} onChange={(e) => handleChangeHandler(e, 'destination')} />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Pickup Time
                        </label>
                        <input value={isData.pickup_time} onChange={(e) => handleChangeHandler(e, 'pickup_time')} type='time' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Mode
                        </label>
                        <select value={isData.mode} onChange={(e) => handleChangeHandler(e, 'mode')}>
                            <option>
                                Sea transport
                            </option>
                            <option>
                                Land Shipping
                            </option>

                            <option>
                                Air Freight

                            </option>
                        </select>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Quantity
                        </label>
                        <input value={isData.quantity} onChange={(e) => handleChangeHandler(e, 'quantity')} type='number' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Total Freight
                        </label>
                        <input value={isData.total_freight} onChange={(e) => handleChangeHandler(e, 'total_freight')} type='number' />
                    </div>




                    <div className={styles.inputCards}>
                        <label>
                            Origin
                        </label>
                        <input value={isData.origin} onChange={(e) => handleChangeHandler(e, 'origin')} />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Pickup Date
                        </label>
                        <input value={isData.pickup_date} onChange={(e) => handleChangeHandler(e, 'pickup_date')} type='date' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Expected Delivery Date
                        </label>
                        <input value={isData.expected_delivery_date} onChange={(e) => handleChangeHandler(e, 'expected_delivery_date')} type='date' />
                    </div>



                    <h3 className={styles.sectionHead}>Packages</h3>

                    <div className={styles.inputCards}>
                        <label>
                            Qty
                        </label>
                        <input value={isData.Qty} onChange={(e) => handleChangeHandler(e, 'Qty')} type='number' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Piece Type
                        </label>
                        <select value={isData.piece_type} onChange={(e) => handleChangeHandler(e, ' piece_type')}>
                            <option>
                                Pallet

                            </option>
                            <option>
                                Cartons

                            </option>
                            <option>
                                Crate
                            </option>
                            <options>
                                others
                            </options>
                        </select>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Description
                        </label>
                        <input value={isData.description} onChange={(e) => handleChangeHandler(e, 'description')} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Length
                        </label>
                        <input value={isData.length} onChange={(e) => handleChangeHandler(e, 'length')} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Width
                        </label>
                        <input value={isData.width} onChange={(e) => handleChangeHandler(e, 'width')} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Height
                        </label>
                        <input value={isData.height} onChange={(e) => handleChangeHandler(e, 'height')} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            weight
                        </label>
                        <input value={isData.weight} onChange={(e) => handleChangeHandler(e, 'weight')} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            latest update
                        </label>
                        <input value={isData.latestUpdate} onChange={(e) => handleChangeHandler(e, 'latestUpdate')} type='text' />
                    </div>



                    <div className={styles.inputCards}>
                        <label>
                            Status
                        </label>
                        <select value={isData.status} onChange={(e) => handleChangeStatusHandler(e, 'status')}>
                            <option >
                                picked up
                            </option>
                            <option>
                                In Transit
                            </option>
                            <option>
                                Preparing for Delivery

                            </option>
                            <option>
                                Out for Delivery

                            </option>
                            <option>
                                Delivered

                            </option>


                        </select>
                    </div>


                    {isData.status === 'In Transit' && <div className={styles.inputCards} >
                        <label>
                            Location
                        </label>
                        <input value={isData.inTransit_location} onChange={(e) => handleChangeHandler(e, 'inTransit_location')} type='text' />

                        <label>
                            time
                        </label>
                        <input value={isData.inTransit_timestamp} onChange={(e) => handleChangeHandler(e, 'inTransit_timestamp')} type='time' />


                        <label>
                            date
                        </label>

                        <input value={isData.inTransit_date} onChange={(e) => handleChangeHandler(e, 'inTransit_date')} type='date' />

                    </div>}

                    {isData.status === 'picked up' && <div className={styles.inputCards} >
                        <label>
                            Location
                        </label>
                        <input value={isData.pickedUp_location} onChange={(e) => handleChangeHandler(e, 'pickedUp_location')} type='text' />

                        <label>
                            time
                        </label>
                        <input value={isData.pickedUp_timestamp} onChange={(e) => handleChangeHandler(e, 'pickedUp_timestamp')} type='time' />


                        <label>
                            date
                        </label>

                        <input value={isData.pickedUp_date} onChange={(e) => handleChangeHandler(e, 'pickedUp_date')} type='date' />

                    </div>}

                    {isData.status === 'Preparing for Delivery' && <div className={styles.inputCards} >
                        <label>
                            Location
                        </label>
                        <input value={isData.preparingForDelivery_location} onChange={(e) => handleChangeHandler(e, 'preparingForDelivery_location')} type='text' />

                        <label>
                            time
                        </label>
                        <input value={isData.preparingForDelivery_timestamp} onChange={(e) => handleChangeHandler(e, 'preparingForDelivery_timestamp')} type='time' />

                        <label>
                            date
                        </label>

                        <input value={isData.preparingForDelivery_date} onChange={(e) => handleChangeHandler(e, 'preparingForDelivery_date')} type='date' />

                    </div>}


                    {isData.status === 'Out for Delivery' && <div className={styles.inputCards} >
                        <label>
                            Location
                        </label>
                        <input value={isData.outForDelivery_location} onChange={(e) => handleChangeHandler(e, 'outForDelivery_location')} type='text' />

                        <label>
                            time
                        </label>
                        <input value={isData.outForDelivery_timestamp} onChange={(e) => handleChangeHandler(e, 'outForDelivery_timestamp')} type='time' />

                        <label>
                            date
                        </label>

                        <input value={isData.outForDelivery_date} onChange={(e) => handleChangeHandler(e, 'outForDelivery_date')} type='date' />

                    </div>}


                    {isData.status === 'Delivered' && <div className={styles.inputCards} >
                        <label>
                            Location
                        </label>
                        <input value={isData.delivered_location} onChange={(e) => handleChangeHandler(e, 'delivered_location')} type='text' />

                        <label>
                            time
                        </label>
                        <input value={isData.delivered_timestamp} onChange={(e) => handleChangeHandler(e, 'delivered_timestamp')} type='time' />

                        <label>
                            date
                        </label>

                        <input value={isData.delivered_date} onChange={(e) => handleChangeHandler(e, 'delivered_date')} type='date' />
                    </div>}



                    <div className={styles.inputCards}>
                        <label>
                            Lattitude
                        </label>
                        <input value={isData.lattitude} onChange={(e) => handleChangeHandler(e, 'lattitude')} type='text' />
                    </div>
                    <div className={styles.inputCards}>
                        <label>
                            Longitude
                        </label>
                        <input value={isData.longitude} onChange={(e) => handleChangeHandler(e, 'longitude')} type='text' />
                    </div>

                    <div className={styles.buttonContainer} >
                        <button className={styles.button}>Update</button>
                    </div>
                </form>}
            </div >
        </div >
    </>)




}