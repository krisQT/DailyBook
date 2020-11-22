import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Card, Table, Button, Space, Modal, message, Radio } from 'antd'
import { connect } from 'umi'
import { PlusOutlined } from '@ant-design/icons'
import OperationModal from './components/OperationModal'
import styles from './index.less'

export const Classify = (props) => {
  const {
    loading,
    dispatch,
    classifyList: { list, recordTypeList, firstLevelList }
  } = props
  // 流水类型
  const [recordType, setRecordType] = useState(0)
  const [done, setDone] = useState(false)
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(undefined)

  useEffect(() => {
    dispatch({
      type: 'classifyList/fetchRecordType',
      callback: value => {
          setRecordType(value)
          dispatch({
            type: 'classifyList/fetch',
            payload: value
          })
      }
    })
  }, [])

  const showModal = () => {
    setVisible(true)
    setCurrent(undefined)
  }

  const showEditModal = (classify) => {
    setCurrent(classify)
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
      type: 'classifyList/submit',
      payload: {
        id,
        recordType,
        ...values
      },
      callback: _ => {
        if (type) {
          setDone(true)
        }
        dispatch({
          type: 'classifyList/fetch',
          payload: recordType
        })
      }
    })
  }

  const handleChangeStatus = (classify) => {
    classify.status = !classify.status

    handleSubmit(classify, false)
  }

  const handleChangeRecordType = (e) => {
    setRecordType(e.target.value)
    dispatch({
      type: 'classifyList/fetch',
      payload: e.target.value
    })
  }

  const handleDelete = (classify) => {
    Modal.confirm({
      title: '删除分类',
      content: '确定删除该分类吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => dispatch({
        type: 'classifyList/deleteClassify',
        payload: {
          id: classify.id,
        },
        callback: _ => {
          message.success('删除成功')
          dispatch({
            type: 'classifyList/fetch',
            payload: recordType
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
            <Radio.Group 
              options={recordTypeList} 
              onChange={handleChangeRecordType} 
              value={recordType} 
              optionType="button"
              buttonStyle="solid"
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {showModal()}}
            >
              添加分类
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

export default connect(({ classifyList, loading }) => ({
  classifyList,
  loading: loading.effects['classifyList/fetch'],
}))(Classify)
