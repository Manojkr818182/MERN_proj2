import axios from "axios";
import API_URL from "../API_URL/API_URL";
import authHeader from "./authHandler";

export const get_faqs_list = async () => {
    return axios.get(API_URL + "getFaqsList", {}
    ).then((response) => {
        return response.data;
    });
};

export const add_faqs_detail = async (data) => {
    return axios.post(API_URL + "addFaqs", data, {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const delete_faq_detail = async (faq_id) => {
    return axios.get(API_URL + `delete_faq_detail/${faq_id}`, {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const get_user_list = async () => {
    return axios.get(API_URL +'get_user_list', {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const get_user_detail = async (user_id) => {
    return axios.get(API_URL +`user_detail/${user_id}`, {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const get_inquiry_list = async () => {
    return axios.get(API_URL +'get_inquiry_list', {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};