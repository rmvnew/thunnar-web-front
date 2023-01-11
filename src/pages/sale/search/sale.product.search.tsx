import { Pagination } from "@mui/material"
import { useEffect, useState, useRef, HTMLInputTypeAttribute } from 'react';
import { BsCheck2All } from "react-icons/bs"
import { ImExit } from "react-icons/im"
import { api } from "../../../hooks/useApi"
import { BrCurrencyFormat } from "../../../utils/currencyBrFormat"
import { CardButtonCommand, CardSaleProductSearchInput, CardSaleProductSearchPagination, CardSaleProductTable, CardSaleProductTabletQuantity, CardSaleProductTabletSelect, CardTitle } from "./sale.product.search.styled"










export const SearchProduct = (props: any) => {

    function setResponse(res: any) {

        setProducts(res.data.items)
        setPages(res.data.meta.totalPages)

    }

    const handleChange = (e: any, currentPage: any) => {

        setPage(currentPage)

    }


    const [products, setProducts] = useState<any[]>([])
    const [pages, setPages] = useState(0)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const [showSelect, setShowSelect] = useState(false)



    const getProductByName = async (page: number = 1, name: string = "") => {


        await api.get(`/product?page=${page}&limit=8&sort=DESC&orderBy=ID&search=${name}`).then((response) => {
            setResponse(response)
        });
    };

    useEffect(() => {
        if (search === "") {
            console.log('1');
            getProductByName(page, search)
        } else {
            console.log('2');
            setPage(1)
            getProductByName(page, search)
        }
    }, [search, page])


    const enableSelect = (i: number, id: number) => {

        
        setShowSelect(true)
        
        setTimeout(() => {

            let currentInput = document.getElementById(`${id}`)
            currentInput!.innerHTML = '1'
            currentInput?.focus()

        }, 1000)


    }


    return (
        <>
            <div>
                <CardTitle>
                    <h1>Pesquisar Produtos</h1>
                </CardTitle>
                <CardButtonCommand>
                    <button className="btn btn-danger" onClick={() => props.exit()}><ImExit /> Sair</button>
                </CardButtonCommand>
                <CardSaleProductSearchInput>
                    <input type="text"
                        placeholder="Pesquisar produto"
                        className="form-control form-control"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </CardSaleProductSearchInput>
                <div>
                    <CardSaleProductTable>
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Nome</td>
                                <td>Localização</td>
                                <td>Quantidade</td>
                                <td>Preço</td>
                                {showSelect && <td>Selecionar</td>}
                            </tr>
                        </thead>
                        <tbody>

                            {products.map((prod, i) => (

                                <tr key={prod.product_id} onClick={() => enableSelect(i, prod.product_id)}>
                                    <td>{prod.product_id}</td>
                                    <td>{prod.product_name}</td>
                                    <td>{prod.product_location}</td>
                                    <td>{prod.product_quantity}</td>
                                    <td>{BrCurrencyFormat(prod.product_sale_price)}</td>
                                    {showSelect && <td>
                                        <CardSaleProductTabletSelect>
                                            <input type="text"
                                                id={prod.product_id}
                                            />
                                            <button className="btn btn-primary"><BsCheck2All /></button>
                                        </CardSaleProductTabletSelect>
                                    </td>}

                                </tr>

                            ))}

                        </tbody>
                    </CardSaleProductTable>
                </div>



            </div>
            <CardSaleProductSearchPagination>
                <Pagination count={pages} color="primary" onChange={handleChange}></Pagination>
            </CardSaleProductSearchPagination>
        </>
    )

}