import { twMerge } from 'tailwind-merge'

export default function FaceHappyIcon({
  className,
  ...props
}: {
  className?: string
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('inline-block fill-default stroke-[1.5]', className)}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM7.5 9C7.5 8.17157 8.17157 7.5 9 7.5C9.82843 7.5 10.5 8.17157 10.5 9C10.5 9.82843 9.82843 10.5 9 10.5C8.17157 10.5 7.5 9.82843 7.5 9ZM13.5 9C13.5 8.17157 14.1716 7.5 15 7.5C15.8284 7.5 16.5 8.17157 16.5 9C16.5 9.82843 15.8284 10.5 15 10.5C14.1716 10.5 13.5 9.82843 13.5 9ZM6.5 14C6.5 13.4477 6.94772 13 7.5 13H16.5C17.0523 13 17.5 13.4477 17.5 14C17.5 15.2245 16.7844 16.3585 15.822 17.1482C14.8399 17.9541 13.4931 18.5 12 18.5C10.5069 18.5 9.16012 17.9541 8.17799 17.1482C7.21556 16.3585 6.5 15.2245 6.5 14ZM8.87506 15C9.01973 15.2024 9.20881 15.4069 9.44663 15.6021C10.0894 16.1294 10.9926 16.5 12 16.5C13.0074 16.5 13.9106 16.1294 14.5534 15.6021C14.7912 15.4069 14.9803 15.2024 15.1249 15H8.87506Z"
        fill="black"
      />
    </svg>
  )
}
