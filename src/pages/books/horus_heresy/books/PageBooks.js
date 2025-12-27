import Books from "../../../../components/Book/Books";
import { useParams } from "react-router-dom"

import './pageBooks.css'

const PageBooks = ({url}) => {

    const { name_book } = useParams()

    return (
        <div className="pageBooks">
            <div className="tableBooks">
                <Books name_book={name_book} url={url}/>
            </div>
        </div>
    )
}
export default PageBooks;