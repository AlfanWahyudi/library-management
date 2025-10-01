"use client"

import InputErrorItem from "./input-error-item";

export default function InputErrorList({ messages = [] }) {
  return (
    <ul className="flex flex-col gap-1">
      {
        messages.map(message => (
          <li key={message}>
            <InputErrorItem text={message} />
          </li>
        ))
      }
    </ul>
  )
}