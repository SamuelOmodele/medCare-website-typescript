import React from 'react'

type serviceBoxProps = {
    service: {
        functionCall: () => void,
        icon: string;
        title: string;
        description: string;
    },
}

const ServicesBox = ({service} : serviceBoxProps) => {
    return (
        <div className="box" onClick={service.functionCall}>
            <span className="material-symbols-outlined">{service.icon}</span>
            <div className="box-text">
                <p className="thick">{service.title}</p>
                <p className='small'>{service.description}</p>
            </div>
        </div>
    )
}

export default ServicesBox