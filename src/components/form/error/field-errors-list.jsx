import FieldErrorItem from "./field-error-item";

export default function FieldErrorsList({ messages = [] }) {
  return (
    <ul className="flex flex-col gap-1">
      {
        messages.map(message => (
          <li key={message}>
            <FieldErrorItem text={message} />
          </li>
        ))
      }
    </ul>
  )
}