import Swal from 'sweetalert2';
import ItemDetail from '../ItemDetail/ItemDetail';
import Loader from '../Loader/Loader';
import { getItem } from '../../Services/Firebase';
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

function ItemDetailContainer() {
    const [item , setItem] = useState([]);
    const [itemIsLoading , setItemIsLoading] = useState(true);
    const { itemId } = useParams();
    const [ errorText, setErrorText ] = useState(null);

    useEffect(() => {
        async function requestItem(){
            setItemIsLoading(true);
            try {
                const response = await getItem(itemId);
                setItem(response);
            } catch(error) {
                setErrorText(error.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "We couldn't find that item!",
                    showConfirmButton: false,
                    timer: 1500,
                    footer: ''
                    })
            } finally {
                setItemIsLoading(false);
            }
        }
        requestItem();
    }, [itemId])

    if (itemIsLoading){
        return(
            <Loader />
        )
    }

    if (errorText) {
        return (
            <div>
                <Navigate to='/' />
            </div>
        )
    } else {
        return(
            <div>
                <ItemDetail {...item} />
            </div>
        )
    }
}

export default ItemDetailContainer