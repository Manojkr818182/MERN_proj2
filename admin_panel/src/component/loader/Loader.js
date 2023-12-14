import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div style={{display:'flex', justifyContent:'center', height:'80vh', alignItems:'center'}}>
            <ThreeCircles

                height="100"
                width="100"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor="red"
                innerCircleColor="green"
                middleCircleColor="blue"
            />
        </div>
    )
}

export default Loader
