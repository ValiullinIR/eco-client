import { Table, TableRow, TableHead, TableBody, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestPosts, setCurrent } from '../../store/actions'
import { StyledTableCell } from '../StyledComponents/StyledTableCell'
import { PostRow } from './PostRow'

export const Posts = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.posts)

    useEffect(() => {
        dispatch(requestPosts())
    }, [])

    if (posts.length === 0)
        return <Typography variant="h6">Пока нет новостей</Typography>
    return <Table>
        <TableHead>
            <TableRow>
                <StyledTableCell align="center" >Заголовок</StyledTableCell>
                <StyledTableCell align="center" >Видимость</StyledTableCell>
                <StyledTableCell align="center" >Описание</StyledTableCell>
                <StyledTableCell align="center" >Дата создания</StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {posts.map((post, i) => <PostRow key={i} {...post} onClick={() => dispatch(setCurrent(post))} />)}
        </TableBody>
    </Table>
}
