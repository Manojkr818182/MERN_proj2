import axios from "axios";
import API_URL from "../API_URL/API_URL";
import authHeader from "./authHandler";

export const get_faqs_list = async () => {
    return axios.get(API_URL + "getFaqsList", {}
    ).then((response) => {
        return response.data;
    });
};


export const user_register = async (user_data) => {
    return axios.post(API_URL + "signup", user_data, {}
    ).then((response) => {
        return response.data;
    });
};

export const get_profile_detail = async () => {
    return axios.get(API_URL + 'get_profile_detail', {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};


export const change_password = async (data) => {
    return axios.post(API_URL + "change_password", data, {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const send_inquiry = async (inqury_data) => {
    return axios.post(API_URL + "send_inquiry", inqury_data, {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const delete_user_account = async () => {
    return axios.get(API_URL + 'delete_account', {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
}
