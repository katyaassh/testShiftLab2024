import {createOtp} from "../../../api/api";
import "./OtpSection.css"
import {Countdown} from "../Countdown/Countdown";

interface CreateNewOtpButtonProps {
    phone: string
    time: number
    setTime: (time: number) => void
}

export const OtpSection = ({phone, time, setTime}: CreateNewOtpButtonProps) => {
    const onClick = () => {
        createOtp({phone}).then((response) => {
            setTime(response.retryDelay / 1000)
            setTimeout(() => {
                setTime(0)
            }, response.retryDelay)
        })
    }

    return <div className={"otp-section"}>
        {time > 0 ? <Countdown time={time}/> :
            <button type={"submit"} className={"otp-section__button"} onClick={onClick}>Запросить код повторно</button>}
    </div>
}