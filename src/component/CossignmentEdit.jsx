import React, { useState, useEffect, useRef } from 'react';
import styles from './Home.module.css'
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import Barcode from 'react-jsbarcode';
import { useReactToPrint } from 'react-to-print';



export const AdminCossignmentEditComponent = ({ updateHandler, onLoader }) => {
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




    let submitHandler = async (e) => {
        onLoader()
        e.preventDefault();

        updateHandler(isData)
    }






    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Visitor Pass',
        onAfterPrint: () => console.log('Printed PDF successfully!'),
    })








    return (<>
        <div className={styles.homeScreen} >
            <div className={styles.timeline}>
                {isData && (
                    <div className={styles.barCodeArea} ref={componentRef}>
                        <Barcode
                            value={isData.carrier_reference_no}
                            options={{ format: "code128" }}
                            renderer="svg"
                        />
                        <div className={styles.invoiceContainer}>
                            <div className={styles.invoiceCard}>
                                <h3 className={styles.sectionHead}>Shipper Details</h3>
                                <p>{isData.shipper_name}</p>
                                <p>{isData.shipper_phoneNumber}</p>
                                <p>{isData.shipper_address}</p>
                                <p>{isData.shipper_email}</p>
                            </div>
                            <div className={styles.invoiceCard}>
                                <h3 className={styles.sectionHead}>Receiver's Details</h3>
                                <p>{isData.receiver_name}</p>
                                <p>{isData.receiver_phoneNumber}</p>
                                <p>{isData.receiver_address}</p>
                                <p>{isData.receiver_email}</p>
                            </div>
                        </div>
                    </div>
                )}

                {cossignmentsList && isData && (
                    <form className={styles.editForm} onSubmit={submitHandler}>
                        {/* Shipper Details */}
                        <h3 className={styles.sectionHead}>Shipper Details</h3>
                        <div className={styles.inputCards}>
                            <label>Shipper Name</label>
                            <input
                                value={isData.shipper_name}
                                onChange={(e) => handleChangeHandler(e, "shipper_name")}
                                type="text"
                            />
                        </div>
                        <div className={styles.inputCards}>
                            <label>Shipper Phone Number</label>
                            <input
                                value={isData.shipper_phoneNumber}
                                onChange={(e) => handleChangeHandler(e, "shipper_phoneNumber")}
                                type="text"
                            />
                        </div>
                        <div className={styles.inputCards}>
                            <label>Shipper Address</label>
                            <input
                                value={isData.shipper_address}
                                onChange={(e) => handleChangeHandler(e, "shipper_address")}
                                type="text"
                            />
                        </div>
                        <div className={styles.inputCards}>
                            <label>Shipper Email</label>
                            <input
                                value={isData.shipper_email}
                                onChange={(e) => handleChangeHandler(e, "shipper_email")}
                                type="email"
                            />
                        </div>

                        {/* Receiver Details */}
                        <h3 className={styles.sectionHead}>Receiver Details</h3>
                        <div className={styles.inputCards}>
                            <label>Receiver Name</label>
                            <input
                                value={isData.receiver_name}
                                onChange={(e) => handleChangeHandler(e, "receiver_name")}
                                type="text"
                            />
                        </div>
                        <div className={styles.inputCards}>
                            <label>Receiver Phone Number</label>
                            <input
                                value={isData.receiver_phoneNumber}
                                onChange={(e) => handleChangeHandler(e, "receiver_phoneNumber")}
                                type="text"
                            />
                        </div>
                        <div className={styles.inputCards}>
                            <label>Receiver Address</label>
                            <input
                                value={isData.receiver_address}
                                onChange={(e) => handleChangeHandler(e, "receiver_address")}
                                type="text"
                            />
                        </div>
                        <div className={styles.inputCards}>
                            <label>Receiver Email</label>
                            <input
                                value={isData.receiver_email}
                                onChange={(e) => handleChangeHandler(e, "receiver_email")}
                                type="email"
                            />
                        </div>





                        {/* Shipment Details */}
                        <h3 className={styles.sectionHead}>Shipment Details</h3>
                        <div className={styles.inputCards}>
                            <label>Weight (kg)</label>
                            <input
                                value={isData.weight}
                                onChange={(e) => handleChangeHandler(e, "weight")}
                                type="number"
                            />
                        </div>

                        <div className={styles.inputCards}>
                            <label>Product</label>
                            <input
                                value={isData.product}
                                onChange={(e) => handleChangeHandler(e, "product")}
                                type="text"
                            />
                        </div>
                        <div className={styles.inputCards}>
                            <label>Origin Country</label>
                            <input
                                value={isData.origin}
                                onChange={(e) => handleChangeHandler(e, "origin")}
                                type="text"
                            />
                        </div>
                        <div className={styles.inputCards}>
                            <label>Package Type</label>
                            <select
                                value={isData.package}
                                onChange={(e) => handleChangeHandler(e, "package")}
                            >
                                <option value="">Select Package Type</option>
                                <option value="Document">Document</option>
                                <option value="Parcel">Parcel</option>
                                <option value="Package">Package</option>
                                <option value="Freight">Freight</option>
                                <option value="Envelope">Envelope</option>
                                <option value="Box">Box</option>
                                <option value="Pallet">Pallet</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Payment Mode */}
                        <div className={styles.inputCards}>
                            <label>Payment Mode</label>
                            <select
                                value={isData.payment_mode}
                                onChange={(e) => handleChangeHandler(e, "payment_mode")}
                            >
                                <option value="Cash">Cash</option>
                                <option value="Credit/Debit Card">Credit/Debit Card</option>
                                <option value="Net Banking">Net Banking</option>
                                <option value="UPI">UPI</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="PayPal">PayPal</option>
                            </select>
                        </div>

                        <div className={styles.inputCards}>
                            <label>Total Freight</label>
                            <input
                                value={isData.total_freight}
                                onChange={(e) => handleChangeHandler(e, "total_freight")}
                                type="number"
                            />
                        </div>

                        <div className={styles.inputCards}>
                            <label>Destination</label>

                            <input
                                value={isData.destination}
                                onChange={(e) => handleChangeHandler(e, "destination")}
                                type="string"
                            />
                        </div>



                        <div className={styles.inputCards}>
                            <label>Carrier</label>
                            <select
                                value={isData.carrier}
                                onChange={(e) => handleChangeHandler(e, "carrier")}
                            >
                                <option value="">Select Carrier</option>
                                <option value="DHL">DHL</option>
                                <option value="UPS">UPS</option>
                                <option value="FedEx">FedEx</option>
                                <option value="USPS">USPS</option>
                                <option value="Other">Kargo</option>
                            </select>
                        </div>


                        <div className={styles.inputCards}>
                            <label>Type of Shipment</label>
                            <select
                                value={isData.type_of_shipment}
                                onChange={(e) => handleChangeHandler(e, "type_of_shipment")}
                            >
                                <option value="">Select Type of Shipment</option>
                                <option value="Document">Document</option>
                                <option value="Parcel">Parcel</option>
                                <option value="Package">Package</option>
                                <option value="Freight">Freight</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>


                        <div className={styles.inputCards}>
                            <label>Shipment Mode</label>
                            <select
                                value={isData.shipment_mode}
                                onChange={(e) => handleChangeHandler(e, "shipment_mode")}
                            >
                                <option value="">Select Shipment Mode</option>
                                <option value="Air">Air</option>
                                <option value="Land">Land</option>
                                <option value="Sea">Sea</option>
                                <option value="Express">Express</option>
                                <option value="Standard">Standard</option>
                                <option value="Economy">Economy</option>
                            </select>
                        </div>


                        <div className={styles.inputCards}>
                            <label>Carrier Reference No</label>
                            <input
                                value={isData.carrier_reference_no}
                                onChange={(e) => handleChangeHandler(e, "carrier_reference_no")}
                                type="string"
                            />
                        </div>

                        <div className={styles.inputCards}>
                            <label>Quantity</label>
                            <input
                                value={isData.qty}
                                onChange={(e) => handleChangeHandler(e, "qty")}
                                type="number"
                            />
                        </div>

                        <div className={styles.inputCards}>
                            <label>comments</label>
                            <input
                                value={isData.comments}
                                onChange={(e) => handleChangeHandler(e, "comments")}
                                type="text"
                            />
                        </div>


                        {/* Dates */}
                        <div className={styles.inputCards}>
                            <label>Depature time</label>
                            <input
                                value={isData.departure_time}
                                onChange={(e) => handleChangeHandler(e, "departure_time")}
                                type="time"
                            />
                        </div>

                        <div className={styles.inputCards}>
                            <label>Expected Delivery Date</label>
                            <input
                                value={isData.expected_delivery_date}
                                onChange={(e) => handleChangeHandler(e, "expected_delivery_date")}
                                type="date"
                            />
                        </div>

                        <div className={styles.inputCards}>
                            <label>Pick-up Date</label>
                            <input
                                value={isData.pick_up_date}
                                onChange={(e) => handleChangeHandler(e, "pick_up_date")}
                                type="date"
                            />
                        </div>

                        <div className={styles.inputCards}>
                            <label>Pick-up Time</label>
                            <input
                                value={isData.pick_up_time}
                                onChange={(e) => handleChangeHandler(e, "pick_up_time")}
                                type="time"
                            />
                        </div>

                        <div className={styles.inputCards}>
                            <label>lattitude</label>
                            <input
                                value={isData.lattitude || ""}
                                onChange={(e) => handleChangeHandler(e, "lattitude")}
                                type="text"
                            />
                        </div>


                        <div className={styles.inputCards}>
                            <label>longitude</label>
                            <input
                                value={isData.longitude || ""}
                                onChange={(e) => handleChangeHandler(e, "longitude")}
                                type="text"
                            />
                        </div>

                        {/* Status */}
                        <div className={styles.inputCards}>
                            <label>Status</label>
                            <select
                                value={isData.status}
                                onChange={(e) => handleChangeHandler(e, "status")}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Transit">In Transit</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Returned">Returned</option>
                                <option value="Lost">Lost</option>
                                <option value="Damaged">Damaged</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className={styles.buttonContainer}>
                            <button type="submit" className={styles.button}>Update</button>
                        </div>
                    </form>
                )}
            </div>

        </div >
    </>)




}