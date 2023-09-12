export default function FancySelect(props) {
  return (
    <div className="relative inline-block text-primary">
      <span
        dangerouslySetInnerHTML={{
          __html: props.options.find((option) => option.value === props.value)
            ? props.options.find((option) => option.value === props.value)
                .label + (props.suffix ? ' ' + props.suffix : '')
            : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
        }}
      />
      <select
        className="absolute left-0 top-0 h-full w-full cursor-pointer appearance-none border-none bg-transparent text-transparent opacity-0 shadow-sm"
        id={props.name}
        name={props.name}
        value={props.value ? props.value : ''}
        onChange={(e) => {
          props.onChange(e.currentTarget.value)
        }}>
        {props.options.map((option, index) => (
          <option
            className="text-primary"
            key={option.value + '-' + index}
            value={option.value}
            disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
