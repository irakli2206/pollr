import classNames from 'classnames';
import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: "sm" | "md" | "lg",
    title?: string,
    children?: string,
    variant?: "error" | "normal" | "info"
}

export const Button = ({ size = 'md', title, children, className = "", ...props }: ButtonProps) => {
    return (
        <button className={classNames(className + " rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ", {

        })}
            {...props}
        >
            {title || children}
        </button>
    )
}

export const LightButton = ({ size = 'md', title, children, variant, className = "", ...props }: ButtonProps) => {
    return (
        <button className={classNames(className + " text-black drop-shadow-sm hover:drop-shadow-none transition font-semibold bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-md text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700", {
            "text-xs px-3 py-1 ": size === 'sm',
            "!border-red-300 !bg-red-50 hover:!bg-red-100 !text-red-600": variant === 'error',
            "!border-blue-300 !bg-blue-50 hover:!bg-blue-100  !text-blue-600": variant === 'info',
            "!bg-gray-300 !text-gray-400 !border-none pointer-events-none shadow-none": props.disabled
        })}
            {...props}
        >
            {title || children}
        </button>
    )
}



type InputProps = InputHTMLAttributes<HTMLInputElement> & any & {
    size?: "sm" | "md" | "lg",
    title?: string,
}

export const Input = ({ className = "", ...props }: InputProps) => {
    return (
        <input className={classNames(className + 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6', {

        })}
            {...props}
        />
    )
}

export const Spinner = () => {
    return <div role="status" className=' w-full flex justify-center items-center'>
        <svg aria-hidden="true" className="w-12 h-12   text-gray-200 animate-spin dark:text-slate-400 fill-slate-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
}

export const OverlaySpinner = () => {
    return <div role="status" className='h-full w-full flex justify-center items-center bg-white/50 backdrop-blur-sm fixed z-[9999]'>
        <svg aria-hidden="true" className="w-20 h-20   text-gray-200 animate-spin dark:text-slate-400 fill-slate-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
}