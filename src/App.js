import './App.css'
import React from 'react'
import Table from './components/table/Table'
import { useFetch } from './hooks/useFetch'
import * as Styled from './styles'
import Loading from './components/Loading'

function App () {
  const [users, usersConfig, isUsersDataLoading] = useFetch('https://jsonplaceholder.typicode.com/users')
  const [comments, commentsConfig, isCommentsDataLoading] = useFetch('https://jsonplaceholder.typicode.com/comments')

  return (
    <Styled.App>
      <Styled.Title>Users</Styled.Title>
      {isUsersDataLoading ? <Loading /> : <Table rows={users} config={usersConfig} />}
      <Styled.Separator />
      <Styled.Title>Comments</Styled.Title>
      {isCommentsDataLoading ? <Loading /> : <Table rows={comments} config={commentsConfig} showPagination />}
    </Styled.App>
  )
}

export default App
