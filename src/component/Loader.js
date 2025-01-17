import React from 'react';
import styles from './HomeLoader.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector } from "react-redux";


export const Loader = React.memo(() => {
    let { color } = useSelector(state => state.userAuth)

    return (<div className={styles.payScreen} >
        <div className={styles.pay}>
            <div className={styles.payLoaderCon}>
                <div style={{ width: '100%' }}>
                    <Skeleton style={{
                        height: '150px',
                        width: '100%',
                    }}
                        baseColor={`rgb(41, 46, 61)`}
                        highlightColor={`rgb(58, 59, 85)`} />
                </div>




            </div>
            <div className={styles.payLoaderCon}>
                <div style={{ width: '30%' }}>
                    <Skeleton style={{
                        height: '35px',
                        width: '100%',
                    }}
                        baseColor={`rgb(41, 46, 61)`}
                        highlightColor={`rgb(58, 59, 85)`} />

                </div>
                <div style={{ width: '40%' }}>
                    <Skeleton style={{
                        height: '20px',
                        width: '100%',
                    }}
                        baseColor={`rgb(41, 46, 61)`}
                        highlightColor={`rgb(58, 59, 85)`} />
                </div>


            </div>
            <div className={styles.payLoaderCon}>
                <div style={{ width: '10%' }}>
                    <Skeleton style={{
                        height: '20px',
                        width: '100%',
                    }}
                        baseColor={`rgb(41, 46, 61)`}
                        highlightColor={`rgb(58, 59, 85)`} />

                </div>
                <div style={{ width: '20%' }}>
                    <Skeleton style={{
                        height: '20px',
                        width: '100%',
                    }}
                        baseColor={`rgb(41, 46, 61)`}
                        highlightColor={`rgb(58, 59, 85)`} />

                </div>
                <div style={{ width: '30%' }}>
                    <Skeleton style={{
                        height: '20px',
                        width: '100%',
                    }}
                        baseColor={`rgb(41, 46, 61)`}
                        highlightColor={`rgb(58, 59, 85)`} />

                </div>
                <div style={{ width: '30%' }}>
                    <Skeleton style={{
                        height: '20px',
                        width: '100%',
                    }}
                        baseColor={`rgb(41, 46, 61)`}
                        highlightColor={`rgb(58, 59, 85)`} />

                </div>


            </div>
            <div className={styles.payLoaderCon}>
                <div style={{ width: '40%' }}>
                    <Skeleton style={{
                        height: '50px',
                        width: '100%',
                    }}
                        baseColor={`rgb(41, 46, 61)`}
                        highlightColor={`rgb(58, 59, 85)`} />

                </div>





            </div>
            <div className={styles.payLoaderCon}>
                <div style={{ width: '80%' }}>
                    <Skeleton style={{
                        height: '30px',
                        width: '100%',
                    }}
                        baseColor={`rgb(41, 46, 61)`}
                        highlightColor={`rgb(58, 59, 85)`} />

                </div>





            </div>

            <div className={styles.payLoaderCon}>
                <div style={{ width: '100%' }}>
                    <Skeleton style={{
                        height: '50px',
                        width: '100%',
                    }}
                        baseColor={`rgb(41, 46, 61)`}
                        highlightColor={`rgb(58, 59, 85)`} />

                </div>




            </div>
            <div className={styles.payLoaderCon}>
                <div style={{ width: '40%' }}>
                    <Skeleton style={{
                        height: '30px',
                        width: '100%',
                    }}
                        baseColor={`rgb(41, 46, 61)`}
                        highlightColor={`rgb(58, 59, 85)`} />

                </div>
                <div style={{ width: '50%' }}>
                    <Skeleton style={{
                        height: '30px',
                        width: '100%',
                    }}
                        baseColor={`rgb(41, 46, 61)`}
                        highlightColor={`rgb(58, 59, 85)`} />

                </div>




            </div>


        </div>
    </div>



    )
})