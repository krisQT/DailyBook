import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Card, Table, Button, Space, Modal, message } from 'antd'
import { connect } from 'umi'
import { PlusOutlined } from '@ant-design/icons'
import OperationModal from './components/OperationModal'
import styles from './index.less'

export const Personnel = (props) => {
  const {
    loading,
    dispatch,
    personnelList: { list} 
  } = props
  const [done, setDone] = useState(false)
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(undefined)

  useEffect(() => {
    dispatch({
      type: 'personnelList/fetch'
    })
  }, [])

  const showModal = () => {
    setVisible(true)
    setCurrent(undefined)
  }


  const showEditModal = (personnel) => {
    setCurrent(personnel)
    setVisible(true)
  }

  const handleDone = () => {
    setDone(false)
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  /**
   * 
   * @param {*} values 
   * @param {Boolean} type true.默认编辑或者新建  false.启用
   */
  const handleSubmit = (values, type) => {
    const id = current ? current.id : ''
    dispatch({
      type: 'personnelList/submit',
      payload: {
        id,
        ...values
      },
      callback: _ => {
        if (type) {
          setDone(true)
        }
        dispatch({
          type: 'personnelList/fetch'
        })
      }
    })
  }

  const handleChangeStatus = (personnelItem) => {
    personnelItem.status = !personnelItem.status

    handleSubmit(personnelItem, false)
  }

  const handleDelete = (personnelItem) => {
    Modal.confirm({
      title: '删除成员',
      content: '确定删除该成员吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => dispatch({
        type: 'personnelList/deletePersonnel',
        payload: {
          id: personnelItem.id,
        },
        callback: _ => {
          message.success('删除成功')
          dispatch({
            type: 'personnelList/fetch'
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
      title: '姓名',
      dataIndex: 'name',
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
          <Button type="primary" size="small" onClick={() => {handleChangeStatus(record)}}>
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
          <div className={styles.add}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showModal}
            >
              添加成员
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
      >
      </OperationModal>
    </>
  )  
}

export default connect(({ personnelList, loading }) => ({
  personnelList,
  loading: loading.effects['personnelList/fetch'],
}))(Personnel)
