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
import { Button, Modal, Select, SelectProps } from 'antd';


export const Sale = () => {


    const getProductByBarcode = async (page: number = 1, name: string = "") => {

        await api.get(`/product?page=${page}&limit=10&sort=DESC&orderBy=ID&search=${name}`)
            .then((response) => {

                const [item] = response.data.items
                setProduct(item)

                setTimeout(() => {
                    setDetectEnter(!detectEnter)
                }, 1000)


            });
    };

    const clear = () =>{
        setSumPercent(false)
        setTotalValue(0)
        setItemQuantity(1)
        setChosenItem(null)
        setTotalValue(0)
        setDiscount(0)
        setSumPercent(false)
        setItemsInProcess([])
        
    }

    const options = ['2', '5', '7', '10', '12']

    const nameInputRef = useRef<HTMLInputElement>(null)

    const [product, setProduct] = useState<any>({})
    const [search, setSearch] = useState("")
    const [itemsInProcess, setItemsInProcess] = useState<any[]>([])
    const [totalValue, setTotalValue] = useState(0)
    const [itemQuantity, setItemQuantity] = useState(1)
    const [chosenItem, setChosenItem] = useState<any>(null!)
    const [showModalSearch, setShowModalSearch] = useState(false)
    const [detectEnter, setDetectEnter] = useState(false)
    const [finalTotalValue, setFinalTotalvalue] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [discountValue, setDiscountValue] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sumPercent, setSumPercent] = useState(false)
    const [showPercent,setShowPercent] = useState(false)
    

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setSumPercent(!sumPercent)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const exit = () => {
        setShowModalSearch(false)
    }

    const handleChange = (value: string) => {
        // console.log(`selected ${value}`);
        setDiscount(Number(value))
    };

    const onKeyChange = (event: any) => {

        if (event.key === 'Enter') {

            getProductByBarcode(1, search)

        }

    }

    useEffect(() => {

        if (product.product_name !== undefined) {

            setChooiceByBarcode(product)

        }

    }, [detectEnter])

    useEffect(() => {
        // const result = totalValue - discount
        const currentPercent = discount / 100
        const discountValue = totalValue * currentPercent
        console.log(discountValue);
        const result = totalValue - discountValue
        setDiscountValue(discountValue)
        setFinalTotalvalue(result)

        if(discount > 0){
            setShowPercent(true)
        }else{
            setShowPercent(false)
        }

    }, [totalValue, sumPercent])

    const process = (prod: any) => {

        setSearch('')
        const currentItems = itemsInProcess
        currentItems.push(prod)
        setItemsInProcess(currentItems)
        setTimeout(() => {
            sumProducts()
            setItemQuantity(1)
            nameInputRef.current?.focus()
            setChosenItem(prod)
            setShowModalSearch(false)
        }, 500)

    }


    const setChooiceByName = (prod: any, quantity: number = 1) => {

        prod.product_quantity = quantity
        process(prod)

    }

    const setChooiceByBarcode = (prod: any) => {

        prod.product_quantity = itemQuantity
        process(prod)

    }

    const sumProducts = async () => {


        let value = 0

        const result = await itemsInProcess.reduce((a: any, b: any) => a + (b.product_sale_price * b.product_quantity), 0)

        value += result


        setTotalValue(value)



    }


    // console.log('renderizou');


    return (
        <>
            <SaleMain>

                <SaleTop>
                    {totalValue} {finalTotalValue}
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
                                    onChange={e => setSearch(e.target.value)}
                                    onKeyDown={e => onKeyChange(e)}
                                />



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
                                    defaultValue={chosenItem != null ? chosenItem.product_id : ''}
                                />
                            </div>

                            <div className="col-5">
                                <label>Nome</label>
                                <ImputProductProcessLastName type="text"
                                    className="form-control form-control"
                                    defaultValue={chosenItem != null ? chosenItem.product_name : ''}
                                />
                            </div>

                            <div className="col-2">
                                <label>Qtde</label>
                                <ImputProductProcessLastNumber type="text"
                                    className="form-control form-control"
                                    defaultValue={chosenItem != null ? chosenItem.product_quantity : ''}
                                />
                            </div>

                            <div className="col-2">
                                <label>Valor</label>
                                <ImputProductProcessLastNumber type="text"
                                    className="form-control form-control"
                                    defaultValue={chosenItem != null ? BrCurrencyFormat(chosenItem.product_sale_price) : ''}
                                />
                            </div>
                        </CardBody2b>

                    </CardBody2>

                    <CardBody3>
                        <CardButtonCommandServiceOrder className="row">
                            <button className='btn btn-warning' onClick={() => setShowModalSearch(true)}><BsSearch /> Pesquisar Produto</button>
                            <button className='btn btn-warning' onClick={() => showModal()}><MdOutlineMoneyOffCsred /> Desconto</button>
                        </CardButtonCommandServiceOrder>

                        <CardButtonCommandServiceOrder className="row">
                            <button className='btn btn-warning' onClick={()=> clear()} ><GiSellCard /> Nova Venda</button>
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

                    {/* <CardSellResult>
                        <label>valor</label>
                        <h2>teste</h2>
                    </CardSellResult> */}

                    <CardSellResult>
                        <label>Sub-total</label>
                        <h2>{BrCurrencyFormat(totalValue)}</h2>
                    </CardSellResult>

                    <CardSellResult>
                        <label>Desconto {showPercent && `${discount}%`}</label>
                        <h2>{BrCurrencyFormat(discountValue)}</h2>
                    </CardSellResult>

                    <CardSellResult>
                        <label>valor</label>
                        <h2>{BrCurrencyFormat(finalTotalValue)}</h2>
                    </CardSellResult>

                </SaleFooter>

            </SaleMain>
            <Modal
                title="Desconto em %"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}>

                <Select
                    defaultValue={''}
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    options={options.map(op => ({ label: op, value: op }))}
                />
            </Modal>
            {showModalSearch && <ModalDefault body={<SearchProduct exit={exit} process={setChooiceByName} />} />}
        </>
    )
}