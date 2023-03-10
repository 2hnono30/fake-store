import axios from "axios";
import { PRODUCT_API_URL } from "./common.js";

class ProductService{
    static getProducts(){
        return axios.get(PRODUCT_API_URL);
    }
}

export default ProductService;