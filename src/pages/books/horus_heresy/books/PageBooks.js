import Books from "../../../../components/Book/Books";
import { useParams } from "react-router-dom"

import './pageBooks.css'

const PageBooks = () => {

    const { name_book } = useParams()

    return (
        <div className="pageBooks">
            <div className="tableBooks">
                <Books name_book={name_book} />
            </div>
        </div>
    )
}
export default PageBooks;