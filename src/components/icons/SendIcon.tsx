import { twMerge } from 'tailwind-merge'

export default function SendIcon({
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
        d="M19.334 6.07988L11.668 13.7458L14.0011 19.7452L19.334 6.07988ZM10.2538 12.3316L17.9198 4.66566L4.25438 9.99849L10.2538 12.3316ZM20.6472 1.47424C20.8303 1.42103 21.1988 1.32541 21.5946 1.45763C22.0417 1.607 22.3926 1.95791 22.542 2.40505C22.6742 2.80082 22.5786 3.16928 22.5254 3.35247C22.4674 3.5521 22.3745 3.79002 22.2813 4.02873L15.6639 20.9859C15.5598 21.2527 15.459 21.5111 15.3604 21.7106C15.2751 21.8829 15.0855 22.2493 14.6919 22.4538C14.2578 22.6793 13.741 22.679 13.3072 22.453C12.9139 22.248 12.7246 21.8814 12.6396 21.709C12.5412 21.5094 12.4407 21.2509 12.3369 20.9839L9.72699 14.2726L3.05101 11.6764C3.03924 11.6718 3.02748 11.6673 3.01574 11.6627C2.74878 11.5589 2.49024 11.4584 2.29065 11.36C2.11819 11.275 1.75163 11.0858 1.54668 10.6924C1.32067 10.2586 1.32036 9.74184 1.54586 9.30778C1.75035 8.91417 2.11669 8.72448 2.28905 8.63926C2.48853 8.54063 2.74695 8.43982 3.01379 8.33572C3.02552 8.33115 3.03727 8.32656 3.04904 8.32197L19.9709 1.71832C20.2096 1.62512 20.4475 1.53223 20.6472 1.47424Z"
      />
    </svg>
  )
}
