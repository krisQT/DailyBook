import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Card, Table, Button, Space, Modal, message, Radio } from 'antd'
import { connect } from 'umi'
import { PlusOutlined } from '@ant-design/icons'
import OperationModal from './components/OperationModal'
import styles from './index.less'

export const Account = (props) => {
  const {
    loading,
    dispatch,
    accountList: { list, firstLevelList }
  } = props
  const [done, setDone] = useState(false)
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(undefined)

  useEffect(() => {
    dispatch({
      type: 'accountList/fetch'
    })
  }, [])

  const showModal = () => {
    setVisible(true)
    setCurrent(undefined)
  }

  const showEditModal = (account) => {
    setCurrent(account)
    setVisible(true)
  }

  const handleDone = () => {
    setDone(false)
    setVisible(false)
    setCurrent(undefined)
  }

  const handleCancel = () => {
    setVisible(false)
    setCurrent(undefined)
  }

  const handleSubmit = (values, type=true) => {
    const id = current ? current.id : ''
    dispatch({
      type: 'accountList/submit',
      payload: {
        id,
        ...values
      },
      callback: _ => {
        if (type) {
          setDone(true)
        }
        dispatch({
          type: 'accountList/fetch',
        })
      }
    })
  }

  const handleChangeStatus = (account) => {
    account.status = !account.status

    handleSubmit(account, false)
  }


  const handleDelete = (account) => {
    Modal.confirm({
      title: '删除分类',
      content: '确定删除该账号吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => dispatch({
        type: 'accountList/deleteAccount',
        payload: {
          id: account.id,
        },
        callback: _ => {
          message.success('删除成功')
          dispatch({
            type: 'accountList/fetch'
          })
        }
      }),
    })
  }

  const columns = [
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '分类',
      dataIndex: 'name',
    },
    {
      title: '父类',
      dataIndex: 'parentName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: text => <span>{text?'启用':'禁用'}</span>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" onClick={() => {showEditModal(record)}}>
            编辑
          </Button>
          <Button type="primary" size="small"  onClick={() => {handleChangeStatus(record)}}>
            {record.status? '禁用':'启用'}
          </Button>
          <Button type="primary" size="small" danger onClick={() => {handleDelete(record)}}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <PageContainer>
        <Card>
          <div className={styles.actions}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {showModal()}}
            >
              添加账号
            </Button>
          </div>
          <Table
            loading={loading}
            pagination={false}
            dataSource={list}
            columns={columns}
            rowKey={record => record.id} />
        </Card>
      </PageContainer>

      <OperationModal
          done={done}
          current={current}
          visible={visible}
          onDone={handleDone}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        firstLevelList={firstLevelList}
      >
      </OperationModal>
    </>
  )
}

export default connect(({ accountList, loading }) => ({
  accountList,
  loading: loading.effects['accountList/fetch'],
}))(Account)
