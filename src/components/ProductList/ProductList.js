import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import nophoto from '../../assets/images/nophoto.jpg';
import CategoryService from "../../services/categoryService";
import ProductService from '../../services/productService';
import Helper from "../../Helper/Helper";
import Spinner from "../Spinner/Spinner";
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
            async function getData() {
                let resProducts = await ProductService.getProducts();
                let resCategory = await CategoryService.getCategories();
                setState({
                    ...state,
                    loading: false,
                    products: resProducts.data,
                    categories: resCategory.data,
                })
            }
            getData();
        } catch (error) {
            setState({
                ...state, errorMessage: error.message
            })
        }
    }, [])
    const getCategoryName = (categoryId)=>{
        let category = categories.find((cat)=>cat.id === categoryId);
        return category.categoryName;
    }
    const { loading, products,categories } = state;
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
            <section className="show-products mb-2">
                <div className="container">
                    <div className="row">
                        {
                            loading ? <Spinner /> : (
                                products.map((product) => (
                                    <div key={product.id} className="col-md-3 mb-2">
                                        <div className="card">
                                            <img className="photo-md mx-auto d-block" src={product.image || nophoto} alt="no photo" />
                                            <div className="card-body">
                                                <div className="d-flex align-items-center">
                                                    <h5 className="card-title me-2">{getCategoryName(product.categoryId)}</h5>
                                                    <div className="d-flex align-items-center">
                                                        <Link className="">
                                                            <i className="fa-solid fa-circle-info text-secondary"></i>
                                                        </Link>
                                                        <Link className="mx-1">
                                                            <i className="fa-solid fa-pen text-success"></i>
                                                        </Link>
                                                        <span className="">
                                                            <i role="button" title="remove product" className="fa-solid fa-xmark text-danger"
                                                                // onClick={() => handleRemoveProduct(product)}
                                                            ></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="card-text">
                                                    <div className="d-flex justify-content-between">
                                                        <span>{product.sizes.join(" | ")}</span>
                                                        <span className="text-success">{Helper.formatCurrency(product.price)}</span>
                                                    </div>
                                                    <p>{product.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductList;