import "./Form.css"
import {SubmitHandler, useForm} from "react-hook-form";
import {createOtp, signIn} from "../../../api/api";
import {useState} from "react";
import {OtpSection} from "../OtpSection/OtpSection";
import InputMask from 'react-input-mask';
import {AxiosError} from "axios/index";

const codeErrorMessage = "Код должен содержать 6 цифр"

interface FormInput {
    phone: string,
    code: number
}
export const Form = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const [time, setTime] = useState(0)
    const {register, handleSubmit, watch, formState: {errors}, setError} = useForm<FormInput>({mode: "all"})

    const phone = watch("phone")

    const onSubmit: SubmitHandler<FormInput> = async (data) => {
        try {
            !isSuccess ?
                await createOtp({phone: data.phone}).then((response) => {
                    setTime(5)
                    setIsSuccess(response.success)
                    setTimeout(() => {
                        setTime(0)
                    }, 5000)
                }) : await signIn(data).then((response) => {
                    console.log(response)
                })
        } catch (error: AxiosError) {
            error.status === 400 && setError("code", {message: error.response.data.reason})
        }
    }

    return <>
        <form onSubmit={handleSubmit(onSubmit)} className={"form"}>
            <h1 className="form__title">Вход</h1>
            <p className={"form__text"}>Введите номер телефона для входа <br/> в личный кабинет</p>
            <div>
                <InputMask mask="+7 999 999 99 99" placeholder={"Телефон"}
                         className={"form__field"}
                         {...register("phone", {
                             required: "Обязательное поле"
                         })}
            />
                {errors?.phone ? <div className={"form-error__message"}>{errors.phone.message}</div> : null}
            </div>
            {!isSuccess ? <button type={"submit"} className={"form__button"}>Продолжить</button> : <>
                <div>
                    <InputMask mask="999999" maskChar={null} placeholder={"Проверочный код"}
                             className={"form__field"}
                             {...register("code", {
                                 required: codeErrorMessage,
                                 minLength: {
                                     value: 6,
                                     message: codeErrorMessage
                                 }
                             })}
                />
                    {errors?.code?.message ? <div className={"form-error__message"}>{errors.code.message}</div> : null}
                </div>
                <button type={"submit"} className={"form__button"}>Войти</button>
            </>}
        </form>
        {isSuccess && <OtpSection phone={phone} time={time} setTime={setTime}/>}
    </>
}