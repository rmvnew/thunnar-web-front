import { SaleMain, SaleTop, SaleBody1, SaleBody2, SaleFooter, SaleTableTheadTr, SaleTableTBodyTr, SaleTableTBodyTd, SaleTable, SaleTableTheadTd, SaleCardTable } from './SaleStyled';





export const Sale = () => {

    const products = [
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
                    <h2>teste</h2>
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
                                {products.map((prod, i) => (
                                    <SaleTableTBodyTr onClick={() => alert(i+1)} key={i}>
                                        <SaleTableTBodyTd >{i + 1}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{prod.id}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{prod.name}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{prod.quantity}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prod.price)}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prod.price * prod.quantity)}</SaleTableTBodyTd>
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