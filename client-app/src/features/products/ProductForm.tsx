/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import useErrorHandler from '../../app/helpers/useErrorHandler';
import Header from '../../app/layout/Header';
import SidePanel from '../../app/layout/SidePanel';
import { BackToButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, SubmitButton, Title } from '../../app/common/styledComponents/upsert';
import { Product } from '../../app/models/product';
import { useCreateProductMutation, useUpdateProductMutation } from '../../app/APIs/productApi';
import inputHelper from '../../app/helpers/inputHelper';


interface ProductFormProps {
    id?: string;
    data?: Product;
}

const productData: Product = {
    id: "",
    name: "",
    description: "",
    price: 0.00,
    stockLevel: 0
};

function ProductForm({ id, data }: ProductFormProps) {
    const [productInputs, setProductInputs] = useState<Product>(data || productData);
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const handleProductInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        if (name === "price") {
            const numericValue = parseFloat(value);
            if (!isNaN(numericValue)) {
                setProductInputs(prevState => ({
                    ...prevState,
                    [name]: numericValue
                }));
            }
        } else {
            const tempData = inputHelper(e, productInputs);
            setProductInputs(tempData);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("Name", productInputs.name);
        formData.append("Description", productInputs.description);
        if (typeof productInputs.price === 'number') {
            formData.append("Price", productInputs.price.toFixed(2)); 
        }
        formData.append("StockLevel", productInputs.stockLevel.toString());
        const currentLocation = window.location.pathname;

        if (id) {
            formData.append("Id", id);
            const response = await updateProduct({ data: formData, id });

            if (response.error) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Product updated successfully", "success");
                navigate('/Products');
            }
        } else {
            const response = await createProduct(formData);

            if (response.error) {
                // Use error handler
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Product created successfully", "success");
                navigate('/Products');
            }
        }

        setLoading(false);
    };


    return (
        <>
            <Header />
            <SidePanel />
            <OuterContainer>
                <Container>
                    <FormContainer >
                        {loading && <MainLoader />}
                        <Title>
                            {id ? "Edit Product" : "Add Product"}
                        </Title>

                        {/* Display error messages */}
                        {errorMessages.length > 0 && (
                            <div style={{ color: 'red' }}>
                                <ul>
                                    {errorMessages.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <Form
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <FormGroup>
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={productInputs.name}
                                    onChange={handleProductInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={productInputs.description}
                                    onChange={handleProductInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Price</Label>
                                <Input
                                    type="number"
                                    name="price"
                                    value={productInputs.price}
                                    onChange={handleProductInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Stock Level</Label>
                                <Input
                                    type="number"
                                    name="stockLevel"
                                    value={productInputs.stockLevel}
                                    onChange={handleProductInput}
                                />
                            </FormGroup>
                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToButton onClick={() => navigate("/products")}>
                                    Back to Products
                                </BackToButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default ProductForm;
