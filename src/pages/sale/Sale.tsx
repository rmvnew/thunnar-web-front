import { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { GiReceiveMoney, GiSellCard } from 'react-icons/gi';
import { MdOutlineMoneyOffCsred } from 'react-icons/md';
import { ModalDefault } from '../../components/Modal';
import { api } from '../../hooks/useApi';
import { BrCurrencyFormat } from '../../utils/currencyBrFormat';
import {
    SaleMain,
    SaleTop,
    SaleBody1,
    SaleBody2,
    SaleFooter,
    SaleTableTheadTr,
    SaleTableTBodyTr,
    SaleTableTBodyTd,
    SaleTable,
    SaleTableTheadTd,
    SaleCardTable,
    CardBody1,
    CardSuggestion,
    Suggestion,
    CardSellResult,
    ImputProductProcessQuantity,
    ImputProductProcessSearch,
    CardBody2,
    ImputProductProcessLastNumber,
    ImputProductProcessLastName,
    CardBody2b,
    LabelTytleLastInput,
    CardButtonCommandServiceOrder,
    CardBody3
} from './SaleStyled';
import { SearchProduct } from './search/sale.product.search';






export const Sale = () => {


    const getProductByName = async (page: number = 1, name: string = "") => {

        await api.get(`/product?page=${page}&limit=10&sort=DESC&orderBy=ID&search=${name}`)
            .then((response) => {

                setProducts(response.data.items)

            });
    };

    const nameInputRef = useRef<HTMLInputElement>(null)

    const [products, setProducts] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [suggestions, setSuggestions] = useState<any[]>([])
    const [itemsInProcess, setItemsInProcess] = useState<any[]>([])
    const [totalValue, setTotalValue] = useState(0)
    const [itemQuantity, setItemQuantity] = useState(1)
    const [showButtonClose, setShowButtonClose] = useState(false)
    const [chosenItem, setChosenItem] = useState<any>(null!)
    const [showModalSearch, setShowModalSearch] = useState(false)

    const exit = () => {
        setShowModalSearch(false)
    }

    const onChangeHandler = (text: string) => {

        let matches: any[] = []

        if (text.length > 0) {

            for (let prod of products) {

                if (prod.product_name.toUpperCase().indexOf(text.toUpperCase()) != -1) {
                    matches.push(prod)
                }

            }

            if (matches.length > 0) {
                setSuggestions(matches)
                setSearch(text)
                setShowButtonClose(true)
            } else {
                clearSearch(text)
            }
        } else {
            clearSearch(text)
        }


    }


    const clearSearch = (text: string = '') => {
        setSuggestions([])
        setSearch(text)
        setShowButtonClose(false)
        nameInputRef.current?.focus()
    }

    const setChooice = (prod: any) => {

        // console.log('Prod: >>', prod);
        prod.product_quantity = itemQuantity
        setSuggestions([])
        setSearch('')
        const currentItems = itemsInProcess
        currentItems.push(prod)
        setItemsInProcess(currentItems)
        setShowButtonClose(false)
        setTimeout(() => {
            sumProducts()
            setItemQuantity(1)
            nameInputRef.current?.focus()
            setChosenItem(prod)
            // console.log('>>>', chosenItem);
        }, 500)

    }

    useEffect(() => {

        getProductByName(1, search)

    }, [search])


    const sumProducts = async () => {


        let value = 0

        const result = await itemsInProcess.reduce((a: any, b: any) => a + (b.product_sale_price * b.product_quantity), 0)

        value += result


        setTotalValue(value)

    }


    console.log('renderizou');


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
                                    ref={nameInputRef}
                                    className="form-control form-control"
                                    placeholder='Busca de produto'
                                    value={search}
                                    onChange={e => onChangeHandler(e.target.value)}
                                />
                                <CardSuggestion>
                                    {showButtonClose && <button onClick={() => clearSearch()}>X</button>}
                                    {suggestions && suggestions.map((sugges, i) =>
                                        <Suggestion onClick={() => setChooice(sugges)} key={i}>{sugges.product_name}</Suggestion>
                                    )}
                                </CardSuggestion>


                            </div>
                        </>


                    </CardBody1>

                    <CardBody2 className="row">


                        <LabelTytleLastInput>Ultimo Lancamento</LabelTytleLastInput>
                        <CardBody2b>
                            <div className="col-2">
                                <label>ID</label>
                                <ImputProductProcessLastNumber type="text"
                                    className="form-control form-control"
                                    value={chosenItem != null ? chosenItem.product_id : ''}
                                />
                            </div>

                            <div className="col-5">
                                <label>Nome</label>
                                <ImputProductProcessLastName type="text"
                                    className="form-control form-control"
                                    value={chosenItem != null ? chosenItem.product_name : ''}
                                />
                            </div>

                            <div className="col-2">
                                <label>Qtde</label>
                                <ImputProductProcessLastNumber type="text"
                                    className="form-control form-control"
                                    value={chosenItem != null ? chosenItem.product_quantity : ''}
                                />
                            </div>

                            <div className="col-2">
                                <label>Valor</label>
                                <ImputProductProcessLastNumber type="text"
                                    className="form-control form-control"
                                    value={chosenItem != null ? BrCurrencyFormat(chosenItem.product_sale_price) : ''}
                                />
                            </div>
                        </CardBody2b>

                    </CardBody2>

                    <CardBody3>
                        <CardButtonCommandServiceOrder className="row">
                            <button className='btn btn-warning' onClick={() => setShowModalSearch(true)}><BsSearch /> Pesquisar Produto</button>
                            <button className='btn btn-warning'><MdOutlineMoneyOffCsred /> Desconto</button>
                        </CardButtonCommandServiceOrder>

                        <CardButtonCommandServiceOrder className="row">
                            <button className='btn btn-warning'><GiSellCard /> Nova Venda</button>
                            <button className='btn btn-warning'><GiReceiveMoney /> Pagar</button>
                        </CardButtonCommandServiceOrder>
                    </CardBody3>


                </SaleBody1>

                <SaleBody2>



                    <SaleCardTable>
                        <SaleTable  >
                            <thead>
                                <SaleTableTheadTr>
                                    <SaleTableTheadTd>item</SaleTableTheadTd>
                                    <SaleTableTheadTd>Id</SaleTableTheadTd>
                                    <SaleTableTheadTd>Nome</SaleTableTheadTd>
                                    <SaleTableTheadTd>Qtde</SaleTableTheadTd>
                                    <SaleTableTheadTd>Preço</SaleTableTheadTd>
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
                                        <SaleTableTBodyTd >{BrCurrencyFormat(prod.product_sale_price)}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{BrCurrencyFormat(prod.product_sale_price * prod.product_quantity)}</SaleTableTBodyTd>
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
                        <h2>{BrCurrencyFormat(totalValue)}</h2>
                    </CardSellResult>

                </SaleFooter>

            </SaleMain>
            {showModalSearch && <ModalDefault body={<SearchProduct exit={exit} />} />}
        </>
    )
}