
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../hooks/useApi";
import { CategoryInterface } from "../../interfaces/Category.interface";
import './ProductForm.css'
import { ProductInterface } from '../../interfaces/Product.interface';





const ProductForm = () => {



    const location = useLocation()

    const dataResult = location.state?.data

    const navigate = useNavigate()

    function validInput() {

        if (
            name &&
            barcode &&
            productCode &&
            location &&
            quantity &&
            minimalQuantity &&
            price
        ) {
            return true
        }

        return false

    }

    async function setCurrentInvoiceId() {
        api.get(`invoice/number/${invoice === ""? "0":invoice}`)
            .then(response => {

                const id = response.data.invoice_id === undefined ? "" : response.data.invoice_id

                setInvoiceId(id)

            }).catch(error => console.log(error))

        return ""
    }

    async function createProduct() {

        await setCurrentInvoiceId()

        if (validInput()) {
            const product: ProductInterface = {
                name: name,
                barcode: barcode,
                productCode: productCode,
                productLocation: productLocation,
                quantity: quantity,
                minimalQuantity: minimalQuantity,
                options: Number(options),
                price: price,
                priceBuy: priceBuy,
                invoice: invoice_id
            }



            console.log('Product: ', product);

            api
                .post("/product", {
                    product_name: product.name,
                    product_barcode: product.barcode,
                    product_code: product.productCode,
                    product_location: product.productLocation,
                    product_quantity: product.quantity,
                    product_quantity_minimal: product.minimalQuantity,
                    product_category_id: product.options,
                    product_price: product.price,
                    product_price_buy: product.priceBuy,
                    invoice_id: product.invoice

                })
                .then((response) => {
                    navigate("/product")
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            alert("Preencha todos dados")
        }
    }

    async function updateUser() {


        await setCurrentInvoiceId()

        if (validInput()) {
            const product: ProductInterface = {
                name: name,
                barcode: barcode,
                productCode: productCode,
                productLocation: productLocation,
                quantity: quantity,
                minimalQuantity: minimalQuantity,
                options: Number(options),
                price: price,
                priceBuy: priceBuy,
                invoice: invoice_id
            }

            console.log(product);

            api
                .put(`/product/${producId}`, {
                    product_name: product.name,
                    product_barcode: product.barcode,
                    product_code: product.productCode,
                    product_location: product.productLocation,
                    product_quantity: product.quantity,
                    product_quantity_minimal: product.minimalQuantity,
                    product_category_id: product.options,
                    product_price: product.price,
                    invoice_id: product.invoice,
                    product_price_buy: product.priceBuy,
                })
                .then(response => {
                    navigate("/product")
                })
                .catch(error => {
                    const resultError = {
                        statusCode: error.response.data.statusCode,
                        message: error.response.data.message
                    }
                    console.log('Error: ',resultError);

                })
        } else {
            alert("Preencha todos dados")
        }

    }

    function clearOperation() {
        setIsUpdate(false)
        setProductId(0)
        setName("");
        setBarcode("");
        setProductCode("")
        setProductLocation("")
        setQuantity(0)
        setMinimalQuantity(0)
        setPrice(0)
        setPriceBuy(0)
        setOptions("")
        setSelect("")
        setInvoice("")
    }




    function setUser() {
        if (dataResult !== undefined) {
            setIsUpdate(true)
            setProductId(dataResult.product_id)
            setName(dataResult.product_name)
            setBarcode(dataResult.product_barcode)
            setProductCode(dataResult.product_code)
            setProductLocation(dataResult.product_location)
            setQuantity(dataResult.product_quantity)
            setMinimalQuantity(dataResult.product_quantity_minimal)
            setPrice(dataResult.product_price)
            setPriceBuy(dataResult.product_price_buy)
            setSelect(dataResult.category)
            setOptions(dataResult.category_id)
        } else {
            setIsUpdate(false)
        }

    }



    const [name, setName] = useState("")
    const [barcode, setBarcode] = useState("")
    const [producId, setProductId] = useState(0)
    const [productLocation, setProductLocation] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [minimalQuantity, setMinimalQuantity] = useState(0)
    const [price, setPrice] = useState(0)
    const [priceBuy, setPriceBuy] = useState(0)
    const [select, setSelect] = useState("")
    const [options, setOptions] = useState("")
    const [invoice, setInvoice] = useState("")
    const [invoice_id, setInvoiceId] = useState("")
    const [categories, setCategories] = useState<CategoryInterface[]>([])

    const [isUpdate, setIsUpdate] = useState(false)
    const [productCode, setProductCode] = useState("")

    const getProfile = async () => {
        await api.get('/category')
            .then(response => {

                const categories = []

                for (let cat in response.data) {

                    const profs: CategoryInterface = {

                        id: response.data[cat].category_id,
                        name: response.data[cat].category_name
                    }
                    categories.push(profs)
                }

                setCategories(categories)
            }).catch(error => {
                console.log('Error: ', error);
            })
    }



    useEffect(() => {
        setUser()
        getProfile()


    }, [])


    

    return (
        <>
            <div className="main">
                <h1>Gerenciamento de produtos</h1>

                <div className="form">


                    <div className="row">
                        <div className="col">

                            <label>Nome</label>
                            <input
                                className="form-control form-control-lg"
                                type="text"
                                placeholder="Digite o nome do produto"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="col-lg-4">

                            <label>Código de barras</label>
                            <input
                                className="form-control form-control-lg"
                                type="text"
                                placeholder="Digite o código de barras"
                                value={barcode}
                                onChange={(e) => setBarcode(e.target.value)}
                            />
                        </div>


                        <div className="col-lg-3">

                            <label>Código do produto</label>
                            <input
                                className="form-control form-control-lg"
                                type="text"
                                placeholder="Cód do produto"
                                value={productCode}
                                onChange={(e) => setProductCode(e.target.value)}
                            />

                        </div>
                    </div>




                    <div className="row">

                        <div className="col">
                            <label>Localização</label>
                            <input
                                className="form-control form-control-lg"
                                type="text"
                                placeholder="Digite a localização do produto"
                                value={productLocation}
                                onChange={(e) => setProductLocation(e.target.value)}
                            />

                        </div>

                        <div className="col-lg-2">
                            <label>Quantidade</label>
                            <input
                                className="form-control form-control-lg"
                                type="number"
                                placeholder="Quantidade"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                        </div>

                        <div className="col-lg-2">
                            <label>Quantidade minima</label>
                            <input
                                className="form-control form-control-lg"
                                type="number"
                                placeholder="Quantidade"
                                value={minimalQuantity}
                                onChange={(e) => setMinimalQuantity(Number(e.target.value))}
                            />
                        </div>

                        <div className="col-lg-2">
                            <label>Preço</label>
                            <input
                                className="form-control form-control-lg"
                                type="number"
                                placeholder="Preço"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </div>

                    </div>



                    <div className="row">




                        <div className="col-lg-2">
                            <label>Preço de compra</label>
                            <input
                                className="form-control form-control-lg"
                                type="number"
                                placeholder="Preço"
                                value={priceBuy}
                                onChange={(e) => setPriceBuy(Number(e.target.value))}
                            />
                        </div>

                        <div className="col-lg-2">
                            <label>Nota fiscal <i className="option">(Opcional)</i> </label>
                            <input
                                className="form-control form-control-lg"
                                type="text"
                                placeholder="Número da nota"
                                value={invoice}
                                onChange={(e) => setInvoice(e.target.value)}
                            />
                        </div>

                        <div className="col-lg-3">

                            <label>Categoria</label>
                            <select onChange={e => setOptions(e.target.value)} className="form-select form-select-lg mb-3" aria-label="Default select example">
                                <option defaultValue={select}>{select}</option>
                                {categories.map((data, i) => (

                                    <option key={i} value={data.id}>{data.name}</option>

                                ))}

                            </select>
                        </div>
                    </div>




                    <div className="btn-actions">

                        <input
                            type="submit"
                            value={"Novo"}
                            className="btn btn-primary"
                            onClick={clearOperation}

                        />

                        {!isUpdate && <input
                            type="submit"
                            value={"Salvar"}
                            className="btn btn-primary"
                            onClick={createProduct}
                        />}


                        {isUpdate && <input
                            type="submit"
                            value={"Atualizar"}
                            className="btn btn-secondary"
                            onClick={updateUser}
                        />}

                    </div>
                </div>
            </div>
        </>
    )

}

export default ProductForm