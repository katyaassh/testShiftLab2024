import axios, {AxiosResponse} from 'axios';
import {OtpData} from "../types/otpData";
import {OtpResponse} from "../types/otpResponse";
import {SignInData} from "../types/signInData";
import {SignInResponse} from "../types/signInResponse";

export const instance = axios.create({baseURL: "https://shift-backend.onrender.com"});

export const createOtp = async (data: OtpData) => {
    return await instance.post<OtpResponse, AxiosResponse<OtpResponse>>("/auth/otp", data).then((response) => {
        return response.data
    })
}

export const signIn = async (data: SignInData) => {
    return await instance.post<SignInResponse, AxiosResponse<SignInResponse>>("/users/signin", data).then((response) => {
        return response.data
    })
}

