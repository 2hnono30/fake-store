import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductService from '../../services/productService';
function ProductList() {
    const [state, setState] = useState({
        loading: false,
        products: [],
        categories: [],
        errorMessage: ""
    })
    useEffect(() => {
        try {
            setState({
                ...state,
                loading: true
            });
            async function getData(){
                let resProducts = await ProductService.getProducts();
                setState({
                    ...state,
                    loading:false,
                    products:resProducts.data,

                })
            }        
            getData();    
        } catch (error) {
            setState({
                ...state,errorMessage: error.message
            })
        }
    },[])
    const {loading,products} = state;
    return (
        <>
             <section className="product-info my-2">
                <div className="container">
                    <div className="d-flex align-items-center ">
                        <h3 className="me-2">Fake Store</h3>
                        <Link className="btn btn-primary btn-sm">
                            <i className="fa fa-plus-circle me-2"></i>
                            Create Product
                        </Link>
                    </div>
                    <p className="fst-italic">Eiusmod culpa ullamco veniam id veniam sit in. Commodo cupidatat proident aute enim ad proident magna culpa non. Fugiat eu consectetur ullamco officia nulla consequat consectetur consequat consequat incididunt ullamco. Enim voluptate nisi ad elit minim velit et occaecat irure sit aliquip duis ut. Ipsum sint ad consectetur dolor proident amet velit nisi cillum qui.</p>
                    <div>
                        <form className="d-flex w-25 align-items-center">
                            <input type="search" className="form-control me-2" />
                            <button className="btn btn-outline-secondary btn-sm">Search</button>
                        </form>
                    </div>
                </div>
            </section>
            {/* <section className="show-products">

            </section> */}
        </>
    )
}

export default ProductList;