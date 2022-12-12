




export const SearchClient = (props: any) => {

    function callTeste(){

        props.teste({
            name:'Teste',
            status: true,
            statusModal: false
        })

    }

    return (

        <>
            <button onClick={callTeste}>Teste</button>
        </>

    )
}