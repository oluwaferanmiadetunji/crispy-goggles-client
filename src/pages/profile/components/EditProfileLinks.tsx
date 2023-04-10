import React, {useEffect, useRef, useState} from "react"
import {
  PlusOutlined,
  TwitterOutlined,
  InstagramFilled,
  LinkedinFilled,
  FacebookFilled,
  LinkOutlined,
} from "@ant-design/icons"
import type {InputRef} from "antd"
import {Space, Input, Tag, Tooltip} from "antd"

type Props = {
  links: string[]
  setLinks: (links: string[]) => void
}

const renderTag = ({
  closable,
  link,
  onClose,
  onDoubleClick,
}: {
  link: string
  closable: boolean
  onClose: () => void
  onDoubleClick: (e: any) => void
}) => {
  const isLongTag = link.length > 20

  if (link.includes("facebook")) {
    return (
      <Tag
        icon={<FacebookFilled />}
        closable={closable}
        onClose={onClose}
        color="#3b5999"
      >
        <span onDoubleClick={onDoubleClick}>
          {isLongTag ? `${link.slice(0, 20)}...` : link}
        </span>
      </Tag>
    )
  } else if (link.includes("instagram")) {
    return (
      <Tag
        icon={<InstagramFilled />}
        closable={closable}
        onClose={onClose}
        color="#3b5999"
      >
        <span onDoubleClick={onDoubleClick}>
          {isLongTag ? `${link.slice(0, 20)}...` : link}
        </span>
      </Tag>
    )
  } else if (link.includes("linkedin")) {
    return (
      <Tag
        icon={<LinkedinFilled />}
        closable={closable}
        onClose={onClose}
        color="#3b5999"
      >
        <span onDoubleClick={onDoubleClick}>
          {isLongTag ? `${link.slice(0, 20)}...` : link}
        </span>
      </Tag>
    )
  } else if (link.includes("twitter")) {
    return (
      <Tag
        icon={<TwitterOutlined />}
        closable={closable}
        onClose={onClose}
        color="#3b5999"
      >
        <span onDoubleClick={onDoubleClick}>
          {isLongTag ? `${link.slice(0, 20)}...` : link}
        </span>
      </Tag>
    )
  } else {
    return (
      <Tag icon={<LinkOutlined />} closable={closable} onClose={onClose} color="#3b5999">
        <span onDoubleClick={onDoubleClick}>
          {isLongTag ? `${link.slice(0, 20)}...` : link}
        </span>
      </Tag>
    )
  }
}

const EditProfileLinks = ({links, setLinks}: Props) => {
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [editInputIndex, setEditInputIndex] = useState(-1)
  const [editInputValue, setEditInputValue] = useState("")
  const inputRef = useRef<InputRef>(null)
  const editInputRef = useRef<InputRef>(null)

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [inputVisible])

  useEffect(() => {
    editInputRef.current?.focus()
  }, [inputValue])

  const handleClose = (removedLink: string) => {
    const newLinks = links.filter((link) => link !== removedLink)
    setLinks(newLinks)
  }

  const showInput = () => {
    setInputVisible(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputConfirm = () => {
    if (inputValue && links.indexOf(inputValue) === -1) {
      setLinks([...links, inputValue])
    }
    setInputVisible(false)
    setInputValue("")
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value)
  }

  const handleEditInputConfirm = () => {
    const newLinks = [...links]
    newLinks[editInputIndex] = editInputValue
    setLinks(newLinks)
    setEditInputIndex(-1)
    setInputValue("")
  }

  const tagInputStyle: React.CSSProperties = {
    width: 78,
    verticalAlign: "top",
  }

  const tagPlusStyle: React.CSSProperties = {
    background: "white",
    borderStyle: "dashed",
  }

  return (
    <Space size={[0, 8]} wrap>
      <Space size={[0, 8]} wrap>
        {links.map((link, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={link}
                size="small"
                style={tagInputStyle}
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            )
          }

          const isLongTag = link.length > 20

          const tagElem = renderTag({
            closable: index !== 0,
            link,
            onClose: () => handleClose(link),
            onDoubleClick: (e) => {
              // if (index !== 0) {
              setEditInputIndex(index)
              setEditInputValue(link)
              e.preventDefault()
              // }
            },
          })

          return isLongTag ? (
            <Tooltip title={link} key={link}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}
      </Space>

      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={tagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag style={tagPlusStyle} onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </Space>
  )
}

export default EditProfileLinks
