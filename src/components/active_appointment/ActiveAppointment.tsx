type appointmentType = {
    uniqueId: string;
    email: string;
    appointmentDate: string;
    appointmentTime: string;
    appointmentTitle: string;
    appointmentMsg: string;
    createdAt: Date;
}

type activeAppointmentProps = {
    activeAppointment: appointmentType, 
    setActiveAppointment: (data: null) => void;
}

const ActiveAppointment = ({activeAppointment, setActiveAppointment}: activeAppointmentProps) => {
    return (
        <>
            <div className="background"></div>
            <div className="appointment-form modal rounded-border">
                <form action="">
                    <span className="material-symbols-outlined" onClick={() => setActiveAppointment(null)}>close</span>
                    <h2>Appointment Schedule</h2>
                    <div className="form-control">
                        <label htmlFor="">Appointment Date</label>
                        <input type="date" name="date" id="date" value={activeAppointment.appointmentDate} readOnly />
                    </div>
                    <div className="form-control">
                        <label htmlFor="">Appointment Time</label>
                        <input type="time" name="time" id="time" value={activeAppointment.appointmentTime} readOnly />
                    </div>
                    <div className="form-control">
                        <label htmlFor="">Appointment Title</label>
                        <input type="text" name="title" id="title" value={activeAppointment.appointmentTitle} readOnly />
                    </div>
                    <div className="form-control">
                        <label htmlFor="">Message</label>
                        <textarea name="message" id="message" cols={30} rows={6} placeholder='Enter your message ...' style={{ resize: 'none' }} value={activeAppointment.appointmentMsg} required readOnly></textarea>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ActiveAppointment