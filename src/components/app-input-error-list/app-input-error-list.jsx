"use client"

import AppInputErrorItem from "../app-input-error-item";

export default function AppInputErrorList({ messages = [] }) {
  return (
    <ul className="flex flex-col gap-1">
      {
        messages.map(message => (
          <li key={message}>
            <AppInputErrorItem text={message} />
          </li>
        ))
      }
    </ul>
  )
}