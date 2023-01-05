import { useEffect, useState } from 'react';
import { api } from '../../hooks/useApi';
import { SaleMain, SaleTop, SaleBody1, SaleBody2, SaleFooter, SaleTableTheadTr, SaleTableTBodyTr, SaleTableTBodyTd, SaleTable, SaleTableTheadTd, SaleCardTable, CardBody1, CardSuggestion, Suggestion, CardSellResult, ImputProductProcessQuantity, ImputProductProcessSearch } from './SaleStyled';





export const Sale = () => {

   
    const getProductByName = async (page: number = 1, name: string = "") => {

        await api.get(`/product?page=${page}&limit=10&sort=DESC&orderBy=ID&search=${name}`)
            .then((response) => {

                setProducts(response.data.items)

            });
    };


    const [products, setProducts] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [suggestions, setSuggestions] = useState<any[]>([])
    const [itemsInProcess, setItemsInProcess] = useState<any[]>([])
    const [totalValue, setTotalValue] = useState(0)
    const [itemQuantity, setItemQuantity] = useState(1)

    const onChangeHandler = (text: string) => {

        let matches: any[] = []

        if (text.length > 0) {

            for (let prod of products) {

                if (prod.product_name.toUpperCase().indexOf(text.toUpperCase()) != -1) {
                    matches.push(prod)
                }

            }

        }

        setSuggestions(matches)
        setSearch(text)
       
    }

    const setChooice = (prod: any) => {

        console.log('Prod: >>', prod);
        prod.product_quantity = itemQuantity
        setSuggestions([])
        setSearch('')
        const currentItems = itemsInProcess
        currentItems.push(prod)
        setItemsInProcess(currentItems)
        setTimeout(() => {
            sumProducts()
            setItemQuantity(1)
        }, 1000)

    }

    useEffect(() => {

        getProductByName(1, search)

    }, [search])

   
    const sumProducts = async () => {


        let value = 0

        const result = await itemsInProcess.reduce((a: any, b: any) => a + (b.product_price * b.product_quantity), 0)

        value += result


        setTotalValue(value)

    }




    return (
        <>
            <SaleMain>

                <SaleTop>

                </SaleTop>

                <SaleBody1>

                    <CardBody1 className="row">
                        <>
                            <div className="col-2">
                                <label>Quantidade</label>
                                <ImputProductProcessQuantity type="text"
                                    className="form-control form-control"
                                    value={itemQuantity}
                                    onChange={e => setItemQuantity(Number(e.target.value))}
                                />

                            </div>

                            <div className="col-10">
                                <label>Busca</label>
                                <ImputProductProcessSearch type="text"
                                    className="form-control form-control"
                                    value={search}
                                    onChange={e => onChangeHandler(e.target.value)}
                                />
                                <CardSuggestion>
                                    {suggestions && suggestions.map((sugges, i) =>
                                        <Suggestion onClick={() => setChooice(sugges)} key={i}>{sugges.product_name}</Suggestion>
                                    )}
                                </CardSuggestion>

                                <h1>aqui</h1>
                            </div>
                        </>


                    </CardBody1>

                </SaleBody1>

                <SaleBody2>



                    <SaleCardTable>
                        <SaleTable  >
                            <thead>
                                <SaleTableTheadTr>
                                    <SaleTableTheadTd>item</SaleTableTheadTd>
                                    <SaleTableTheadTd>Id</SaleTableTheadTd>
                                    <SaleTableTheadTd>Nome</SaleTableTheadTd>
                                    <SaleTableTheadTd>Quantidade</SaleTableTheadTd>
                                    <SaleTableTheadTd>preço</SaleTableTheadTd>
                                    <SaleTableTheadTd>Sub total</SaleTableTheadTd>
                                </SaleTableTheadTr>
                            </thead>
                            <tbody>
                                {itemsInProcess.map((prod, i) => (
                                    <SaleTableTBodyTr onClick={() => alert(i + 1)} key={i}>
                                        <SaleTableTBodyTd >{i + 1}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{prod.product_id}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{prod.product_name}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{prod.product_quantity}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{new Intl.NumberFormat('pt-BR',
                                            { style: 'currency', currency: 'BRL' })
                                            .format(prod.product_price)}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{new Intl.NumberFormat('pt-BR',
                                            { style: 'currency', currency: 'BRL' })
                                            .format(prod.product_price * prod.product_quantity)}</SaleTableTBodyTd>
                                    </SaleTableTBodyTr>
                                ))}
                            </tbody>
                        </SaleTable>

                    </SaleCardTable>


                </SaleBody2>

                <SaleFooter>

                    <CardSellResult>
                        <label>valor</label>
                        <h2>teste</h2>
                    </CardSellResult>

                    <CardSellResult>
                        <label>valor</label>
                        <h2>teste</h2>
                    </CardSellResult>

                    <CardSellResult>
                        <label>valor</label>
                        <h2>teste</h2>
                    </CardSellResult>

                    <CardSellResult>
                        <label>valor</label>
                        <h2>{new Intl.NumberFormat('pt-BR',
                            { style: 'currency', currency: 'BRL' })
                            .format(totalValue)}</h2>
                    </CardSellResult>

                </SaleFooter>

            </SaleMain>
        </>
    )
}