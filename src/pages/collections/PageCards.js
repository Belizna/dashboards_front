import React from "react";
import Cards from "../../components/Collections/Cards";

const PageCards = ({ collection_card }) => {

    var option = null
    var filter = null

    const options = [
        [{ value: 'O', label: 'O' }, { value: 'Р', label: 'Р' }, { value: 'СР', label: 'СР' }, { value: 'УР', label: 'УР' }],
        [{ value: 'O', label: 'O' }, { value: 'СК', label: 'СК' }, { value: 'УК', label: 'УК' }, { value: 'УСК', label: 'УСК' }],
        [{ value: 'C', label: 'C' }, { value: 'R', label: 'R' }, { value: 'VR', label: 'VR' }, { value: 'UR', label: 'UR' }],
        [{ value: 'O', label: 'O' }, { value: 'ГК', label: 'ГК' }],
        [{ value: 'R', label: 'R' }, { value: 'SR', label: 'SR' },
        { value: 'SSR', label: 'SSR' }, { value: 'TR', label: 'TR' },
        { value: 'HR', label: 'HR' }, { value: 'ZR', label: 'ZR' },
        { value: 'TGR', label: 'TGR' }, { value: 'UR', label: 'UR' },
        { value: 'OR', label: 'OR' }, { value: 'AR', label: 'AR' },
        { value: 'SLR+', label: 'SLR+' }, { value: 'SLR-', label: 'SLR-' },
        { value: 'SP', label: 'SP' }, { value: 'CP', label: 'CP' },
        { value: 'GP', label: 'GP' }, { value: 'MR', label: 'MR' },
        { value: 'CR', label: 'CR' }, { value: 'NR', label: 'NR' },
        { value: 'BP', label: 'BP' }, { value: 'SE', label: 'SE' },
    ]
    ]

    const filters = [
        [{ value: 'O', text: 'O' }, { value: 'Р', text: 'Р' }, { value: 'СР', text: 'СР' }, { value: 'УР', text: 'УР' }],
        [{ value: 'O', text: 'O' }, { value: 'СК', text: 'СК' }, { value: 'УК', text: 'УК' }, { value: 'УСК', text: 'УСК' }],
        [{ value: 'C', text: 'C' }, { value: 'R', text: 'R' }, { value: 'VR', text: 'VR' }, { value: 'UR', text: 'UR' }],
        [{ value: 'O', text: 'O' }, { value: 'ГК', text: 'ГК' }],
        [{ value: 'R', text: 'R' }, { value: 'SR', text: 'SR' },
        { value: 'SSR', text: 'SSR' }, { value: 'TR', text: 'TR' },
        { value: 'HR', text: 'HR' }, { value: 'ZR', text: 'ZR' },
        { value: 'TGR', text: 'TGR' }, { value: 'UR', text: 'UR' },
        { value: 'OR', text: 'OR' }, { value: 'AR', text: 'AR' },
        { value: 'SLR+', text: 'SLR+' }, { value: 'SLR-', text: 'SLR-' },
        { value: 'SP', text: 'SP' }, { value: 'CP', text: 'CP' },
        { value: 'GP', text: 'GP' }, { value: 'MR', text: 'MR' },
        { value: 'CR', text: 'CR' }, { value: 'NR', text: 'NR' },
        { value: 'BP', text: 'BP' }, { value: 'SE', text: 'SE' },
    ]
    ]

    if (collection_card === 'Боевая четверка' || collection_card === 'Воины тени' ||
    collection_card === 'Братья по оружию' ||  collection_card === 'Transformers Prime'
    ||  collection_card === 'Супергонки. 1 серия.' ||  collection_card === 'Супергонки. 2 серия.') {
        option = options[0]
        filter = filters[0]
    }
    else if (collection_card === 'Герои и Злодеи' || collection_card === 'Герои и Злодеи. 2-я часть.' ||
    collection_card === 'Герои и Злодеи. 3-я часть.' || collection_card === 'Герои и Злодеи. 4-я часть.')
    {
        option = options[1]
        filter = filters[1]
    }
    else if (collection_card ==='Beyblade Metal Fusion')
    {
        option = options[2]
        filter = filters[2]
    }
    else if (collection_card === 'Отчаянные бойцы'|| collection_card === 'Новая Вестроя')
    {
        option = options[3]
        filter = filters[3]
    }
    else {
        option = options[4]
        filter = filters[4]
    }

    return (
        <div className="pageBooks">
            <div className="tableBooks">
                <Cards collection_card={collection_card} option={option} filter={filter} />
            </div>
        </div>
    )
}
export default PageCards;