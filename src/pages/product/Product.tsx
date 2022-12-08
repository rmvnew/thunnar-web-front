import { Pagination } from "@mui/material"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { api } from "../../hooks/useApi"
import { ImPencil2, ImBin } from "react-icons/im";
import './Product.css'
import { AnimatePageLeft } from "../../components/AnimatePageLeft";
import { AnimatePageScaleY } from "../../components/AnimatePageScaleY";



const Product = () => {
  function setResponse(res: any) {

    // console.log('Res: ',res);

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

    <AnimatePageLeft>

      <div className="main">
        <h1>Gerenciamento de usuários</h1>




        <section className="links">
          <NavLink to={"/product/form"} className="btn btn-primary newUser">Novo Produto</NavLink>
        </section>



        <input
          className="form-control form-control-lg search"
          type="text"
          placeholder="Busca de produtos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="my-table table table-striped">
          <thead>
            <tr>
              <td>id</td>
              <td>Nome</td>
              <td>Código de barras</td>
              <td>Quantidade</td>
              <td>preço</td>
              <td>Status</td>
              <td>Opções</td>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product.product_id}>
                  <td>{product.product_id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.product_barcode}</td>
                  <td>{product.product_quantity}</td>
                  {/* <td>{`R$ ${product.product_price.toString().replace('.',',')}`}</td> */}
                  <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.product_price)}</td>
                  <td>{product.is_active === true ? "Ativo" : "Inativo"}</td>
                  <td>

                    {/* <div className="d-flex justify-content-around base-options"> */}
                    <div className=" base-options">

                      <NavLink to={"/product/form"} state={{
                        data: {
                          product_id: product.product_id,
                          product_name: product.product_name,
                          product_barcode: product.product_barcode,
                          product_code: product.product_code,
                          product_location: product.product_location,
                          product_quantity: product.product_quantity,
                          product_quantity_minimal: product.product_quantity_minimal,
                          product_price: product.product_price,
                          product_price_buy: product.product_price_buy,
                          category_id: product.category.category_id,
                          category: product.category.category_name,

                        }
                      }} className="btn btn-warning"><ImPencil2 /></NavLink>

                      <button className="btn btn-danger btn-delete"
                        onClick={() => deleteProduct(product.product_id)}
                      ><ImBin /></button>

                    </div>

                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination count={pages} color="primary" onChange={handleChange}></Pagination>
      </div>
    </AnimatePageLeft>

  );
}

export default Product