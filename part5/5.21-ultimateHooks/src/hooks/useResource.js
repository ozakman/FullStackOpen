/* eslint-disable */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => response.data)
      .then(data => { 
        setResources(data)
      })
  }, [])

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then(createdResource => {
        setResources([...resources, createdResource.data])
      })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

export default useResource