import { twMerge } from 'tailwind-merge'

export default function FlagIcon({
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
        d="M4 1C4.55228 1 5 1.44772 5 2V2.3968C5.7276 2.17269 6.70825 2 8 2C9.69345 2 11.0967 2.56148 12.3157 3.04923C12.3343 3.05668 12.3529 3.06411 12.3714 3.07152C13.6395 3.57876 14.7193 4 16 4C17.3873 4 18.2595 3.76917 18.7536 3.57152C19.0016 3.47234 19.1589 3.37972 19.2422 3.3242C19.2836 3.29655 19.3074 3.27769 19.3153 3.2712C19.601 3.00265 20.0186 2.92533 20.3827 3.07612C20.7564 3.2309 21 3.59554 21 4V15C21 15.2652 20.8946 15.5196 20.7071 15.7071L20 15C20.7071 15.7071 20.7066 15.7076 20.7061 15.7082L20.705 15.7092L20.7028 15.7114L20.698 15.7161L20.6873 15.7265C20.6795 15.7338 20.6707 15.7421 20.6607 15.7512C20.6407 15.7693 20.6162 15.7907 20.5869 15.8149C20.5282 15.8632 20.4504 15.9224 20.3516 15.9883C20.1536 16.1203 19.8734 16.2777 19.4964 16.4285C18.7405 16.7308 17.6127 17 16 17C14.3066 17 12.9033 16.4385 11.6843 15.9508L11.6286 15.9285C10.3605 15.4212 9.28069 15 8 15C6.61272 15 5.74051 15.2308 5.24639 15.4285C5.15123 15.4665 5.06941 15.5036 5 15.5381L5 22C5 22.5523 4.55229 23 4 23C3.44772 23 3 22.5523 3 22L3 15.001C3 15.0003 3 14.9997 3 14.999L3 4.00042C3 4.00014 3 3.99986 3 3.99958L3 2C3 1.44772 3.44772 1 4 1ZM5 4.53805L5 13.3968C5.7276 13.1727 6.70825 13 8 13C9.69345 13 11.0967 13.5615 12.3157 14.0492L12.3714 14.0715C13.6395 14.5788 14.7193 15 16 15C17.3873 15 18.2595 14.7692 18.7536 14.5715C18.8488 14.5335 18.9306 14.4964 19 14.4619V5.6032C18.2724 5.82731 17.2918 6 16 6C14.3066 6 12.9033 5.43852 11.6843 4.95077C11.6657 4.94332 11.6471 4.93589 11.6286 4.92848C10.3605 4.42124 9.28069 4 8 4C6.61272 4 5.74051 4.23083 5.24639 4.42848C5.15123 4.46654 5.06941 4.50364 5 4.53805Z"
      />
    </svg>
  )
}
