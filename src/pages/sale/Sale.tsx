import { useEffect, useState } from 'react';
import { api } from '../../hooks/useApi';
import { SaleMain, SaleTop, SaleBody1, SaleBody2, SaleFooter, SaleTableTheadTr, SaleTableTBodyTr, SaleTableTBodyTd, SaleTable, SaleTableTheadTd, SaleCardTable, CardBody1, CardSuggestion, Suggestion } from './SaleStyled';





export const Sale = () => {

    // const getProduct = async (page: number = 1) => {

    //     await api.get(`/product?page=${page}&limit=0&sort=DESC&orderBy=ID`).then((response) => {

    //         setProducts(response.data.items)
    //     });
    // };

    const getProductByName = async (page: number = 1, name: string = "") => {

        await api.get(`/product?page=${page}&limit=10&sort=DESC&orderBy=ID&search=${name}`)
            .then((response) => {

                setProducts(response.data.items)

            });
    };


    const [products, setProducts] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [suggestions, setSuggestions] = useState<any[]>([])



    const onChangeHandler = (text: string) => {

        setTimeout(() => {

            let matches: any[] = []

            if (text.length > 0) {

                for (let prod of products) {

                    console.log('&& ', prod.product_name.toUpperCase());

                    if (prod.product_name.toUpperCase().indexOf(text.toUpperCase()) != -1) {
                        matches.push(prod)
                    }

                }

            }

            setSuggestions(matches)
            setSearch(text)
        }, 300)

    }

    const setChooice = (prod: any) => {

        setSuggestions([])
        setSearch(prod.product_name)

    }

    useEffect(() => {


        getProductByName(1, search)

    }, [search])


    const itemsProduct = [
        {
            id: 1,
            name: 'Xbox serie x',
            quantity: 1,
            price: 4300
        },
        {
            id: 2,
            name: 'Xbox serie s',
            quantity: 2,
            price: 2100
        },
        {
            id: 3,
            name: 'Monitor games 144Hz Sansumg',
            quantity: 1,
            price: 3200
        },
        {
            id: 4,
            name: 'Camera GoPro Hero 4',
            quantity: 1,
            price: 1920
        }, {
            id: 1,
            name: 'Xbox serie x',
            quantity: 1,
            price: 4300
        },
        {
            id: 2,
            name: 'Xbox serie s',
            quantity: 2,
            price: 2100
        },
        {
            id: 3,
            name: 'Monitor games 144Hz Sansumg',
            quantity: 1,
            price: 3200
        },
        {
            id: 4,
            name: 'Camera GoPro Hero 4',
            quantity: 1,
            price: 1920
        }, {
            id: 1,
            name: 'Xbox serie x',
            quantity: 1,
            price: 4300
        },
        {
            id: 2,
            name: 'Xbox serie s',
            quantity: 2,
            price: 2100
        },
        {
            id: 3,
            name: 'Monitor games 144Hz Sansumg',
            quantity: 1,
            price: 3200
        },
        {
            id: 4,
            name: 'Camera GoPro Hero 4',
            quantity: 1,
            price: 1920
        }, {
            id: 1,
            name: 'Xbox serie x',
            quantity: 1,
            price: 4300
        },
        {
            id: 2,
            name: 'Xbox serie s',
            quantity: 2,
            price: 2100
        },
        {
            id: 3,
            name: 'Monitor games 144Hz Sansumg',
            quantity: 1,
            price: 3200
        },
        {
            id: 4,
            name: 'Camera GoPro Hero 4',
            quantity: 1,
            price: 1920
        }, {
            id: 1,
            name: 'Xbox serie x',
            quantity: 1,
            price: 4300
        },
        {
            id: 2,
            name: 'Xbox serie s',
            quantity: 2,
            price: 2100
        },
        {
            id: 3,
            name: 'Monitor games 144Hz Sansumg',
            quantity: 1,
            price: 3200
        },
        {
            id: 4,
            name: 'Camera GoPro Hero 4',
            quantity: 1,
            price: 1920
        }
    ]







    return (
        <>
            <SaleMain>

                <SaleTop>

                </SaleTop>

                <SaleBody1>

                    <CardBody1 className="row">
                        <>
                            <label>Busca</label>
                            <input type="text"
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
                                {itemsProduct.map((prod, i) => (
                                    <SaleTableTBodyTr onClick={() => alert(i + 1)} key={i}>
                                        <SaleTableTBodyTd >{i + 1}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{prod.id}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{prod.name}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{prod.quantity}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{new Intl.NumberFormat('pt-BR',
                                            { style: 'currency', currency: 'BRL' })
                                            .format(prod.price)}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{new Intl.NumberFormat('pt-BR',
                                            { style: 'currency', currency: 'BRL' })
                                            .format(prod.price * prod.quantity)}</SaleTableTBodyTd>
                                    </SaleTableTBodyTr>
                                ))}
                            </tbody>
                        </SaleTable>

                    </SaleCardTable>


                </SaleBody2>

                <SaleFooter>

                </SaleFooter>

            </SaleMain>
        </>
    )
}