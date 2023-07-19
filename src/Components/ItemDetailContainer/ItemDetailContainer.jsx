import React from 'react';
import { useState, useEffect } from 'react';
import { getItem } from '../../asyncMock';
import ItemDetail from '../ItemDetail/ItemDetail'

function ItemDetailContainer() {
    console.log("Renderizando Item")
    const [item , setItem] = useState ([])

    async function requestItem(){
        const response = await getItem;
        setItem(response);
    }

    useEffect(() => {
        console.log("Montaje Item")
        requestItem();
    }, [])

    return(
        <div>
            <ItemDetail {...item} />
        </div>
    )
}

export default ItemDetailContainer