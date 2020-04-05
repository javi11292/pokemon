import { HOST } from "./constants"

const host = `${HOST}/api`

async function parseResponse(response) {
  const text = await response.text()

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

async function send(input, init) {
  try {
    const response = await fetch(input, init)
    if (!response.ok) throw new Error()
    return parseResponse(response)
  } catch {
    return { error: "Error" }
  }
}

export function get(path) {
  return send(`${host}${path}`, {
    credentials: "include",
  })
}

export function post(path, body) {
  return send(`${host}${path}`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export function upload(path, data) {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => formData.append(key, value))

  return send(`${host}${path}`, {
    credentials: "include",
    method: "POST",
    body: formData,
  })
}