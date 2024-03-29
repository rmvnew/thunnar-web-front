import { Pagination } from "@mui/material"
import { useEffect, useState, useRef } from 'react';
import { NavLink } from "react-router-dom"
import { api } from "../../hooks/useApi"
import { ImPencil2, ImBin } from "react-icons/im";
import { AnimatePageOpacity } from '../../components/AnimatePageOpacity';
import '../../App.css'
import { PaginationCard, ProductBaseOption, ProductButtonNewProduct, ProductInputSearch, ProductMain, ProductSectionNewProduct, ProductTable, ProductTableButton, ProductTableButtonNavLink, ProductTableTheadTd, ProductTitle } from "./ProductStyled";
import { BrCurrencyFormat } from "../../utils/currencyBrFormat";
import { AiOutlineAppstoreAdd } from "react-icons/ai";




const Product = () => {
  function setResponse(res: any) {

    // console.log('Res: ',res);

    setProducts(res.data.items)
    setPages(res.data.meta.totalPages)

  }

  const handleChange = (e: any, currentPage: any) => {
    setPage(currentPage)
  }


  const inputEl = useRef<HTMLInputElement>(null);

  const [products, setProducts] = useState<any[]>([])
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")


  const getProduct = async (page: number = 1) => {

    await api.get(`/product?page=${page}&limit=8&sort=DESC&orderBy=ID`).then((response) => {

      setResponse(response)
    });
  };


  const getProductByName = async (page: number = 1, name: string = "") => {

    await api.get(`/product?page=${page}&limit=8&sort=DESC&orderBy=ID&search=${name}`).then((response) => {
      setResponse(response)
    });
  };

  const setFocus = () => {
    inputEl.current?.focus()
  }

  const deleteProduct = async (product_id: number = 0) => {


    await api.delete(`/product/${product_id}`)
      .then(response => {
        getProduct();
      }).catch(error => {
        console.log(error);
      })
  }


  useEffect(() => {
    getProductByName(page, search)
  }, [search])

  useEffect(() => {
    getProduct();
  }, []);



  useEffect(() => {
    getProduct(page);
  }, [page])


  return (

    <AnimatePageOpacity>

      <ProductMain >



        <ProductTitle onClick={() => setFocus()}>Gerenciamento de usuários</ProductTitle>




        <ProductSectionNewProduct >
          <ProductButtonNewProduct
            to={"/product/form"}
            className="btn btn-primary "><AiOutlineAppstoreAdd/> Novo Produto</ProductButtonNewProduct>
        </ProductSectionNewProduct>



        <ProductInputSearch
          className="form-control form-control-lg "
          ref={inputEl}
          type="text"
          placeholder="Busca de produtos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ProductTable >
          <thead>
            <tr>
              <ProductTableTheadTd onClick={() => setFocus()}>Id</ProductTableTheadTd>
              <ProductTableTheadTd onClick={() => setFocus()}>Nome</ProductTableTheadTd>
              <ProductTableTheadTd onClick={() => setFocus()}>Código de barras</ProductTableTheadTd>
              <ProductTableTheadTd onClick={() => setFocus()}>Quantidade</ProductTableTheadTd>
              <ProductTableTheadTd onClick={() => setFocus()}>Preço</ProductTableTheadTd>
              <ProductTableTheadTd onClick={() => setFocus()}>Status</ProductTableTheadTd>
              <ProductTableTheadTd onClick={() => setFocus()}>Opções</ProductTableTheadTd>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product.product_id} onClick={() => setFocus()}>
                  <td>{product.product_id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.product_barcode}</td>
                  <td>{product.product_quantity}</td>
                  <td>{BrCurrencyFormat(product.product_sale_price)}</td>
                  <td>{product.is_active === true ? "Ativo" : "Inativo"}</td>
                  <td>


                    <ProductBaseOption >

                      <ProductTableButtonNavLink to={"/product/form"} state={{
                        data: {
                          product_id: product.product_id,
                          product_name: product.product_name,
                          product_barcode: product.product_barcode,
                          product_code: product.product_code,
                          product_location: product.product_location,
                          product_quantity: product.product_quantity,
                          product_quantity_minimal: product.product_quantity_minimal,
                          product_purchase_price: product.product_purchase_price,
                          product_sale_price: product.product_sale_price,
                          category_id: product.category.category_id,
                          category: product.category.category_name,

                        }
                      }} className="btn btn-warning"><ImPencil2 /></ProductTableButtonNavLink>

                      <ProductTableButton className="btn btn-danger "
                        onClick={() => deleteProduct(product.product_id)}
                      ><ImBin /></ProductTableButton>

                    </ProductBaseOption>

                  </td>
                </tr>
              ))}
          </tbody>
        </ProductTable>

        <PaginationCard>
          <Pagination count={pages} color="primary" onChange={handleChange}></Pagination>
        </PaginationCard>
      </ProductMain>
    </AnimatePageOpacity>

  );
}

export default Product