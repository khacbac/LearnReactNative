const BASE_URL = "https://api.predic8.de/";
export default class HttpUtils {
    /**
   * thực hiện format header
   */
    static formatHeader() {
        return {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
    }

    static httpController(
        url,
        param,
        methodType = MethodType.GET
    ) {
        return fetch(BASE_URL + url, {
            method: methodType,
            headers: this.formatHeader(),
            body: JSON.stringify(param)
        });
    }

    static async requestGet(url) {
        try {
            let response = await HttpUtils.httpController(url);
            return response.json();
        } catch (error) {
            return error;
        }
    }
}

const MethodType = {
    GET: 'GET',
    POST: 'POST',
}

const Status = {
    LOADING: "LOADING",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
}

export { Status, BASE_URL };