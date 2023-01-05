
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../hooks/useApi";
import { CategoryInterface } from "../../interfaces/Category.interface";
import { ProductInterface } from '../../interfaces/Product.interface';
import { AnimatePageOpacity } from "../../components/AnimatePageOpacity";
import '../../App.css'
import { ProductFormForm, ProductFormLabelOptional, ProductFormMain, ProductFormSelect, ProductFormText, ProductInputButton, ProductLabel } from "./ProductFormStyled";
import { MdOutlinePlaylistAdd, MdUpdate } from "react-icons/md";
import { BsCheckSquare } from "react-icons/bs";





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
            purchasePrice
        ) {
            return true
        }

        return false

    }

    async function setCurrentInvoiceId() {
        api.get(`invoice/number/${invoice === "" ? "0" : invoice}`)
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
                purchasePrice: purchasePrice,
                salePrice: salePrice,
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
                    product_purchase_price: product.purchasePrice,
                    product_sale_price: product.salePrice,
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
                purchasePrice: purchasePrice,
                salePrice: salePrice,
                invoice: invoice_id
            }



            api
                .put(`/product/${producId}`, {
                    product_name: product.name,
                    product_barcode: product.barcode,
                    product_code: product.productCode,
                    product_location: product.productLocation,
                    product_quantity: product.quantity,
                    product_quantity_minimal: product.minimalQuantity,
                    product_category_id: product.options,
                    product_purchase_price: product.purchasePrice,
                    invoice_id: product.invoice,
                    product_sale_price: product.salePrice,
                })
                .then(response => {
                    navigate("/product")
                })
                .catch(error => {
                    const resultError = {
                        statusCode: error.response.data.statusCode,
                        message: error.response.data.message
                    }
                    console.log('Error: ', resultError);

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
        setPurchasePrice(0)
        setSalePrice(0)
        setOptions("")
        setSelect("")
        setInvoice("")
    }




    function setProduct() {
        if (dataResult !== undefined) {
            setIsUpdate(true)
            setProductId(dataResult.product_id)
            setName(dataResult.product_name)
            setBarcode(dataResult.product_barcode)
            setProductCode(dataResult.product_code)
            setProductLocation(dataResult.product_location)
            setQuantity(dataResult.product_quantity)
            setMinimalQuantity(dataResult.product_quantity_minimal)
            setPurchasePrice(dataResult.product_purchase_price)
            setSalePrice(dataResult.product_sale_price)
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
    const [purchasePrice, setPurchasePrice] = useState(0)
    const [salePrice, setSalePrice] = useState(0)
    const [select, setSelect] = useState("")
    const [options, setOptions] = useState("")
    const [invoice, setInvoice] = useState("")
    const [invoice_id, setInvoiceId] = useState("")
    const [categories, setCategories] = useState<CategoryInterface[]>([])

    const [isUpdate, setIsUpdate] = useState(false)
    const [productCode, setProductCode] = useState("")

    const getCategory = async () => {
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
        setProduct()
        getCategory()


    }, [])




    return (
        <>
            <AnimatePageOpacity>


                <ProductFormMain >
                    <ProductFormText>Gerenciamento de produtos</ProductFormText>

                    <ProductFormForm >


                        <div className="row">
                            <div className="col">

                                <ProductLabel>Nome</ProductLabel>
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Digite o nome do produto"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="col-lg-4">

                                <ProductLabel>Código de barras</ProductLabel>
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Digite o código de barras"
                                    value={barcode}
                                    onChange={(e) => setBarcode(e.target.value)}
                                />
                            </div>


                            <div className="col-lg-3">

                                <ProductLabel>Código do produto</ProductLabel>
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
                                <ProductLabel>Localização</ProductLabel>
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Digite a localização do produto"
                                    value={productLocation}
                                    onChange={(e) => setProductLocation(e.target.value)}
                                />

                            </div>

                            <div className="col-lg-2">
                                <ProductLabel>Quantidade</ProductLabel>
                                <input
                                    className="form-control form-control-lg"
                                    type="number"
                                    placeholder="Quantidade"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                />
                            </div>

                            <div className="col-lg-2">
                                <ProductLabel>Quantidade minima</ProductLabel>
                                <input
                                    className="form-control form-control-lg"
                                    type="number"
                                    placeholder="Quantidade"
                                    value={minimalQuantity}
                                    onChange={(e) => setMinimalQuantity(Number(e.target.value))}
                                />
                            </div>

                            <div className="col-lg-2">
                                <ProductLabel>Preço de compra</ProductLabel>
                                <input
                                    className="form-control form-control-lg"
                                    type="number"
                                    placeholder="Preço"
                                    value={purchasePrice}
                                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                                />
                            </div>

                        </div>



                        <div className="row">




                            <div className="col-lg-2">
                                <ProductLabel>Preço de venda</ProductLabel>
                                <input
                                    className="form-control form-control-lg"
                                    type="number"
                                    placeholder="Preço"
                                    value={salePrice}
                                    onChange={(e) => setSalePrice(Number(e.target.value))}
                                />
                            </div>

                            {!isUpdate && <div className="col-lg-2">
                                <ProductLabel>Nota fiscal <ProductFormLabelOptional >(Opcional)</ProductFormLabelOptional> </ProductLabel>
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Número da nota"
                                    value={invoice}
                                    onChange={(e) => setInvoice(e.target.value)}
                                />
                            </div>}

                            <div className="col-lg-3">

                                <ProductLabel>Categoria</ProductLabel>
                                <ProductFormSelect onChange={e => setOptions(e.target.value)} className="form-select form-select-lg mb-3" aria-label="Default select example">
                                    <option defaultValue={select}>{select}</option>
                                    {categories.map((data, i) => (

                                        <option key={i} value={data.id}>{data.name}</option>

                                    ))}

                                </ProductFormSelect>
                            </div>
                        </div>




                        <div className="btn-actions">

                            <ProductInputButton
                               
                                className="btn btn-primary"
                                onClick={clearOperation}

                            ><BsCheckSquare/> Novo</ProductInputButton>

                            {!isUpdate && <ProductInputButton
                                className="btn btn-primary"
                                onClick={createProduct}
                            ><MdOutlinePlaylistAdd /> Salvar</ProductInputButton>}


                            {isUpdate && <ProductInputButton
                                className="btn btn-secondary"
                                onClick={updateUser}
                            ><MdUpdate /> Atualizar</ProductInputButton>}

                        </div>
                    </ProductFormForm>
                </ProductFormMain>
            </AnimatePageOpacity>
        </>
    )

}

export default ProductForm