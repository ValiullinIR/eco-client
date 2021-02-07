// An Example of using crud Component


// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { requestFilters } from '../../store/actions'
// import Component from '../Componet'

// export const FilterContainer = () => {

//     const dispatch = useDispatch()
//     const data = useSelector(state => state.filters.filters)

//     const onRead = () => {
//         dispatch(requestFilters())
//     }
//     const onCreate = () => {

//     }
//     const onUpdate = () => {

//     }
//     const onDelete = () => {

//     }

//     return (
//         <div>
//             <Component
//                 data={data}
//                 actions={{
//                     onRead,
//                     onCreate,
//                     onDelete,
//                     onUpdate
//                 }}
//                 fields={
//                     ["name","var_name", "key_words", "bad_words"]
//                 }
//             />
//         </div>
//     )
// }
